import React from 'react';

import WorkoutHeader from '../../components/workout-header/workout-header';
import ExerciseListItem from '../../components/exercises-list-item/exercise-list-item';

const WorkoutPage = (props) => {
    const { exercises, muscles } = props;
    // console.log(exercises)
    console.log(muscles)
    return (
        <div className="workout-page">
            <WorkoutHeader muscles={muscles} exercises={exercises} />
            {exercises.map(exercise => <ExerciseListItem key={exercise.id} />)}
        </div>
    )
};

export default WorkoutPage;