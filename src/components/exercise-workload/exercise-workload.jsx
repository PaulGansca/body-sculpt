import React from 'react';

import { Row, Col, Divider } from 'antd';
import { PlusOutlined, DeleteOutlined, SettingOutlined, CheckCircleOutlined } from '@ant-design/icons';

import CustomInputNumber from '../antd/custom-inputs/custom-input-number';
import CustomButton from '../antd/custom-button/custom-button';
import ExertionRating from '../exertion-rating/exertion-rating';
import SwapExercise from '../swap-exercise/swap-exercise';
import LogSet from './log-set';

import newId from '../../utils/id-generator';

import './exercise-workload.css'

const ExerciseWorkload = ({updateExerciseWorkload, exercise, exercises, isLoading, workoutState}) => {
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
    const currentSet = sets.findIndex(s => !s.isLogged) !== -1 ? sets.findIndex(s => !s.isLogged) : sets.length;
    const workoutInProgress = workoutState !== "not started" ? true : false;
    return (
        <>
        <Row className={`exercise-workload ${workoutInProgress ? "workout-in-progress" : ""}`}>
            <Col xs={{span: 22, offset: 1}} md={{span: 20, offset: 2}} lg={{span: 18, offset: 3}}>
                <Divider style={{marginTop: 0}}>{sets.length} WORKING SETS</Divider>
                {sets.map((s, index) => 
                    <div className={`set ${index < currentSet ? "completed-set" : index === currentSet ? "current-set" : ""}`} key={s.id}>
                        <span style={{marginRight: 5}}>{index < currentSet ? <CheckCircleOutlined style={{position: 'absolute', bottom: 7, left: -15}} /> : <></>}
                            <CustomInputNumber onChange={(v) => handleChange(v, s.id, 'reps')}
                            min={1} defaultValue={s.reps} bordered={false} /> REPS </span>
                        <span>X</span>
                        <span><CustomInputNumber onChange={(v) => handleChange(v, s.id, 'weight')}
                            min={1} defaultValue={s.weight} bordered={false} /> KGs </span>
                        <CustomButton style={{marginLeft: 10}} onClick={() => deleteSet(s.id)}
                            size={"small"} danger shape={"round"} icon={<DeleteOutlined />} />
                    </div>)}
                <CustomButton style={{margin: 15}} shape={"round"} icon={<PlusOutlined />}
                    onClick={() => addSet()}>Add Working Set</CustomButton>
                {workoutInProgress ? <LogSet exerciseIdx={getExerciseIdx} currentSet={currentSet} exercise={exercise} /> : <></>}
                <ExertionRating rpe={exercise.rpe} updateExercise={updateExerciseWorkload} exercise={exercise}
                exerciseIdx={getExerciseIdx} currentSet={currentSet} />
                <Divider><SettingOutlined /></Divider>
                <SwapExercise btnText={"Replace Exercise"} isLoading={isLoading}
                 exercise={exercise} exerciseIdx={getExerciseIdx} />
            </Col>
        </Row>
        </>
    )
}

export default ExerciseWorkload;