import { createSelector } from 'reselect';

export const selectWorkouts = state => state.workouts;

export const selectWorkoutsArray = createSelector(
    [selectWorkouts],
    (workouts) => workouts.workouts
);

export const selectIsLoading = createSelector(
    [selectWorkouts],
    (workouts) => workouts.isLoading
);

export const selectError = createSelector(
    [selectWorkouts],
    (workouts) => workouts.error
);