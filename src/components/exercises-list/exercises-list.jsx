import React from 'react';

import ExerciseListItem from '../exercises-list-item/exercise-list-item';
import ExerciseWorkload from '../exercises-list-item/exercise-workload';
import SwapDeleteIcons from '../exercises-list-item/swap-delete-icons';

import { exerciseCategory }  from '../../static/exercise-category';

import './exercises-list.css';

const ExercisesList = (props) => {
    const { exercises, muscles, AddExercise } = props;

    return (
        <div className="exercises-list">
                {AddExercise ? <AddExercise /> : <></>}
                {exercises.map((exercise, idx) => {
                    const muscleImage = { imgUrls: [] };
                    exercise.muscles.forEach(m => {
                        const muscle = muscles.find(muscle => muscle.id === m.id);
                        if(exerciseCategory[exercise.category.name].includes(muscle.id)) {
                            muscleImage.imgUrls.push(`https://wger.de/${muscle.image_url_main}`);
                            muscleImage.isFront = muscle.is_front;
                            muscleImage.id = m.id;
                        }
                    });
                    return <ExerciseListItem idx={idx} ExerciseWorkload={ExerciseWorkload} SwapDeleteIcons={SwapDeleteIcons} exercise={exercise} muscleImage={muscleImage} key={exercise.id} />
                })}
        </div>
    )
};

export default ExercisesList;