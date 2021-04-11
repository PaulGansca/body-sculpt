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

export const setSplitType = (userId, splitType) => dispatch => {
    dispatch({
        type: UserActionTypes.SET_SPLIT_TYPE_START,
    });
    userOperations.setUserGoals(userId, splitType).then(() => {
        console.log("Document successfully updated!");
        dispatch({
            type: UserActionTypes.SET_SPLIT_TYPE_SUCCESS,
            payload: splitType
        });
    })
    .catch((err) => {
        // The document probably doesn't exist.
        alert("Error updating document: ", err);
        dispatch({
            type: UserActionTypes.SET_SPLIT_TYPE_FAIL,
            payload: err
        });
    });
  };