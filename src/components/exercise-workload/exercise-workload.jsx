import React from 'react';

import { Row, Col, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';

import CustomInputNumber from '../antd/custom-inputs/custom-input-number';
import CustomButton from '../antd/custom-button/custom-button';
import ExertionRating from '../exertion-rating/exertion-rating';
import SwapExercise from '../swap-exercise/swap-exercise';

import newId from '../../utils/id-generator';

import './exercise-workload.css'

const ExerciseWorkload = ({updateExerciseWorkload, exercise, exercises, isLoading}) => {
    const { sets } = exercise;
    const getExerciseIdx = exercises.findIndex(e => e.db_id === exercise.db_id);
    const handleChange = (value, setId, field) => {
        const set = exercise.sets.find(s => s.id === setId)
        set[field] = value;
        updateExerciseWorkload(exercise);
    }
    const addSet = () => {
        const copySet = JSON.parse(JSON.stringify(sets[sets.length-1]));
        copySet.id = newId()
        exercise.sets.push(copySet);
        updateExerciseWorkload(exercise);
    }
    const deleteSet = (setId) => {
        exercise.sets = exercise.sets.filter(s => s.id !== setId)
        updateExerciseWorkload(exercise);
    }
    return (
        <>
        <Row className="exercise-workload">
            <Col xs={{span: 22, offset: 1}} md={{span: 20, offset: 2}} lg={{span: 18, offset: 3}}>
                <Divider style={{marginTop: 0}}>{sets.length} WORKING SETS</Divider>
                {sets.map((s) => 
                    <div key={s.id}>
                        <span style={{marginRight: 5}}><CustomInputNumber onChange={(v) => handleChange(v, s.id, 'reps')}
                            min={1} defaultValue={s.reps} bordered={false} /> REPS </span>
                        X 
                        <span><CustomInputNumber onChange={(v) => handleChange(v, s.id, 'weight')}
                            min={1} defaultValue={s.weight} bordered={false} /> KGs </span>
                        <CustomButton style={{marginLeft: 10}} onClick={() => deleteSet(s.id)}
                            size={"small"} danger shape={"round"} icon={<DeleteOutlined />} />
                    </div>)}
                <CustomButton style={{margin: 15}} shape={"round"} icon={<PlusOutlined />}
                    onClick={() => addSet()}>Add Working Set</CustomButton>
                <ExertionRating rpe={exercise.rpe} updateExercise={updateExerciseWorkload} exerciseIdx={getExerciseIdx} />
                <Divider><SettingOutlined /></Divider>
                <SwapExercise btnText={"Replace Exercise"} isLoading={isLoading}
                 exercise={exercise} exerciseIdx={getExerciseIdx} />
            </Col>
        </Row>
        </>
    )
}

export default ExerciseWorkload;