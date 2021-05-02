import arrayMove from "array-move";

import { WorkoutActionTypes } from './workout.types';

import { generateWorkout } from '../../workout-creation/create-workout';
import { updateCurrentWorkout, completeWorkout as firebaseCompleteWorkout,
     getWorkout, updateCompledWorkout, getUserRecentWorkouts } from '../../firebase/crud-user';
import { getExerciseInfo } from '../../api/wger';
import { createDbWorkout } from '../../static/exercise-fields-stored';
import { REP_RANGE_BY_GOAL } from '../../static/workout-splits-days';
import { calculateWeight, getRandVal } from '../../workout-creation/create-workout';
import newId from '../../utils/id-generator';

import customNotification from '../../components/antd/custom-notification/custom-notification';

export const setWorkout = (workout) => dispatch => {
    dispatch({
        type: WorkoutActionTypes.SET_WORKOUT_START,
    });
    try {
        workout.exercises = workout.exercises.map(async e => {
            if(!e.isFetched) {
                const exercise = await getExerciseInfo(e.id);
                return {...exercise, ...e, isFetched: true}
            } else return e;
        })
        return Promise.all(workout.exercises).then(r => {
            workout.exercises = r
            return dispatch({
                type: WorkoutActionTypes.SET_WORKOUT_SUCCESS,
                payload: workout
            });
        }).catch(err => dispatch({
            type: WorkoutActionTypes.SET_WORKOUT_FAIL,
            payload: err
        }))
    } catch (err) {
        alert("Error updating document: ", err);
        return dispatch({
            type: WorkoutActionTypes.SET_WORKOUT_FAIL,
            payload: err
        });
    }
};

export const createCurrentWorkout = (userId, currentUser) => dispatch => {
    dispatch({
        type: WorkoutActionTypes.CREATE_CURRENT_WORKOUT_START,
    });
    generateWorkout(userId, currentUser, updateCurrentWorkout, dispatch);
};

export const saveWorkout = (workout, userId, workoutId) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.SAVE_WORKOUT_START,
    });
    try {
        if(!workoutId) updateCurrentWorkout(userId, createDbWorkout(workout))
        else {
            workout.userId = userId
            updateCompledWorkout(workoutId, createDbWorkout(workout))
        }
        dispatch({
            type: WorkoutActionTypes.SAVE_WORKOUT_SUCCESS,
        });
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.SAVE_WORKOUT_FAIL,
            payload: err
        });
    }
};

export const addExercise = (id, userStats) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.ADD_EXERCISE_START,
    });
    try {
        const exercise = await getExerciseInfo(id);
        const { goal, userId } = userStats;
        const pastPerformances = [];
        const reps = getRandVal(REP_RANGE_BY_GOAL[goal].end)
        const pastWorkouts = await getUserRecentWorkouts(userId, 12, "w")
        pastWorkouts.forEach(w => (pastPerformances.push(w.data())));
        const weight = await calculateWeight(id, exercise.category.name, reps, userStats, pastPerformances);
        exercise.sets = [...Array(goal === "strengthGain" ? 3 : 4)].map(i => (
            {reps, weight, id: newId(), isLogged: false}
        ))
        exercise.db_id = newId();
        exercise.isFetched = true;
        console.log(exercise)
        dispatch({
            type: WorkoutActionTypes.ADD_EXERCISE_SUCCESS,
            payload: exercise
        });
        customNotification('success', {message: 'Exercise Added Succesfully'})
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.ADD_EXERCISE_FAIL,
            payload: err
        });
    }
};

export const deleteExercise = (idx) => dispatch => {
    customNotification('success', {message: 'Exercise Deleted'})
    dispatch({
        type: WorkoutActionTypes.DELETE_EXERCISE,
        payload: idx
    });
};

