import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { PlusOutlined } from '@ant-design/icons';

import CustomModal from '../antd/custom-modal/custom-modal';
import CustomButton from '../antd/custom-button/custom-button';
import SearchExercises from '../search-exercises.jsx/search-exercises';

import { addExercise } from '../../redux/workout/workout.actions';
import { selectIsLoading, selectWorkout } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId } from '../../redux/user/user.selectors';


const AddExercise = ({addExercise, isLoading, workout, userId}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState(0);
    return (
        <>
            <CustomButton style={{marginRight: 130}} shape={"round"} icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}>Add Exercise</CustomButton>
            <CustomModal visible={isModalVisible} onOk={() => {addExercise(selectedExerciseId, workout, userId); setIsModalVisible(false)}}
                onCancel={() => setIsModalVisible(false)} confirmLoading={isLoading}>
                <p>Add an exercise to your workout.</p>
                <p>BodySculpt will automatically determine workload.</p>
                <SearchExercises isModalVisible={isModalVisible} setSelectedExerciseId={setSelectedExerciseId} />
            </CustomModal>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    workout: selectWorkout,
    isLoading: selectIsLoading,
    userId: selectCurrentUserId
})

const mapDispatchToProps = dispatch => ({
    addExercise: (exerciseId, workout, userId) => dispatch(addExercise(exerciseId, workout, userId, dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddExercise);