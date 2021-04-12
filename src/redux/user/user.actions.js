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

    userOperations.setUserGoals(userId, goalsData).then(() => {
        console.log("Document successfully updated!");
        dispatch({
            type: UserActionTypes.SET_USER_GOALS_SUCCESS,
            payload: goalsData
        });
        history.push('/user/workout/new');
    })
    .catch((err) => {
        // The document probably doesn't exist.
        alert("Error updating document: ", err);
        dispatch({
            type: UserActionTypes.SET_USER_GOALS_FAIL,
            payload: err
        });
    });
};

export const setProfileSettings = (userId, profileSettings) => dispatch => {
    dispatch({
        type: UserActionTypes.SET_PROFILE_SETTINGS_START,
    });
    userOperations.setUserGoals(userId, profileSettings).then(() => {
        console.log("Document successfully updated!");
        dispatch({
            type: UserActionTypes.SET_PROFILE_SETTINGS_SUCCESS,
            payload: profileSettings
        });
    })
    .catch((err) => {
        // The document probably doesn't exist.
        alert("Error updating document: ", err);
        dispatch({
            type: UserActionTypes.SET_PROFILE_SETTINGS_FAIL,
            payload: err
        });
    });
};