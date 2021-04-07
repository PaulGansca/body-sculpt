import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { updateExerciseWorkload } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises, selectIsLoading, selectWorkoutState } from '../../redux/workout/workout.selectors';

import ExercisePage from './exercise-page';

const exerciseEffects = (WrappedComponent) => (props) => {
    const { match, exercises } = props;
    //use later for making sure correct workout is set in redux state and exercise
    const { exerciseId } = match.params;
    const exercise = exercises.find(e => e.db_id === exerciseId)
    
    return (
        <WrappedComponent exercise={exercise} {...props} />    
    )

}

const mapStateToProps = createStructuredSelector({
    exercises: selectWorkoutExercises,
    isLoading: selectIsLoading,
    workoutState: selectWorkoutState
})

const mapDispatchToProps = dispatch => ({
    updateExerciseWorkload: (exercise) => dispatch(updateExerciseWorkload(exercise, dispatch))
})

const ExercisePageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    exerciseEffects
)(ExercisePage);

export default ExercisePageContainer;