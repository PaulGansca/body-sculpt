import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PlusOutlined } from '@ant-design/icons';

import CustomModal from '../antd/custom-modal/custom-modal';
import CustomButton from '../antd/custom-button/custom-button';
import SearchExercises from '../search-exercises.jsx/search-exercises';

import { addExercise } from '../../redux/workout/workout.actions';
import { selectIsExerciseLoading, selectWorkoutState } from '../../redux/workout/workout.selectors';
import { selectGoal, selectFitnessLevel, selectUserWeight, selectGender, selectCurrentUserId } from '../../redux/user/user.selectors';
import customNotification from '../antd/custom-notification/custom-notification';


const AddExercise = ({addExercise, isLoading, workoutState, goal, fitnessLevel, gender, weight, userId}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState(0);
    const marginRight = {marginRight: workoutState !== "not started" ? 15 : 0};
    const userStats = {goal, fitnessLevel, gender, userWeight: weight, userId};
    return (
        <>
            <CustomButton className="add-exercise-btn" style={{...marginRight}} shape={"round"} icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}>Add Exercise</CustomButton>
            <CustomModal visible={isModalVisible} onOk={() => {
                if(selectedExerciseId > 0) {
                    addExercise(selectedExerciseId, userStats); setIsModalVisible(false)
                }
                else customNotification('error', {message: 'No Exercise Selected'})}}
                onCancel={() => setIsModalVisible(false)} confirmLoading={isLoading}>
                <p>Add an exercise to your workout.</p>
                <p>BodySculpt will automatically determine workload.</p>
                <SearchExercises setSelectedExerciseId={setSelectedExerciseId} />
            </CustomModal>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsExerciseLoading,
    workoutState: selectWorkoutState,
    goal: selectGoal,
    fitnessLevel: selectFitnessLevel,
    gender: selectGender,
    weight: selectUserWeight,
    userId: selectCurrentUserId
})

const mapDispatchToProps = dispatch => ({
    addExercise: (exerciseId, userStats) => dispatch(addExercise(exerciseId, userStats, dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddExercise);