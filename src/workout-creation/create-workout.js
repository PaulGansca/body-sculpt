import { WorkoutActionTypes } from '../redux/workout/workout.types';
import newId from '../utils/id-generator';
import { createDbWorkout } from '../static/exercise-fields-stored';

export const generateWorkout = (userId, updateCurrentWorkout, dispatch) => {
    const exercises = []
    //fetch exercises
    const exerciseFetch = Promise.all([
        fetch("https://wger.de/api/v2/exerciseinfo/192/"),
        fetch("https://wger.de/api/v2/exerciseinfo/113/"),
        fetch("https://wger.de/api/v2/exerciseinfo/181/"),
        fetch("https://wger.de/api/v2/exerciseinfo/100/"),
        fetch("https://wger.de/api/v2/exerciseinfo/123/"),
        fetch("https://wger.de/api/v2/exerciseinfo/792/")]);
    
    return exerciseFetch.then(resultArray => {
        resultArray.forEach((exercise, idx) => exercise.json().then(data => {
            data.sets = [{reps: 10, weight: 50, id: newId()},
                {reps: 10, weight: 50, id: newId()}, {reps: 10, weight: 50, id: newId()}]
            data.db_id = newId();
            data.isFetched = true;
            exercises.push(data);
            if(idx === resultArray.length-1) {
                const currentWorkout = {exercises, date: new Date(), id: newId()}
                dispatch({
                type: WorkoutActionTypes.CREATE_CURRENT_WORKOUT_SUCCESS,
                payload: currentWorkout
                });
                updateCurrentWorkout(userId, createDbWorkout(currentWorkout))
            }
        }).catch(err =>  dispatch({
            type: WorkoutActionTypes.CREATE_CURRENT_WORKOUT_FAIL,
            payload: err
        })));
    }).catch(err =>  dispatch({
        type: WorkoutActionTypes.CREATE_CURRENT_WORKOUT_FAIL,
        payload: err
    }));
}