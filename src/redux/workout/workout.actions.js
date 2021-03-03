import { WorkoutActionTypes } from './workout.types';

import { generateWorkout } from '../../workout-creation/create-workout';
import { updateCurrentWorkout } from '../../firebase/crud-user';

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