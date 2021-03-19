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

        default:
            return state;
    }
}

export default workoutReducer;