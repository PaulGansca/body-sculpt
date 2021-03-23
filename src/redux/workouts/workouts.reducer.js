import { WorkoutsActionTypes } from './workouts.types';

const INITIAL_STATE = {
    workouts: [],
    isLoading: true,
    err: "",
}

const workoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WorkoutsActionTypes.FETCH_WORKOUTS_START:
            return {
                ...state,
                err: "",
                isLoading: true,
        }
        case WorkoutsActionTypes.FETCH_WORKOUTS_SUCCESS:
            return {
                ...state,
                workouts: [...action.payload],
                isLoading: false,
        }
        case WorkoutsActionTypes.FETCH_WORKOUTS_FAIL:
            return {
                ...state,
                err: action.payload,
                isLoading: false,
        }
        case WorkoutsActionTypes.DELETE_WORKOUT_START:
            return {
                ...state,
                err: "",
        }
        case WorkoutsActionTypes.DELETE_WORKOUT_SUCCESS:
            return {
                ...state,
                workouts: state.workouts.filter(w => w.id !== action.payload),
        }
        case WorkoutsActionTypes.DELETE_WORKOUT_FAIL:
            return {
                ...state,
                err: action.payload,
        }
        case WorkoutsActionTypes.PERMISSION_DENIED:
            return {
                ...state,
                isLoading: false,
                err: action.payload
        }
        case WorkoutsActionTypes.FETCH_WORKOUTS_EXERCISES_START:
            return {
                ...state,
                err: "",
                isLoading: true,
        }
        case WorkoutsActionTypes.FETCH_WORKOUTS_EXERCISES_SUCCESS:
            return {
                ...state,
                err: "",
                workouts: [...action.payload],
                isLoading: false,
        }
        case WorkoutsActionTypes.FETCH_WORKOUTS_EXERCISES_FAIL:
            return {
                ...state,
                err: action.payload,
                isLoading: false,
        }

        default:
            return state;
    }
}

export default workoutReducer;