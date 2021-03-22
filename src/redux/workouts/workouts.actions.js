import { WorkoutsActionTypes } from './workouts.types';

import { getUserWorkouts, deleteWorkout as firebaseDeleteWorkout} from '../../firebase/crud-user';

export const fetchWorkouts = (userId) => async dispatch => {
    dispatch({
        type: WorkoutsActionTypes.FETCH_WORKOUTS_START,
    });
    try {
        //fetch firebase workouts per user id
        const results = [];
        (await getUserWorkouts(userId)).forEach(doc => {
            results.push({...doc.data(), id: doc.id})
        })
        dispatch({
            type: WorkoutsActionTypes.FETCH_WORKOUTS_SUCCESS,
            payload: results
        });
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutsActionTypes.FETCH_WORKOUTS_FAIL,
            payload: err
        });
    }
};

export const deleteWorkout = (userId, workoutId) => async dispatch => {
    dispatch({
        type: WorkoutsActionTypes.DELETE_WORKOUT_START,
    });
    try {
        const res = await firebaseDeleteWorkout(userId, workoutId);
        if(res !== "Permission Denied") {
            dispatch({
                type: WorkoutsActionTypes.DELETE_WORKOUT_SUCCESS,
                payload: workoutId
            });
        } else {
            dispatch({
                type: WorkoutsActionTypes.PERMISSION_DENIED,
                payload: "Permission Denied"
            });
        }
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutsActionTypes.DELETE_WORKOUT_FAIL,
            payload: err
        });
    }
};