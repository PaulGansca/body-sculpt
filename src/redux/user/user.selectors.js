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

export const selectDisplayName = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.displayName
);

export const selectUserWeight = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.weight
);

export const selectTrainingFrequency = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.trainingFrequency
);

export const selectSplitType = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.splitType
);

export const selectTrainingDuration = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.trainingDuration
);

export const selectFitnessLevel = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.fitnessLevel
);

export const selectGoal = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.goal
);

export const selectGender = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.gender
);

export const selectIsSplitLoading = createSelector(
    [selectUser],
    (user) => user.isSplitLoading
);

export const selectWorkoutReminders = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.workoutReminders
);

export const selectTrainingDays = createSelector(
    [selectCurrentUser],
    (currentUser) => currentUser.trainingDays
);