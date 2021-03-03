import { createSelector } from 'reselect';

const selectWorkout = state => state.workout;

export const selectWorkoutExercises = createSelector(
    [selectWorkout],
    (workout) => workout.exercises
);

export const selectIsLoading = createSelector(
    [selectWorkout],
    (workout) => workout.isLoading
);

export const selectError = createSelector(
    [selectWorkout],
    (workout) => workout.error
)