import { WorkoutsActionTypes } from './workouts.types';

import { getUserWorkouts } from '../../firebase/crud-user';

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