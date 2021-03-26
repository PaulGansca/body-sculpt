import React from 'react';

import WorkoutHeader from '../../components/workout-header/workout-header';
import ExercisesListContainer from '../../components/exercises-list/exercises-list-container';
import AddExercise from '../../components/add-exercise/add-exercise';
import SaveWorkout from '../../components/save-workout/save-workout';

import './workout-page.css';

const WorkoutPage = (props) => {
    const { exercises, muscles, primaryMuscles, musclesImages } = props;

    return (
        <div className="workout-page">
            <SaveWorkout />
            <WorkoutHeader primaryMuscles={primaryMuscles} musclesImages={musclesImages} />
            <ExercisesListContainer AddExercise={AddExercise} exercises={exercises} muscles={muscles} />
        </div>
    )
};

export default WorkoutPage;