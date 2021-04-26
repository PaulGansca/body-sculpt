import { UserActionTypes } from './user.types';
import * as userOperations from '../../firebase/crud-user';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});

export const setUserGoals = (userId, goalsData, history) => dispatch => {
    dispatch({
        type: UserActionTypes.SET_USER_GOALS_START,
    });

    return userOperations.setUserGoals(userId, goalsData).then(() => {
        console.log("Document successfully updated!");
        history.push('/user/workout/new');
        return dispatch({
            type: UserActionTypes.SET_USER_GOALS_SUCCESS,
            payload: goalsData
        });
    })
    .catch((err) => {
        // The document probably doesn't exist.
        alert("Error updating document: ", err);
        return dispatch({
            type: UserActionTypes.SET_USER_GOALS_FAIL,
            payload: err
        });
    });
};

export const setProfileSettings = (userId, profileSettings) => dispatch => {
    dispatch({
        type: UserActionTypes.SET_PROFILE_SETTINGS_START,
    });
    return userOperations.setUserGoals(userId, profileSettings).then(() => {
        console.log("Document successfully updated!");
        return dispatch({
            type: UserActionTypes.SET_PROFILE_SETTINGS_SUCCESS,
            payload: profileSettings
        });
    })
    .catch((err) => {
        // The document probably doesn't exist.
        alert("Error updating document: ", err);
        return dispatch({
            type: UserActionTypes.SET_PROFILE_SETTINGS_FAIL,
            payload: err
        });
    });
};