import { WorkoutActionTypes } from '../redux/workout/workout.types';
import newId from '../utils/id-generator';

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
            data.sets = 4
            data.reps = 10
            data.weight = 50
            exercises.push(data);
            if(idx === resultArray.length-1) {
                const currentWorkout = {exercises, date: new Date(), id: newId()}
                dispatch({
                type: WorkoutActionTypes.CREATE_CURRENT_WORKOUT_SUCCESS,
                payload: currentWorkout
                });
                updateCurrentWorkout(userId, currentWorkout)
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