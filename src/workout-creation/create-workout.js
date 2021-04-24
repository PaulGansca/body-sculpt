import moment from 'moment';
import _ from 'lodash';
import { WorkoutActionTypes } from '../redux/workout/workout.types';
import newId from '../utils/id-generator';
import { createDbWorkout } from '../static/exercise-fields-stored';
import { exerciseCategory, MAX_WORKLOAD, bestExercises }  from '../static/exercise-category';
import { MUSCLES_DATA }  from '../static/muscle-images';
import { WORKOUT_SPLITS_DAYS, REP_RANGE_BY_GOAL, INTENSITY_BY_REPS } from '../static/workout-splits-days';
import { getAllExercises } from '../api/wger';
import { weightPrediction } from '../api/google-cloud-functions';
import { getUserRecentWorkouts } from '../firebase/crud-user';
import { LIFTING_STANDARDS } from './lifting-standars';

export const generateWorkout = async (userId, currentUser, updateCurrentWorkout, dispatch) => {
    const {splitType, fitnessLevel, goal, trainingFrequency, musclePriority, isMusclePrioritized, gender, trainingDuration} = currentUser;
    const workoutExercises = [];
    const pastWorkouts = getUserRecentWorkouts(userId, 12, "w");
    //fetch exercises
    //fetch user's recent workouts to determine fresh muscles
    Promise.all([getAllExercises(), getUserRecentWorkouts(userId, 7, "d")]).then(async ([exercises, recentWorkouts]) => {
        //recent workouts retrieved
        let recentWorkoutsSorted = [];
        recentWorkouts.forEach(w => (recentWorkoutsSorted.push(w.data())));
        recentWorkoutsSorted = recentWorkoutsSorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        //calculate sets performed per muscle
        const { musclesFatigue, completedExercises, enchancedRecentWorkouts} = calculateWorkload(recentWorkoutsSorted, exercises);
        //calculate overall fatigue per group for workout 
        const fatigueGrouped = WORKOUT_SPLITS_DAYS[splitType].reduce((acc, day, index) => {
            acc[index] = (day.muscleIds.reduce((acc, muscleId) => acc += musclesFatigue[muscleId] ,0)) /
                (MAX_WORKLOAD[fitnessLevel] * day.muscleIds.length)
            return acc;
        }, {}); 
        //return the day with the muscles least trained
        const lowestFatigueDayIndex = Object.keys(fatigueGrouped).sort((a,b) => fatigueGrouped[a] - fatigueGrouped[b])[0]
        const lowestFatigueDay = WORKOUT_SPLITS_DAYS[splitType][lowestFatigueDayIndex];
        console.log(lowestFatigueDay)
        console.log(fatigueGrouped)
        console.log(musclesFatigue)
        //adjust workoload for duration
        const timePerSet = goal === "endurance" ? 1.5 : (goal === "muscleGain" ? 2 : 2.5)
        const estimatedWorkoutLength = (((lowestFatigueDay.muscleIds.length * MAX_WORKLOAD[fitnessLevel]) /
         (trainingFrequency / WORKOUT_SPLITS_DAYS[splitType].length) -
         lowestFatigueDay.muscleIds.reduce((totalSets, muscleId) => totalSets += musclesFatigue[muscleId], 0))
         * timePerSet)
        if(estimatedWorkoutLength > trainingDuration + 5) {
            const surplusTime = estimatedWorkoutLength - trainingDuration;
            lowestFatigueDay.muscleIds.forEach(muscleId => musclesFatigue[muscleId] += Math.floor(surplusTime / lowestFatigueDay.muscleIds.length / timePerSet) + 1)
        }
        //filter exercises to only contain relevant ones based on day
        const subsetExercises = exercises.filter(e => lowestFatigueDay.category.includes(e.category.id));
        //reduce all past performances by exercise
        let pastPerformances = [];
        (await pastWorkouts).forEach(w => (pastPerformances.push(w.data())));
        pastPerformances = reducePastWorkoutsByExercise(pastPerformances)
        lowestFatigueDay.muscleIds.forEach(async id => {
            //find position of muscle in previous workouts to determine position today
            let previousPosition = -1;
            let index = -1;
            while (previousPosition === -1 && index < enchancedRecentWorkouts.length - 1) {
                index++;
                const w = enchancedRecentWorkouts[index]
                if(w.exercises) 
                    previousPosition = w.exercises.findIndex(e => e.muscles.findIndex(m => m.id === id) > -1);
            }
            const newPostion = ((previousPosition > -1 && previousPosition >= Math.floor(enchancedRecentWorkouts[index].exercises.length / 2))
                                || (isMusclePrioritized === "true" && musclePriority.includes(id))) ? "mid" : "end";
            // get a random best exercises for musclesIds in lowestFatigueDay
            let randomBest = getRandVal(bestExercises[id]);
            let tries = {[randomBest]: true}
            let isExerciseNew = workoutExercises.findIndex(we => we.id === randomBest) === -1 ? true : false;
            while(!isExerciseNew || (Object.keys(tries).length < bestExercises[id].length && !isExerciseNew)) {
                randomBest = getRandVal(bestExercises[id]);
                tries[randomBest] = true;
                // eslint-disable-next-line
                isExerciseNew = workoutExercises.findIndex(we => we.id === randomBest) === -1 ? true : false;
            }        
            // best exercise could already be in workout
            const exercise = exercises.find(e => e.id === randomBest);
            exercise.keep = true;
            // calculate sets to do this session
            let targetSets = Math.round((MAX_WORKLOAD[fitnessLevel] - musclesFatigue[id]) / (trainingFrequency / WORKOUT_SPLITS_DAYS[splitType].length));
            targetSets = targetSets > MAX_WORKLOAD[fitnessLevel] ? MAX_WORKLOAD[fitnessLevel] : targetSets;
            // find exercise count for using goals muscleId
            let exerciseCount = 0;
            if(goal === "strengthGain") {
                if(targetSets <= 5) exerciseCount = 1;
                else if(targetSets <= 10) exerciseCount = targetSets === 6 ? 1 : 2;
                else if(targetSets <= 15) exerciseCount = 3;
                else exerciseCount = targetSets === 16 ? 3 : 4;
            } else {
                if(targetSets <= 5) exerciseCount = 1;
                else if(targetSets <= 10) exerciseCount = targetSets === 6 ? 2 : 3;
                else if(targetSets <= 15) exerciseCount = targetSets < 14 ? 3 : 4;
                else exerciseCount = targetSets === 16 ? 4 : 5;
            }
            if(targetSets < 1) exerciseCount = 0
            if(exerciseCount > 1) {
                //subtract one as that's the starting exercise which is selected
                exerciseCount -=  1;
                let setsToPerform = targetSets;
                console.log("TARGET SETS:", targetSets)
                console.log("EXERCISE COUNT", exerciseCount)
                //select half +1 if not integer exercises from past workouts for progressive overload
                const recentExercises = _.uniqBy(completedExercises
                    .filter(e => e.id !== exercise.id && e.muscles.findIndex(m=> m.id === id) > -1),'id')
                    .filter(e => workoutExercises.findIndex(we => we.id === e.id) === -1)
                    .slice(0, Math.round(exerciseCount/2));
                //select new exercises to stimulate new muscles
                const newExercises = [];
                const newExercisesNeeded = Math.round(exerciseCount/2) - recentExercises.length + Math.floor(exerciseCount/2);
                while (newExercises.length < newExercisesNeeded) {
                    const randomExercise = getRandVal(subsetExercises);
                    if((randomExercise.muscles.findIndex(m=> m.id === id) > -1)
                        && (recentExercises.findIndex(r => randomExercise.id === r.id) === -1)
                        && randomExercise.id !== exercise.id
                        && (newExercises.findIndex(r => randomExercise.id === r.id) === -1)
                        && (workoutExercises.findIndex(r => randomExercise.id === r.id) === -1)) newExercises.push(randomExercise)
                }
                console.log("MUSCLE ID: ", id)
                console.log(recentExercises);
                console.log(newExercises);
                const combinedExercises = recentExercises.concat(newExercises);

                let firstExReps = getRandVal(REP_RANGE_BY_GOAL[goal][newPostion === "mid" ? "start" : "mid"])
                exercise.sets = [...Array(goal === "strengthGain" ? 5 : 4)].map(i => (
                    {reps: firstExReps, weight: 0, id: newId(), isLogged: false}
                ))
                exercise.db_id = newId();
                exercise.isFetched = true;
                delete exercise.rpe;
                updateWorkload(musclesFatigue, [exercise])
                console.log(exercise);
                if(newPostion === "end") workoutExercises.push(exercise);
                setsToPerform -= goal === "strengthGain" ? 5 : 4;
                let setsPerEx = Math.floor(setsToPerform / exerciseCount);
                //find one rep max
                combinedExercises.forEach((e, index) => {
                    //assign sets and reps to each exercise
                    let repRange = getRandVal(REP_RANGE_BY_GOAL[goal][(index/exerciseCount >= 0.5 && newPostion === "end") ? "end" : "mid"]);
                    if(index === exerciseCount-1 && setsToPerform % exerciseCount !== 0) setsPerEx = setsToPerform % exerciseCount;
                    e.sets = [...Array(setsPerEx)].map(i => (
                        //calculate weight
                        {reps: repRange, weight: 0, id: newId(), isLogged: false}
                    ))
                    e.db_id = newId();
                    e.isFetched = true;
                    delete e.rpe;
                    updateWorkload(musclesFatigue, [e])
                    if(musclesFatigue[id] < MAX_WORKLOAD[fitnessLevel] + e.sets.length) {
                        console.log("TASTINO PUSHED")
                        if(newPostion === "end") workoutExercises.push(e);
                        else workoutExercises.unshift(e);
                    }
                })
                if(newPostion === "mid") workoutExercises.unshift(exercise);
            } else if(exerciseCount === 1) {
                // only one exercise available so calculate reps accordingly
                // if muscle id is in musclesPrioritiezed do
                // this is required to ensure muscles and best exercises are shuffled
                let firstExReps = getRandVal(REP_RANGE_BY_GOAL[goal][newPostion === "end" ? "mid" : "start"])
                exercise.sets = [...Array(targetSets)].map(i => (
                    {reps: firstExReps, weight: 0, id: newId(), isLogged: false}
                ))
                exercise.db_id = newId();
                exercise.isFetched = true;
                updateWorkload(musclesFatigue, [exercise])
                delete exercise.rpe;
                if(newPostion === "end") workoutExercises.push(exercise);
                else workoutExercises.unshift(exercise);
            }
        });
        Promise.all(workoutExercises.map(async e => {
            let oneRepMax = 0;
            //exercise has been performed before
            if(pastPerformances[e.id]) {
                oneRepMax = (await predictRepMax(pastPerformances, e.id))
            } else {
                //exercise hasn't been performed before prediction is based on user stats
                oneRepMax = LIFTING_STANDARDS[gender][e.category.name][fitnessLevel] * currentUser.weight;
            }
            //determine weight as intensity % of 1 rep max by goal
            let weight = (INTENSITY_BY_REPS[e.sets[0].reps] ? INTENSITY_BY_REPS[e.sets[0].reps] : INTENSITY_BY_REPS[1] - (0.03 * (e.sets[0].reps-1))) * (oneRepMax);
            //adjust weight for gym in 2.5 kg increments;
            weight = weight % 2.5 === 0 ? weight : weight - (weight % 2.5);
            e.sets = e.sets.map(set => ({...set, weight}));
            return e;
        })).then(results => {
            const currentWorkout = {exercises: results, date: new Date()}
            dispatch({
                type: WorkoutActionTypes.CREATE_CURRENT_WORKOUT_SUCCESS,
                payload: currentWorkout
            });
            updateCurrentWorkout(userId, createDbWorkout(currentWorkout))
        })
        return []
    }).catch(err => dispatch({
        type: WorkoutActionTypes.CREATE_CURRENT_WORKOUT_FAIL,
        payload: err
        })
    )
}


