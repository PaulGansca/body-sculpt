import { WorkoutActionTypes } from '../redux/workout/workout.types';
import newId from '../utils/id-generator';
import { createDbWorkout } from '../static/exercise-fields-stored';
import { exerciseCategory, MAX_WORKLOAD, bestExercises }  from '../static/exercise-category';
import { MUSCLES_DATA }  from '../static/muscle-images';
import { WORKOUT_SPLITS_DAYS, REP_RANGE_BY_GOAL } from '../static/workout-splits-days';
import { getAllExercises } from '../api/wger';
import { getUserRecentWorkouts } from '../firebase/crud-user';

export const generateWorkout = async (userId, currentUser, updateCurrentWorkout, dispatch) => {
    const {splitType, fitnessLevel, goal, trainingFrequency, musclePriority, isMusclePrioritized} = currentUser;
    const workoutExercises = [];
    //fetch exercises
    //fetch user's recent workouts to determine fresh muscles
    Promise.all([getAllExercises(), getUserRecentWorkouts(userId)]).then(async ([exercises, recentWorkouts]) => {
        //recent workouts retrieved
        let recentWorkoutsSorted = [];
        (await recentWorkouts.forEach(async w => (await recentWorkoutsSorted.push(w.data()))));
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
        //filter exercises to only contain relevant ones based on day
        const subsetExercises = exercises.filter(e => lowestFatigueDay.category.includes(e.category.id));
        lowestFatigueDay.muscleIds.forEach(async id => {
            //find position of muscle in previous workouts to determine position today
            let previousPosition = -1;
            let index = -1;
            while (previousPosition === -1 && index < enchancedRecentWorkouts.length - 1) {
                index++;
                const w = enchancedRecentWorkouts[index]
                previousPosition = w.exercises.findIndex(e => e.muscles.findIndex(m => m.id === id) > -1);
            }
            console.log(previousPosition)
            const newPostion = (previousPosition >= Math.floor(enchancedRecentWorkouts[index].exercises.length / 2)
                                || (isMusclePrioritized && musclePriority.includes(id))) ? "mid" : "end";
            // get a random best exercises for musclesIds in lowestFatigueDay
            const randomBest = getRandVal(bestExercises[id]);
            const exercise = exercises.find(e => e.id === randomBest);
            // calculate sets to do this session
            let targetSets = Math.round((MAX_WORKLOAD[fitnessLevel] - musclesFatigue[id]) / (trainingFrequency / WORKOUT_SPLITS_DAYS[splitType].length))
            targetSets = targetSets > MAX_WORKLOAD[fitnessLevel] ? 20 : targetSets;
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
                else if(targetSets <= 15) exerciseCount = targetSets === 11 ? 3 : 4;
                else exerciseCount = targetSets === 16 ? 4 : 5;
            }
            if(exerciseCount > 1) {
                //subtract one as that's the starting exercise which is selected
                exerciseCount -=  1;
                let setsToPerform = targetSets;
                console.log("TARGET SETS:", targetSets)
                console.log("EXERCISE COUNT", exerciseCount)
                //select half +1 if not integer exercises from past workouts for progressive overload
                const recentExercises = completedExercises
                    .filter(e => e.id !== exercise.id && e.muscles.findIndex(m=> m.id === id) > -1)
                    .slice(0, Math.round(exerciseCount/2));
                //select new exercises to stimulate new muscles
                const newExercises = [];
                const newExercisesNeeded = Math.round(exerciseCount/2) - recentExercises.length + Math.floor(exerciseCount/2);
                while (newExercises.length < newExercisesNeeded) {
                    const randomExercise = getRandVal(subsetExercises);
                    if((randomExercise.muscles.findIndex(m=> m.id === id) > -1)
                        && !recentExercises.includes(randomExercise.id)
                        && randomExercise.id !== exercise.id
                        && !newExercises.includes(randomExercise.id)) newExercises.push(randomExercise)
                }
                console.log("MUSCLE ID: ", id)
                console.log(recentExercises);
                console.log(newExercises);
                const combinedExercises = recentExercises.concat(newExercises);
                let firstExReps = getRandVal(REP_RANGE_BY_GOAL[goal][newPostion === "mid" ? "start" : "mid"])
                exercise.sets = [...Array(goal === "strengthGain" ? 5 : 4)].map(i => (
                    {reps: firstExReps, weight: 50, id: newId(), isLogged: false}
                ))
                exercise.db_id = newId();
                exercise.isFetched = true;
                delete exercise.rpe;
                console.log(exercise);
                setsToPerform -= goal === "strengthGain" ? 5 : 4;
                let setsPerEx = Math.floor(setsToPerform / exerciseCount);
                //assign sets and reps to each exercise
                combinedExercises.forEach((e, index) => {
                    let repRange = getRandVal(REP_RANGE_BY_GOAL[goal][(index/exerciseCount >= 0.5 && newPostion === "end") ? "end" : "mid"]);
                    if(index === exerciseCount-1 && setsToPerform % exerciseCount !== 0) setsPerEx = setsToPerform % exerciseCount
                    e.sets = [...Array(setsPerEx)].map(i => (
                        //calculate weight
                        {reps: repRange, weight: 50, id: newId(), isLogged: false}
                    ))
                    e.db_id = newId();
                    e.isFetched = true;
                    delete e.rpe;
                    if(newPostion === "end") workoutExercises.push(e);
                    else workoutExercises.unshift(e);
                    console.log(e);
                });
                if(newPostion === "end") workoutExercises.push(exercise);
                else workoutExercises.unshift(exercise);
            } else {
                // only one exercise available so calculate reps accordingly
                // for first exercise gains if startingOrder.length > 1 and exercise not performed last time do
                // or if muscle id is in musclesPrioritiezed do
                // this is required to ensure muscles and best exercises are shuffled
                let firstExReps = getRandVal(REP_RANGE_BY_GOAL[goal][newPostion === "end" ? "mid" : "start"])
                exercise.sets = [...Array(targetSets)].map(i => (
                    {reps: firstExReps, weight: 50, id: newId(), isLogged: false}
                ))
                exercise.db_id = newId();
                exercise.isFetched = true;
                delete exercise.rpe;
                if(newPostion === "end") workoutExercises.push(exercise);
                else workoutExercises.unshift(exercise);
            }
            console.log(workoutExercises)
            const currentWorkout = {exercises: workoutExercises, date: new Date()}
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
            completeExercise.muscles_secondary.forEach(m => muscles[m.id] = muscles[m.id] + completeExercise.sets.length/4)
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

function getRandVal(arr) {
   return arr[Math.floor(Math.random() * arr.length)]
}