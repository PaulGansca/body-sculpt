import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchWorkoutsWithExercises } from '../../redux/workouts/workouts.actions';
import { setProfileSettings } from '../../redux/user/user.actions';
import { selectCurrentUser, selectIsLoading, selectCurrentUserId, selectIsSplitLoading } from '../../redux/user/user.selectors';
import { selectWorkoutsArray, selectIsLoading as workoutsLoading } from '../../redux/workouts/workouts.selectors';

import ProfilePage from './profile-page';
import CustomSpin from '../../components/antd/custom-spin/custom-spin';

const profileEffects = (WrappedComponent) => ({fetchWorkoutsWithExercises, currentUserId, userLoading,
    workoutsLoading, ...otherProps}) => {

    useEffect(() => {
        if(currentUserId) {
            fetchWorkoutsWithExercises(currentUserId)
        }
        // eslint-disable-next-line
    }, [currentUserId]);
    return (
        workoutsLoading || userLoading ? 
            <CustomSpin className="main-spinner" size={"large"} />  :
            <WrappedComponent userId={currentUserId} {...otherProps} />
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    userLoading: selectIsLoading,
    workoutsLoading: workoutsLoading,
    workouts: selectWorkoutsArray,
    currentUserId: selectCurrentUserId,
    isSplitLoading: selectIsSplitLoading
})

const mapDispatchToProps = (dispatch) => ({
    fetchWorkoutsWithExercises: (userId) => dispatch(fetchWorkoutsWithExercises(userId, dispatch)),
    setProfileSettings: (userId, profileSettings) => dispatch(setProfileSettings(userId, profileSettings, dispatch))
})

const ProfilePageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    profileEffects
)(ProfilePage);

export default ProfilePageContainer;
