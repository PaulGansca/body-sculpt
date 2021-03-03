import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createCurrentWorkout, setCurrentWorkout } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId, selectCurrentWorkout } from '../../redux/user/user.selectors';
import WorkoutPage from './workout-page';

const workoutEffects = (WrappedComponent) => ({createWorkout, currentUserId,
    setCurrentWorkout, currentWorkout, ...otherProps}) => {
    const [muscles, setMusclesArr] = useState([]);
    useEffect(() => {
        //fetch muscles targeted images
        fetch("https://wger.de/api/v2/muscle/").then(muscles => muscles.json()
            .then(muscles => setMusclesArr(muscles.results)));
        if(currentUserId) {
            if(currentWorkout.exercises && currentWorkout.exercises.length) setCurrentWorkout(currentWorkout)
            else createCurrentWorkout(currentUserId)
        }
        return () => {
            console.log('UNMOUNT');
        };
    }, [createCurrentWorkout, currentUserId]);
    return <WrappedComponent muscles={muscles} {...otherProps} />
}

const mapStateToProps = createStructuredSelector({
    exercises: selectWorkoutExercises,
    currentUserId: selectCurrentUserId,
    currentWorkout: selectCurrentWorkout
})

const mapDispatchToProps = dispatch => ({
    createCurrentWorkout: userId => dispatch(createCurrentWorkout(userId, dispatch)),
    setCurrentWorkout: currentWorkout => dispatch(setCurrentWorkout(currentWorkout, dispatch))
})

const WorkoutPageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    workoutEffects
)(WorkoutPage);

export default WorkoutPageContainer;
