import React, { useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';

import CustomModal from '../antd/custom-modal/custom-modal';
import CustomButton from '../antd/custom-button/custom-button';
import SearchExercises from './search-exercises';


const AddExercise = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState(0);
    console.log(selectedExerciseId);
    return (
        <>
            <CustomButton style={{marginRight: 130}} shape={"round"} icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}>Add Exercise</CustomButton>
            <CustomModal visible={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
                <p>Add an exercise to your workout.</p>
                <p>BodySculpt will automatically determine workload.</p>
                <SearchExercises isModalVisible={isModalVisible} setSelectedExerciseId={setSelectedExerciseId} />
            </CustomModal>
        </>
    )
};

export default AddExercise;