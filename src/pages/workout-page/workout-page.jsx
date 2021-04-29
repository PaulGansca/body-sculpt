import React from 'react';
import Joyride from 'react-joyride';

import WorkoutHeader from '../../components/workout-header/workout-header';
import ExercisesListContainer from '../../components/exercises-list/exercises-list-container';
import AddExercise from '../../components/add-exercise/add-exercise';
import SaveWorkout from '../../components/save-workout/save-workout';
import steps from './steps';

import './workout-page.css';

const WorkoutPage = (props) => {
    const { exercises, muscles, primaryMuscles, musclesImages, run, setRun } = props;
    const handleJoyrideCallback = (data) => {
        const { status } = data;
        if(status === "finished" || status === "skipped") setRun(false);
    }
    return (
        <div className="workout-page">
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
            <WorkoutHeader primaryMuscles={primaryMuscles} musclesImages={musclesImages} />
            <ExercisesListContainer AddExercise={AddExercise} exercises={exercises} muscles={muscles} />
        </div>
    )
};

export default WorkoutPage;