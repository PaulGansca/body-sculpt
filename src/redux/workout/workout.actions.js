import arrayMove from "array-move";

import { WorkoutActionTypes } from './workout.types';

import { generateWorkout } from '../../workout-creation/create-workout';
import { updateCurrentWorkout } from '../../firebase/crud-user';
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

export const saveWorkout = (workout, userId) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.SAVE_WORKOUT_START,
    });
    try {
        // TO DO
        // will need to check whether saving current workout
        // or saving to users array of workouts in which case new function needed
        updateCurrentWorkout(userId, createDbWorkout(workout))
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
        exercise.sets = [{reps: 10, weight: 50, id: newId()},
             {reps: 10, weight: 50, id: newId()}, {reps: 10, weight: 50, id: newId()}]
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

export const deleteExercise = (idx) => async dispatch => {
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
        exercise.sets = [{reps: 10, weight: 50, id: newId()},
            {reps: 10, weight: 50, id: newId()}, {reps: 10, weight: 50, id: newId()}]
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

export const moveExercise = (oldIndex, newIndex, exercises) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.MOVE_EXERCISE,
        payload: arrayMove(exercises, oldIndex, newIndex)
    });
};

export const updateExerciseWorkload = (exercise) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.UPDATE_EXERCISE,
        payload: exercise
    });
};

export const toggleWorkoutState = (state) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.TOGGLE_WORKOUT_STATE,
        payload: state
    });
};

export const updateTimeElapsed = (timeElapsed) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.UPDATE_TIME_ELAPSED,
        payload: timeElapsed
    });
};