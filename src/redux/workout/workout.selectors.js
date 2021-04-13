import { createSelector } from 'reselect';

export const selectWorkout = state => state.workout;

export const selectWorkoutExercises = createSelector(
    [selectWorkout],
    (workout) => workout.exercises
);

export const selectIsLoading = createSelector(
    [selectWorkout],
    (workout) => workout.isLoading
);
export const selectIsExerciseLoading = createSelector(
    [selectWorkout],
    (workout) => workout.isExerciseLoading
);

export const selectError = createSelector(
    [selectWorkout],
    (workout) => workout.error
);

export const selectDate = createSelector(
    [selectWorkout],
    (workout) => workout.date
);

export const selectTimeElapsed = createSelector(
    [selectWorkout],
    (workout) => workout.timeElapsed
);

export const selectWorkoutState = createSelector(
    [selectWorkout],
    (workout) => workout.workoutState
);

export const selectId = createSelector(
    [selectWorkout],
    (workout) => workout.id
);