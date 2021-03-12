import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { updateExerciseWorkload } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises, selectWorkout } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId } from '../../redux/user/user.selectors';

import ExercisePage from './exercise-page';

const exerciseEffects = (WrappedComponent) => (props) => {
    const { match, exercises } = props;
    //use later for making sure correct workout is set in redux state and exercise
    const { workoutId, exerciseId } = match.params;
    const exercise = exercises.find(e => e.db_id === exerciseId)
    console.log(exercise)
    return (
        <WrappedComponent exercise={exercise} {...props} />    
    )

}

const mapStateToProps = createStructuredSelector({
    exercises: selectWorkoutExercises,
    currentUserId: selectCurrentUserId,
    workout: selectWorkout
})

const mapDispatchToProps = dispatch => ({
    updateExerciseWorkload: (workout, userId) => dispatch(updateExerciseWorkload(workout, userId, dispatch)),
})

const ExercisePageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    exerciseEffects
)(ExercisePage);

export default ExercisePageContainer;