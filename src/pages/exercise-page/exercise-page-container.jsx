import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

//import { createCurrentWorkout, setCurrentWorkout } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId } from '../../redux/user/user.selectors';

import ExercisePage from './exercise-page';

const exerciseEffects = (WrappedComponent) => (props) => {
    const { match, exercises } = props;
    //use later for making sure correct workout is set in redux state and exercise
    const { workoutId, exerciseId } = match.params;
    const [exercise, setExercise] = useState({});

    useEffect(() => {
        if(exercises.length) setExercise(exercises.find(e => e.db_id = exerciseId))
    }, [exercises, exerciseId])

    return (
        <WrappedComponent exercise={exercise} {...props} />    
    )

}

const mapStateToProps = createStructuredSelector({
    exercises: selectWorkoutExercises,
    currentUserId: selectCurrentUserId,
})

// const mapDispatchToProps = dispatch => ({
//     createCurrentWorkout: userId => dispatch(createCurrentWorkout(userId, dispatch)),
//     setCurrentWorkout: currentWorkout => dispatch(setCurrentWorkout(currentWorkout, dispatch))
// })

const ExercisePageContainer = compose(
    connect(mapStateToProps, null),
    withRouter,
    exerciseEffects
)(ExercisePage);

export default ExercisePageContainer;