import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { fetchWorkouts, deleteWorkout } from '../../redux/workouts/workouts.actions';
import { setWorkout } from '../../redux/workout/workout.actions';
import { selectCurrentUserId, selectTrainingFrequency, selectUserWeight } from '../../redux/user/user.selectors';
import { selectIsLoading, selectWorkoutsArray } from '../../redux/workouts/workouts.selectors';
import WorkoutsLoggedPage from './workouts-logged-page';
import CustomSpin from '../../components/antd/custom-spin/custom-spin';

const workoutEffects = (WrappedComponent) => ({fetchWorkouts, currentUserId, isLoading,
    ...otherProps}) => {

    useEffect(() => {
        if(currentUserId) {
            fetchWorkouts(currentUserId)
        }
        // eslint-disable-next-line
    }, [currentUserId]);

    return (
        isLoading ? 
            <CustomSpin size={"large"} />  :
            <WrappedComponent userId={currentUserId} {...otherProps} />
    )
}

const mapStateToProps = createStructuredSelector({
    currentUserId: selectCurrentUserId,
    isLoading: selectIsLoading,
    workouts: selectWorkoutsArray,
    trainingFrequency: selectTrainingFrequency,
    weight: selectUserWeight,
})

const mapDispatchToProps = dispatch => ({
    fetchWorkouts: userId => dispatch(fetchWorkouts(userId, dispatch)),
    setWorkout: workout => dispatch(setWorkout(workout, dispatch)),
    deleteWorkout: (userId, workoutId) => dispatch(deleteWorkout(userId, workoutId))
})

const WorkoutsLoggedPageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    workoutEffects
)(WorkoutsLoggedPage);

export default WorkoutsLoggedPageContainer;
