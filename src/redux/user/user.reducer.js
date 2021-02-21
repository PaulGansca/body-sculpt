import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: "",
    isLoading: false,
    error: ""
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
        }
        case UserActionTypes.SET_USER_GOALS_START:
            return {
                ...state,
                isLoading: true,
        }
        case UserActionTypes.SET_USER_GOALS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: {
                    ...action.payload,
                    ...state.currentUser,
                }
        }
        case UserActionTypes.SET_USER_GOALS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
        }
        default:
            return state;
    }
}

export default userReducer;