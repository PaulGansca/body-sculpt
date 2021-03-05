import React from 'react';

import WorkoutHeader from '../../components/workout-header/workout-header';
import ExercisesList from '../../components/exercises-list/exercises-list';
import AddExercise from '../../components/add-exercise/add-exercise';

const WorkoutPage = (props) => {
    const { exercises, muscles, primaryMuscles, musclesImages } = props;

    return (
        <div className="workout-page">
            <WorkoutHeader primaryMuscles={primaryMuscles} musclesImages={musclesImages} />
            <ExercisesList AddExercise={AddExercise} exercises={exercises} muscles={muscles} />
        </div>
    )
};

export default WorkoutPage;