export const swapExercise = (exerciseIdx, exerciseId, exerciseDbId, userStats) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.SWAP_EXERCISE_START,
    });
    try {
        const exercise = await getExerciseInfo(exerciseId);
        const { goal, userId } = userStats;
        const pastPerformances = [];
        const reps = getRandVal(REP_RANGE_BY_GOAL[goal].end)
        const pastWorkouts = await getUserRecentWorkouts(userId, 12, "w")
        pastWorkouts.forEach(w => (pastPerformances.push(w.data())));
        const weight = await calculateWeight(exerciseId, exercise.category.name, reps, userStats, pastPerformances);
        exercise.sets = [...Array(goal === "strengthGain" ? 3 : 4)].map(i => (
            {reps, weight, id: newId(), isLogged: false}
        ))
        exercise.db_id = exerciseDbId;
        exercise.isFetched = true;
        dispatch({
            type: WorkoutActionTypes.SWAP_EXERCISE_SUCCESS,
            payload: {exercise, exerciseIdx},
        });
        customNotification('success', {message: 'Exercise Replaced Succesfully'})
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.SWAP_EXERCISE_FAIL,
            payload: err
        });
    }
};

export const moveExercise = (oldIndex, newIndex, exercises) => dispatch => {
    dispatch({
        type: WorkoutActionTypes.MOVE_EXERCISE,
        payload: arrayMove(exercises, oldIndex, newIndex)
    });
};

export const updateExerciseWorkload = (exercise) => dispatch => {
    dispatch({
        type: WorkoutActionTypes.UPDATE_EXERCISE,
        payload: exercise
    });
};

export const toggleWorkoutState = (state) => dispatch => {
    customNotification('info', {message: `Workout ${state}`, duration: 3})
    dispatch({
        type: WorkoutActionTypes.TOGGLE_WORKOUT_STATE,
        payload: state
    });
};

export const updateTimeElapsed = (timeElapsed) => dispatch => {
    dispatch({
        type: WorkoutActionTypes.UPDATE_TIME_ELAPSED,
        payload: timeElapsed
    });
};

export const logSet = (exercise) => dispatch => {
    customNotification('info', {message: 'Set completed', duration: 3})
    dispatch({
        type: WorkoutActionTypes.LOG_SET,
        payload: exercise
    });
};

export const logSetWithSwapExercise = (exercises, exerciseIdx, swapIdx) => dispatch => {
    customNotification('info', {message: 'Set completed', duration: 3})
    dispatch({
        type: WorkoutActionTypes.LOG_SET_WITH_SWAP,
        payload: arrayMove(exercises, exerciseIdx, swapIdx)
    });
};

export const completeWorkout = (workout, currentUserId, history) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.COMPLETE_WORKOUT_START,
    });
    try {
        firebaseCompleteWorkout(currentUserId, createDbWorkout(workout));
        history.push('/user/workouts-logged');
        customNotification('success', {message: 'Workout Saved Succesfully'});
        dispatch({
            type: WorkoutActionTypes.COMPLETE_WORKOUT_SUCCESS,
        });
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.COMPLETE_WORKOUT_FAIL,
            payload: err
        });
    }
};

export const fetchWorkout = (userId, workoutId) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.FETCH_WORKOUT_START,
    });
    try {
        //fetch firebase workouts per user id
        const workout = (await getWorkout(userId, workoutId)).data();
        if(workout !== "Permission Denied") {
            workout.id = workoutId
            workout.exercises = workout.exercises.map(async e => {
                if(!e.isFetched) {
                    const exercise = await getExerciseInfo(e.id);
                    return {...exercise, ...e, isFetched: true}
                } else return e;
            })
            Promise.all(workout.exercises).then(r => {
                workout.exercises = r
                dispatch({
                    type: WorkoutActionTypes.FETCH_WORKOUT_SUCCESS,
                    payload: workout
                });
            })
        } else {
            customNotification('error', {message: 'Permission Denied'})
            dispatch({
                type: WorkoutActionTypes.PERMISSION_DENIED,
                payload: "Permission Denied"
            });
        }
    } catch (err) {
        //alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.FETCH_WORKOUT_FAIL,
            payload: err
        });
    }
};

export const resetState = () => dispatch => {
    dispatch({
        type: WorkoutActionTypes.RESET_WORKOUT_STATE,
    });
};