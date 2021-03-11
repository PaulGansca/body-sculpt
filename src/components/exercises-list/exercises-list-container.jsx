import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import ExercisesList from './exercises-list';

import { selectWorkout } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { moveExercise } from '../../redux/workout/workout.actions';


const mapStateToProps = createStructuredSelector({
    workout: selectWorkout,
    userId: selectCurrentUserId
})

const mapDispatchToProps = dispatch => ({
    moveExercise: (oldIndex, newIndex, workout, userId) => dispatch(moveExercise(oldIndex, newIndex, workout, userId, dispatch)),
});


const ExercisesListContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(ExercisesList);

export default ExercisesListContainer;