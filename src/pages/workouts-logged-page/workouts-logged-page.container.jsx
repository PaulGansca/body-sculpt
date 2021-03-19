import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { fetchWorkouts } from '../../redux/workouts/workouts.actions';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
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
            <WrappedComponent {...otherProps} />
    )
}

const mapStateToProps = createStructuredSelector({
    currentUserId: selectCurrentUserId,
    isLoading: selectIsLoading,
    workouts: selectWorkoutsArray
})

const mapDispatchToProps = dispatch => ({
    fetchWorkouts: userId => dispatch(fetchWorkouts(userId, dispatch)),
})

const WorkoutsLoggedPageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    workoutEffects
)(WorkoutsLoggedPage);

export default WorkoutsLoggedPageContainer;
