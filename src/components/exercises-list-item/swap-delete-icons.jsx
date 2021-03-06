import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { DeleteOutlined, SwapOutlined } from '@ant-design/icons';

import CustomButton from '../antd/custom-button/custom-button';
import CustomTooltip from '../antd/custom-tooltip/custom-tooltip';

import { deleteExercise } from '../../redux/workout/workout.actions';
import { selectIsLoading, selectWorkout } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId } from '../../redux/user/user.selectors';

const SwapDeleteIcons = ({workout, isLoading, userId, exerciseIdx, deleteExercise}) => {
    return (
        <div style={{display: 'flex', flexDirection:'column'}}>
                <CustomTooltip title={"Replace with another exercise in the same category"}>
                    <CustomButton style={{marginBottom: 5}} size={"small"} shape={"round"} icon={<SwapOutlined />} />
                </CustomTooltip>
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