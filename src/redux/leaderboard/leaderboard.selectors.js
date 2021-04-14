import { createSelector } from 'reselect';

export const selectLeaderboard = state => state.leaderboard;

export const selectUsers = createSelector(
    [selectLeaderboard],
    (leaderboard) => leaderboard.users
);

export const selectIsLoading = createSelector(
    [selectLeaderboard],
    (leaderboard) => leaderboard.isLoading
);

export const selectError = createSelector(
    [selectLeaderboard],
    (leaderboard) => leaderboard.error
);