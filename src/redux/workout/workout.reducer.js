import { WorkoutActionTypes } from './workout.types';

const INITIAL_STATE = {
    exercises: [],
    date: Date.now(),
    isLoading: true,
    isExerciseLoading: false,
    err: "",
    id: "",
    timeElapsed: "0:0",
    workoutState: "not started",
}

const workoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WorkoutActionTypes.SET_WORKOUT_START:
            return {
                ...state,
                isLoading: true,
        }
        case WorkoutActionTypes.SET_WORKOUT_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
        }
        case WorkoutActionTypes.SET_WORKOUT_FAIL:
            return {
                ...state,
                isLoading: false,
                err: action.payload
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
                id: "",
                ...action.payload
        }
        case WorkoutActionTypes.CREATE_CURRENT_WORKOUT_FAIL:
            return {
                ...state,
                isLoading: false,
                err: action.payload
        }
        case WorkoutActionTypes.ADD_EXERCISE_START:
            return {
                ...state,
                isExerciseLoading: true,
        }
        case WorkoutActionTypes.ADD_EXERCISE_SUCCESS:
            return {
                ...state,
                isExerciseLoading: false,
                exercises: [...state.exercises, action.payload]
        }
        case WorkoutActionTypes.ADD_EXERCISE_FAIL:
            return {
                ...state,
                isExerciseLoading: false,
                err: action.payload
        }
        case WorkoutActionTypes.DELETE_EXERCISE:
            return {
                ...state,
                isLoading: false,
                exercises: state.exercises.filter((e, index) => index !== action.payload)
        }
        case WorkoutActionTypes.SWAP_EXERCISE_START:
            return {
                ...state,
                isExerciseLoading: true,
        }
        case WorkoutActionTypes.SWAP_EXERCISE_SUCCESS:
            return {
                ...state,
                isExerciseLoading: false,
                exercises: state.exercises.map((e, idx) =>
                 (idx === action.payload.exerciseIdx ? {...action.payload.exercise} : e))
        }
        case WorkoutActionTypes.SWAP_EXERCISE_FAIL:
            return {
                ...state,
                isExerciseLoading: false,
                err: action.payload
        }
        case WorkoutActionTypes.MOVE_EXERCISE:
            return {
                ...state,
                exercises: [...action.payload]
        }
        case WorkoutActionTypes.UPDATE_EXERCISE:
            return {
                ...state,
                exercises: state.exercises.map(e =>
                (e.db_id === action.payload.db_id ? {...action.payload} : e))
        }
        case WorkoutActionTypes.TOGGLE_WORKOUT_STATE:
            return {
                ...state,
                workoutState: action.payload
        }
        case WorkoutActionTypes.UPDATE_TIME_ELAPSED:
            return {
                ...state,
                timeElapsed: action.payload
        }
        case WorkoutActionTypes.SAVE_WORKOUT_START:
            return {
                ...state,
        }
        case WorkoutActionTypes.SAVE_WORKOUT_SUCCESS:
            return {
                ...state,
        }
        case WorkoutActionTypes.LOG_SET:
            return {
                ...state,
                exercises: state.exercises.map(e =>
                (e.db_id === action.payload.db_id ? {...action.payload} : e))
        }
        case WorkoutActionTypes.LOG_SET_WITH_SWAP:
            return {
                ...state,
                exercises: [...action.payload]
        }
        case WorkoutActionTypes.COMPLETE_WORKOUT_START:
            return {
                ...state,
        }
        case WorkoutActionTypes.COMPLETE_WORKOUT_SUCCESS:
            return {
                ...INITIAL_STATE,
                isLoading: false
        }
        case WorkoutActionTypes.COMPLETE_WORKOUT_FAIL:
            return {
                ...state,
                err: action.payload
        }
        case WorkoutActionTypes.FETCH_WORKOUT_START:
            return {
                ...state,
                isLoading: true,
        }
        case WorkoutActionTypes.FETCH_WORKOUT_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
        }
        case WorkoutActionTypes.FETCH_WORKOUT_FAIL:
            return {
                ...state,
                isLoading: false,
                err: action.payload
        }
        case WorkoutActionTypes.PERMISSION_DENIED:
            return {
                ...state,
                isLoading: false,
                err: action.payload
        }
        case WorkoutActionTypes.RESET_WORKOUT_STATE:
            return {
                ...INITIAL_STATE
        }

        default:
            return state;
    }
}

export default workoutReducer;