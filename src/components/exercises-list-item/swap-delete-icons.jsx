import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { DeleteOutlined } from '@ant-design/icons';

import SwapExercise from '../swap-exercise/swap-exercise';
import CustomButton from '../antd/custom-button/custom-button';

import { deleteExercise } from '../../redux/workout/workout.actions';
import { selectIsLoading, selectWorkout } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId } from '../../redux/user/user.selectors';

const SwapDeleteIcons = ({exercise, exerciseIdx, workout, isLoading, userId, deleteExercise }) => {
    return (
        <div style={{display: 'flex', flexDirection:'column'}}>
                <SwapExercise userId={userId} workout={workout} isLoading={isLoading} exercise={exercise} exerciseIdx={exerciseIdx} />
                <CustomButton onClick={() => deleteExercise(exerciseIdx, workout, userId)}
                    loading={isLoading} size={"small"} danger shape={"round"} icon={<DeleteOutlined />} />
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    workout: selectWorkout,
    isLoading: selectIsLoading,
    userId: selectCurrentUserId
});

const mapDispatchToProps = dispatch => ({
    deleteExercise: (exerciseId, workout, userId) => dispatch(deleteExercise(exerciseId, workout, userId, dispatch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapDeleteIcons);