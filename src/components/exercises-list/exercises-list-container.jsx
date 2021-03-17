import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import ExercisesList from './exercises-list';

import { selectWorkoutState } from '../../redux/workout/workout.selectors';
import { moveExercise, toggleWorkoutState } from '../../redux/workout/workout.actions';


const mapStateToProps = createStructuredSelector({
    workoutState: selectWorkoutState
})

const mapDispatchToProps = dispatch => ({
    moveExercise: (oldIndex, newIndex, exercises) => dispatch(moveExercise(oldIndex, newIndex, exercises, dispatch)),
    toggleWorkoutState: (state) => dispatch(toggleWorkoutState(state, dispatch))
});


const ExercisesListContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(ExercisesList);

export default ExercisesListContainer;