import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { saveWorkout } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises, selectIsLoading as selectIsWorkoutLoading, selectWorkoutState,
     selectDate, selectTimeElapsed, selectId } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId, selectCurrentWorkout } from '../../redux/user/user.selectors';

const SaveEffects = ({currentUserId, workoutState, saveWorkout, exercises,
    date, workoutId, timeElapsed, ...otherProps}) => {
    useEffect(() => {
        const workout = {
            date,
            exercises,
            workoutState,
            timeElapsed
        }
        saveWorkout(workout, currentUserId, workoutId)
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
    saveWorkout: (workout, userId, workoutId) => dispatch(saveWorkout(workout, userId, workoutId, dispatch))
})

const SaveWorkout = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(SaveEffects);

export default SaveWorkout;
