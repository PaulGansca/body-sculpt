import React, { useState } from 'react';

import { InfoCircleOutlined, LeftOutlined } from '@ant-design/icons';

import CustomTabs from '../../components/antd/custom-tabs/custom-tabs';
import ExerciseWorkload from '../../components/exercise-workload/exercise-workload';
import ExerciseInfo from '../../components/exercise-info/exercise-info';
import SaveWorkout from '../../components/save-workout/save-workout';
import Timer from '../../components/timer/timer'

import './exercise-page.css'

const ExercisePage = (props) => {
    const [activeKey, setActiveKey] = useState("workload");
    const { exercise, exercises, updateExerciseWorkload, isLoading, history, match, workoutState } = props;
    const tabOne = {content: <ExerciseWorkload updateExerciseWorkload={updateExerciseWorkload}
         exercise={exercise} isLoading={isLoading} exercises={exercises} />,
                    props: {key: "workload"}}
    const tabTwo = {content: <ExerciseInfo {...exercise} />,
                    props: {key: "info"}}

    return (
        <div className="exercise-page">
            <SaveWorkout />
            <Timer display={{display: 'none'}} workoutState={workoutState} />
            <h1 className="exercise-title">{activeKey === "info" ? <LeftOutlined onClick={() => setActiveKey("workload")} /> 
                : <LeftOutlined onClick={() => history.push(`/user/workout/${match.params.workoutId}`)} />} 
                <span style={{margin: '0 20px'}}>{exercise.name}</span>
                {activeKey === "workload" ? <InfoCircleOutlined onClick={() => setActiveKey("info")} /> : <></>}
            </h1>
            <CustomTabs tabBarStyle={{display: 'none'}} tabPanes={[tabOne, tabTwo]} activeKey={activeKey} />
        </div>
    )
}

export default ExercisePage;