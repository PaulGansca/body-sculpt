import { LeaderboardActionTypes } from './leaderboard.types';

const INITIAL_STATE = {
    users: [],
    isLoading: true,
    err: "",
}

const leaderboardReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LeaderboardActionTypes.FETCH_LEADERBOARD_START:
            return {
                ...state,
                err: "",
                isLoading: true,
        }
        case LeaderboardActionTypes.FETCH_LEADERBOARD_SUCCESS:
            return {
                ...state,
                users: [...action.payload],
                isLoading: false,
        }
        case LeaderboardActionTypes.FETCH_LEADERBOARD_FAIL:
            return {
                ...state,
                err: action.payload,
                isLoading: false,
        }
        default:
            return state;
    }
}

export default leaderboardReducer;