const calculateWorkload = (recentWorkoutsSorted, exercises) => {
    const muscles = {};
    const completedExercises = [];
    const enchancedRecentWorkouts = [];
    //init all muscles to 0 sets
    MUSCLES_DATA.forEach(m=>muscles[m.id] = 0)
    recentWorkoutsSorted.forEach((w, index )=> {
        enchancedRecentWorkouts.push({...w, exercises: []});
        w.exercises.forEach((exercise) => {
            const completeExercise = {...exercise, ...(exercises.find(e=> e.id === exercise.id))}
            completeExercise.muscles.forEach(m => muscles[m.id] = muscles[m.id] + completeExercise.sets.length)
            completeExercise.muscles_secondary.forEach(m => muscles[m.id] = muscles[m.id] + completeExercise.sets.length/2)
            if(!completeExercise.muscles.concat(completeExercise.muscles_secondary).length) {
                exerciseCategory[completeExercise.category.name].muscleIds.forEach(muscleId =>
                    muscles[muscleId] = muscles[muscleId] + completeExercise.sets.length/2
                )
            }
            completedExercises.push(completeExercise);
            enchancedRecentWorkouts[index].exercises.push(completeExercise);
        })
    });
    return {musclesFatigue: muscles, completedExercises, enchancedRecentWorkouts};
}

