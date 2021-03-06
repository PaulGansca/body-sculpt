import { WorkoutActionTypes } from './workout.types';

import { generateWorkout } from '../../workout-creation/create-workout';
import { updateCurrentWorkout } from '../../firebase/crud-user';
import { getExerciseInfo } from '../../api/wger';

export const setCurrentWorkout = (currentWorkout) => dispatch => {
    dispatch({
        type: WorkoutActionTypes.SET_CURRENT_WORKOUT,
        payload: currentWorkout
    });
};

export const createCurrentWorkout = (userId) => dispatch => {
    dispatch({
        type: WorkoutActionTypes.CREATE_CURRENT_WORKOUT_START,
    });
    generateWorkout(userId, updateCurrentWorkout, dispatch);
};

export const addExercise = (id, workout, userId) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.ADD_EXERCISE_START,
    });

    try {
        const exercise = await getExerciseInfo(id);
        // TO DO GENERATE WORKLOAD EX
        exercise.sets = 4
        exercise.reps = 10
        exercise.weight = 50
        const newWorkout = {...workout, exercises: [...workout.exercises, exercise]}
        await updateCurrentWorkout(userId, newWorkout)
        dispatch({
            type: WorkoutActionTypes.ADD_EXERCISE_SUCCESS,
            payload: newWorkout.exercises
        });
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.ADD_EXERCISE_FAIL,
            payload: err
        });
    }
};

export const deleteExercise = (idx, workout, userId) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.DELETE_EXERCISE_START,
    });

    try {
        //delete element at idx
        const newWorkout = {...workout, exercises: workout.exercises.filter((e, index) => index !== idx)}
        await updateCurrentWorkout(userId, newWorkout)
        dispatch({
            type: WorkoutActionTypes.DELETE_EXERCISE_SUCCESS,
            payload: newWorkout.exercises
        });
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.DELETE_EXERCISE_FAIL,
            payload: err
        });
    }
};