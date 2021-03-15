import React, { useState } from 'react';

import { InfoCircleOutlined, LeftOutlined } from '@ant-design/icons';

import CustomTabs from '../../components/antd/custom-tabs/custom-tabs';
import ExerciseWorkload from '../../components/exercise-workload/exercise-workload';
import ExerciseInfo from '../../components/exercise-info/exercise-info';

import './exercise-page.css'

const ExercisePage = (props) => {
    const [activeKey, setActiveKey] = useState("workload");
    const { exercise, workout, updateExerciseWorkload, currentUserId, isLoading } = props;
    const tabOne = {content: <ExerciseWorkload workout={workout} currentUserId={currentUserId}
     updateExerciseWorkload={updateExerciseWorkload} exercise={exercise} isLoading={isLoading} />,
                    props: {key: "workload"}}
    const tabTwo = {content: <ExerciseInfo {...exercise} />,
                    props: {key: "info"}}

    return (
        <div className="exercise-page">
            <h1 className="exercise-title">{activeKey === "info" ? <LeftOutlined onClick={() => setActiveKey("workload")} /> : <></>} 
                <span style={{margin: '0 20px'}}>{exercise.name}</span>
                {activeKey === "workload" ? <InfoCircleOutlined onClick={() => setActiveKey("info")} /> : <></>}
            </h1>
            <CustomTabs tabBarStyle={{display: 'none'}} tabPanes={[tabOne, tabTwo]} activeKey={activeKey} />
        </div>
    )
}

export default ExercisePage;