// as exercises get added to the workout they will hit multiple muscles
// this need to be reflected in muscles fatigue to avoid overtraining
function updateWorkload (musclesFatigue, exercises) {
    exercises.forEach((exercise) => {
        exercise.muscles.forEach(m => {
            console.log(m);
            console.log(musclesFatigue[m.id])
            musclesFatigue[m.id] = musclesFatigue[m.id] + exercise.sets.length
        })
        exercise.muscles_secondary.forEach(m => musclesFatigue[m.id] = musclesFatigue[m.id] + exercise.sets.length/2)
        if((exercise.muscles.concat(exercise.muscles_secondary)).length < 1) {
            exerciseCategory[exercise.category.name].muscleIds.forEach(muscleId =>
                musclesFatigue[muscleId] = musclesFatigue[muscleId] + exercise.sets.length/2
            )
        }
    })
}

export function getRandVal(arr) {
   return arr[Math.floor(Math.random() * arr.length)]
}


function reducePastWorkoutsByExercise(workouts) {
    return workouts.reduce((acc, workout) => {
        workout.exercises.forEach(exercise => {
            if(!acc[exercise.id]) {
                acc[exercise.id] = JSON.parse(JSON.stringify(exercise));
                acc[exercise.id].sets = acc[exercise.id].sets.map(s => {
                    s.datePerformed = workout.date
                    s.rpe = exercise.rpe ? exercise.rpe : 0;
                    return s;
                });
            } else {
                acc[exercise.id].sets = acc[exercise.id].sets.concat(exercise.sets.map(s => {
                    s.datePerformed = workout.date;
                    s.rpe = exercise.rpe ? exercise.rpe : 0;
                    return s;
                }));
            }
        });
        return acc;
    }, {});
}

