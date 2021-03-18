import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
);

export const selectIsLoading = createSelector(
    [selectUser],
    (user) => user.isLoading
);

export const selectError = createSelector(
    [selectUser],
    (user) => user.error
)

export const selectCurrentWorkout = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.currentWorkout
);

export const selectCurrentUserId = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.id
);

export const selectUserWeight = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.weight
);