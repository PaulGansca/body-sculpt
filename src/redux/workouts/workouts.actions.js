import { WorkoutsActionTypes } from './workouts.types';

import { getUserWorkouts, deleteWorkout as firebaseDeleteWorkout} from '../../firebase/crud-user';
import { getExerciseInfo } from '../../api/wger';

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
        return dispatch({
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

export const fetchWorkoutsWithExercises = (userId) => async dispatch => {
    dispatch({
        type: WorkoutsActionTypes.FETCH_WORKOUTS_EXERCISES_START,
    });
    try {
        //fetch firebase workouts per user id
        const results = [];
        const exercises = {};
        const userWorkouts = await getUserWorkouts(userId);
        let workoutIdx = -1;
        if(!userWorkouts.empty) {
            userWorkouts.forEach(doc => {
                const temp = {...doc.data(), id: doc.id};
                Promise.all(temp.exercises.map(async (e, idx) => {
                    if(!exercises[e.id]) {
                        const exercise = await getExerciseInfo(e.id);
                        exercises[e.id] = {...exercise}
                        temp.exercises[idx] = {...exercise, ...e, isFetched: true}
                    } else temp.exercises[idx] = {...exercises[e.id], ...e, isFetched: true}
                })).then(r => {
                    workoutIdx++;
                    results.push(temp)
                    if(workoutIdx === userWorkouts.size -1) {
                        dispatch({
                            type: WorkoutsActionTypes.FETCH_WORKOUTS_EXERCISES_SUCCESS,
                            payload: results
                        });
                    }
                })
            });
        } else {
            dispatch({
                type: WorkoutsActionTypes.FETCH_WORKOUTS_EXERCISES_SUCCESS,
                payload: []
            });
        }
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: WorkoutsActionTypes.FETCH_WORKOUTS_EXERCISES_FAIL,
            payload: err
        });
    }
};

export const resetState = () => dispatch => {
    dispatch({
        type: WorkoutsActionTypes.RESET_WORKOUT_STATE,
    });
};