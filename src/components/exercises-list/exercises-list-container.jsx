import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import ExercisesList from './exercises-list';

import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { selectWorkoutState } from '../../redux/workout/workout.selectors';
import { moveExercise, createCurrentWorkout } from '../../redux/workout/workout.actions';


const mapStateToProps = createStructuredSelector({
    workoutState: selectWorkoutState,
    currentUserId: selectCurrentUserId
})

const mapDispatchToProps = dispatch => ({
    moveExercise: (oldIndex, newIndex, exercises) => dispatch(moveExercise(oldIndex, newIndex, exercises, dispatch)),
    createCurrentWorkout: userId => dispatch(createCurrentWorkout(userId, dispatch)),
});


const ExercisesListContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(ExercisesList);

export default ExercisesListContainer;