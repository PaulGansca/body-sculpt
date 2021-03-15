import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { SwapOutlined } from '@ant-design/icons';

import CustomModal from '../antd/custom-modal/custom-modal';
import CustomButton from '../antd/custom-button/custom-button';
import CustomTooltip from '../antd/custom-tooltip/custom-tooltip';
import CustomTable from '../antd/custom-table/custom-table';

import { swapExercise } from '../../redux/workout/workout.actions';
import { getExercisesInCategory } from '../../api/wger';

const columns = [
    {
      title: 'Exercise',
      dataIndex: 'name',
      render: (text) => <em style={{fontWeight: 'bold'}}>{text}</em>,
    },
];


const SwapExercise = ({swapExercise, isLoading, workout, userId, exerciseIdx, exercise, btnText}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState(0);
    const [allExercises, setAllExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);

    useEffect(() => {
        if(isModalVisible) getExercisesInCategory(exercise.category.id, "&language=2&limit=1000").then(e => {setAllExercises(e.results); setFilteredExercises(e.results)})
    }, [isModalVisible, exercise.category.id]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => setSelectedExerciseId(selectedRowKeys),
        getCheckboxProps: (record) => ({
          name: record.name,
          record
        }),
      };

    return (
        <>
            <CustomTooltip title={"Replace with another exercise in the same category"}>
                    <CustomButton onClick={() => setIsModalVisible(true)}
                     style={{marginBottom: 5}} size={"small"} shape={"round"} icon={<SwapOutlined />}>
                    {btnText}</CustomButton>
            </CustomTooltip>
            <CustomModal visible={isModalVisible} onOk={() => {
                    swapExercise(exerciseIdx, selectedExerciseId, workout, userId); setIsModalVisible(false)
                }} onCancel={() => setIsModalVisible(false)} confirmLoading={isLoading}>
                <p>Swap <em style={{fontWeight: 'bold'}}>{exercise.name}</em> with one of {allExercises.length} alternatives.</p>
                <p>BodySculpt will automatically determine workload.</p>
                <Input.Search placeholder="Filter Exercises" onChange={e => setFilteredExercises(allExercises.filter(
                    exercise => exercise.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1))} />
                <CustomTable
                    columns={columns}
                    rowKey={exercise => exercise.id}
                    rowSelection={{...rowSelection, type: 'radio'}}
                    dataSource={filteredExercises}
                    showHeader={false}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.description.replace(/<\/?[^>]+(>|$)/g, "")}</p>,
                        rowExpandable: record => record.description.replace(/<\/?[^>]+(>|$)/g, "").length,
                    }}
                    pagination={{defaultPageSize: 5}}
                />
            </CustomModal>
        </>
    )
};

const mapDispatchToProps = dispatch => ({
    swapExercise: (exerciseIdx, exerciseId, workout, userId) => dispatch(swapExercise(exerciseIdx, exerciseId, workout, userId, dispatch)),
})

export default connect(null, mapDispatchToProps)(SwapExercise);