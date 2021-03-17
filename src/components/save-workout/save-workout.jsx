import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { saveWorkout } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises, selectIsLoading as selectIsWorkoutLoading, selectWorkoutState,
     selectDate, selectId, selectTimeElapsed } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId, selectCurrentWorkout } from '../../redux/user/user.selectors';

const SaveEffects = ({currentUserId, workoutState, saveWorkout, exercises,
    date, workoutId, timeElapsed, ...otherProps}) => {
    useEffect(() => {
        const workout = {
            id: workoutId,
            date,
            exercises,
            workoutState,
            timeElapsed
        }
        saveWorkout(workout, currentUserId)
        // eslint-disable-next-line
    }, [exercises, workoutState])

    return (
        <></>
    )
};

const mapStateToProps = createStructuredSelector({
    exercises: selectWorkoutExercises,
    currentUserId: selectCurrentUserId,
    currentWorkout: selectCurrentWorkout,
    isWorkoutLoading: selectIsWorkoutLoading,
    workoutState: selectWorkoutState,
    date: selectDate,
    workoutId: selectId,
    timeElapsed: selectTimeElapsed
})

const mapDispatchToProps = dispatch => ({
    saveWorkout: (workout, userId) => dispatch(saveWorkout(workout, userId, dispatch))
})

const SaveWorkout = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(SaveEffects);

export default SaveWorkout;
