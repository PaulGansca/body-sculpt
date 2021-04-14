import { LeaderboardActionTypes } from './leaderboard.types';

import { getLeaderboard } from '../../firebase/crud-leaderboard';


export const fetchUserEntries = () => async dispatch => {
    dispatch({
        type: LeaderboardActionTypes.FETCH_LEADERBOARD_START,
    });
    try {
        //fetch firebase leaderboard entries
        const results = [];
        (await getLeaderboard()).forEach(doc => {
            results.push({...doc.data(), userId: doc.id})
        })
        dispatch({
            type: LeaderboardActionTypes.FETCH_LEADERBOARD_SUCCESS,
            payload: results
        });
    } catch (err) {
        alert("Error updating document: ", err);
        dispatch({
            type: LeaderboardActionTypes.FETCH_LEADERBOARD_FAIL,
            payload: err
        });
    }
};