function calculateMaxesExercise(sets) {
    return sets.reduce((acc, set) => {
        const max = Math.round(set.weight * (1 + (set.reps/30)))
        if(!acc[set.datePerformed] || 
            acc[set.datePerformed].max < max) {
            acc[set.datePerformed] = {
                datePerformed: moment(set.datePerformed).format("DD-MM-YYYY"), //x axis
                max, // calculate 1 RM for y axis
                rpe: set.rpe
            }
        }
        return acc;
    }, {});
}

function predictRepMax(pastPerformances, exerciseId) {
    let maxes = calculateMaxesExercise(pastPerformances[exerciseId].sets)
    maxes = Object.keys(maxes)
                .sort((dateA, dateB) => new Date(dateA) - new Date(dateB))
                .map(date => ({max: maxes[date].max, rpe: maxes[date].rpe}));
    if(maxes[maxes.length-1].rpe !== 0) {
        if(maxes[maxes.length-1].rpe <= 3) maxes.push({max: maxes[maxes.length-1].max+2.5}) // predict greater weight
        else if(maxes[maxes.length-1].rpe > 4) maxes.push({max: maxes[maxes.length-1].max-2.5}) // reduce weight
        else maxes.push({max: maxes[maxes.length-1].max}) // maintain with possibility of increase
    }
    return weightPrediction(maxes.map(max => max.max));
}

export async function calculateWeight(exerciseId, categoryName, reps, userStats, pastPerformances) {
    const { fitnessLevel, gender, userWeight } = userStats;
    let oneRepMax = 0;
    //exercise has been performed before
    if(pastPerformances[exerciseId]) {
        oneRepMax = (await predictRepMax(pastPerformances, exerciseId))
    } else {
        //exercise hasn't been performed before prediction is based on user stats
        oneRepMax = LIFTING_STANDARDS[gender][categoryName][fitnessLevel] * userWeight;
    }
    //determine weight as intensity % of 1 rep max by goal
    let weight = (INTENSITY_BY_REPS[reps] ? INTENSITY_BY_REPS[reps] : INTENSITY_BY_REPS[1] - (0.03 * (reps-1))) * (oneRepMax);
    //adjust weight for gym in 2.5 kg increments;
    weight = weight % 2.5 === 0 ? weight : weight - (weight % 2.5);
    return weight;
}