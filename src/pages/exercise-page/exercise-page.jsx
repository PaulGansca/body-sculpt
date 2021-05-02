import React, { useState } from 'react';
import Joyride from 'react-joyride';

import { InfoCircleOutlined, LeftOutlined } from '@ant-design/icons';

import CustomTabs from '../../components/antd/custom-tabs/custom-tabs';
import ExerciseWorkload from '../../components/exercise-workload/exercise-workload';
import ExerciseInfo from '../../components/exercise-info/exercise-info';
import SaveWorkout from '../../components/save-workout/save-workout';
import Timer from '../../components/timer/timer';
import steps from './steps';

import './exercise-page.css'

const ExercisePage = (props) => {
    const [activeKey, setActiveKey] = useState("workload");
    const { exercise, exercises, updateExerciseWorkload, isLoading, history, match, workoutState, run, setRun } = props;
    
    const tabOne = {content: <ExerciseWorkload updateExerciseWorkload={updateExerciseWorkload}
         exercise={exercise} isLoading={isLoading} exercises={exercises} workoutState={workoutState} />,
                    props: {key: "workload"}}
    const tabTwo = {content: <ExerciseInfo {...exercise} />,
                    props: {key: "info"}}
    const handleJoyrideCallback = (data) => {
        window.localStorage.setItem("exerciseTutorial", "complete")
        const { status, index, action, lifecycle } = data;
        if(index === 4 && action === "next" && lifecycle === "complete") setActiveKey("info")
        if(status === "finished" || status === "skipped") setRun(false);
    }
    return (
        <div className="exercise-page">
        <Joyride
                callback={handleJoyrideCallback}
                continuous={true}
                run={run}
                scrollToFirstStep={true}
                getHelpers={Joyride.getHelpers}
                showProgress={true}
                showSkipButton={true}
                steps={steps}
                styles={{
                    options: {
                    zIndex: 10000,
                    },
                }}
                />
            <SaveWorkout />
            <h1 className="exercise-title">{activeKey === "info" ? <LeftOutlined onClick={() => setActiveKey("workload")} /> 
                : <LeftOutlined onClick={() => history.push(`/user/workout/${match.params.workoutId}`)} />} 
                <span style={{margin: '0 20px'}}>{exercise.name}</span>
                {activeKey === "workload" ? <InfoCircleOutlined className="exercise-info-icon" onClick={() => setActiveKey("info")} /> : <></>}
            </h1>
            {workoutState !== "not started" ? <Timer display={{display: 'block', textAlign: 'center'}} workoutState={workoutState} /> : <></>}
            <CustomTabs tabBarStyle={{display: 'none'}} tabPanes={[tabOne, tabTwo]} activeKey={activeKey} />
        </div>
    )
}

export default ExercisePage;