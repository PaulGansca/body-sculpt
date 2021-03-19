import arrayMove from "array-move";

import { WorkoutActionTypes } from './workout.types';

import { generateWorkout } from '../../workout-creation/create-workout';
import { updateCurrentWorkout, completeWorkout as firebaseCompleteWorkout, getWorkout, updateCompledWorkout } from '../../firebase/crud-user';
import { getExerciseInfo } from '../../api/wger';
import { createDbWorkout } from '../../static/exercise-fields-stored';

import newId from '../../utils/id-generator';

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
        Promise.all(workout.exercises).then(r => {
            workout.exercises = r
            dispatch({
                type: WorkoutActionTypes.SET_WORKOUT_SUCCESS,
                payload: workout
            });
        })
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.SET_WORKOUT_FAIL,
            payload: err
        });
    }
};

export const createCurrentWorkout = (userId) => dispatch => {
    dispatch({
        type: WorkoutActionTypes.CREATE_CURRENT_WORKOUT_START,
    });
    generateWorkout(userId, updateCurrentWorkout, dispatch);
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

export const addExercise = (id) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.ADD_EXERCISE_START,
    });
    try {
        const exercise = await getExerciseInfo(id);
        // TO DO GENERATE WORKLOAD EX
        exercise.sets = [{reps: 10, weight: 50, id: newId(), isLogged: false},
             {reps: 10, weight: 50, id: newId(), isLogged: false}, {reps: 10, weight: 50, id: newId(), isLogged: false}]
        exercise.db_id = newId()
        exercise.isFetched = true;
        dispatch({
            type: WorkoutActionTypes.ADD_EXERCISE_SUCCESS,
            payload: exercise
        });
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.ADD_EXERCISE_FAIL,
            payload: err
        });
    }
};

export const deleteExercise = (idx) => dispatch => {
    dispatch({
        type: WorkoutActionTypes.DELETE_EXERCISE,
        payload: idx
    });
};

export const swapExercise = (exerciseIdx, exerciseId, exerciseDbId) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.SWAP_EXERCISE_START,
    });
    try {
        const exercise = await getExerciseInfo(exerciseId);
        // TO DO GENERATE WORKLOAD EX
        exercise.sets = [{reps: 10, weight: 50, id: newId(), isLogged: false},
            {reps: 10, weight: 50, id: newId(), isLogged: false}, {reps: 10, weight: 50, id: newId(), isLogged: false}]
        exercise.db_id = exerciseDbId;
        exercise.isFetched = true;
        dispatch({
            type: WorkoutActionTypes.SWAP_EXERCISE_SUCCESS,
            payload: {exercise, exerciseIdx},
        });
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
    dispatch({
        type: WorkoutActionTypes.LOG_SET,
        payload: exercise
    });
};

export const logSetWithSwapExercise = (exercises, exerciseIdx, swapIdx) => dispatch => {
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
        firebaseCompleteWorkout(currentUserId, createDbWorkout(workout))
        history.push('/user/workouts-logged')
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
            dispatch({
                type: WorkoutActionTypes.PERMISSION_DENIED,
                payload: "Permission Denied"
            });
        }
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.FETCH_WORKOUT_FAIL,
            payload: err
        });
    }
};