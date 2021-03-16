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

export const addExercise = (id, workout, userId) => async dispatch => {
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
        const newWorkout = {...workout, exercises: [...workout.exercises, exercise]}
        updateCurrentWorkout(userId, createDbWorkout(newWorkout))
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
        updateCurrentWorkout(userId, createDbWorkout(newWorkout))
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

export const swapExercise = (exerciseIdx, exerciseId, workout, userId) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.SWAP_EXERCISE_START,
    });

    try {
        const exercise = await getExerciseInfo(exerciseId);
        // TO DO GENERATE WORKLOAD EX
        exercise.sets = [{reps: 10, weight: 50, id: newId()},
            {reps: 10, weight: 50, id: newId()}, {reps: 10, weight: 50, id: newId()}]
        exercise.db_id = workout.exercises[exerciseIdx].db_id;
        exercise.isFetched = true;
        workout.exercises[exerciseIdx] = exercise;
        const newWorkout = { ...workout };
        updateCurrentWorkout(userId, createDbWorkout(newWorkout))
        dispatch({
            type: WorkoutActionTypes.SWAP_EXERCISE_SUCCESS,
            payload: newWorkout.exercises
        });
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.SWAP_EXERCISE_FAIL,
            payload: err
        });
    }
};

export const moveExercise = (oldIndex, newIndex, workout, userId) => async dispatch => {
    workout.exercises = arrayMove(workout.exercises, oldIndex, newIndex)
    const newWorkout = { ...workout };
    dispatch({
        type: WorkoutActionTypes.MOVE_EXERCISE_SUCCESS,
        payload: newWorkout.exercises
    });
    try {
        updateCurrentWorkout(userId, createDbWorkout(newWorkout))
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.MOVE_EXERCISE_FAIL,
            payload: err
        });
    }
};

export const updateExerciseWorkload = (workout, userId) => async dispatch => {
    dispatch({
        type: WorkoutActionTypes.UPDATE_EXERCISE_SUCCESS,
        payload: workout.exercises
    });
    try {
        updateCurrentWorkout(userId, createDbWorkout(workout))
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutActionTypes.UPDATE_EXERCISE_FAIL,
            payload: err
        });
    }
};