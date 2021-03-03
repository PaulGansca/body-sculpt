import { WorkoutActionTypes } from './workout.types';

const INITIAL_STATE = {
    id: "",
    exercises: [],
    date: Date.now(),
    isLoading: false,
    err: ""
}

const workoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WorkoutActionTypes.SET_CURRENT_WORKOUT:
            return {
                ...state,
                isLoading: false,
                ...action.payload
        }
        case WorkoutActionTypes.CREATE_CURRENT_WORKOUT_START:
            return {
                ...state,
                isLoading: true,
        }
        case WorkoutActionTypes.CREATE_CURRENT_WORKOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ...action.payload
        }
        case WorkoutActionTypes.CREATE_CURRENT_WORKOUT_FAIL:
            return {
                ...state,
                isLoading: false,
                err: action.payload
        }

        default:
            return state;
    }
}

export default workoutReducer;