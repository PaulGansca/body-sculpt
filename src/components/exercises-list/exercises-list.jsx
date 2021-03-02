import React from 'react';
import ExerciseListItem from '../exercises-list-item/exercise-list-item';

import { exerciseCategory }  from '../../static/exercise-category';

import './exercises-list.css';

const ExercisesList = (props) => {
    const { exercises, muscles } = props;

    return (
        <div className="exercises-list">
                {exercises.map(exercise => {
                    const muscleImage = { imgUrls: [] };
                    exercise.muscles.forEach(m => {
                        const muscle = muscles.find(muscle => muscle.id === m.id);
                        if(exerciseCategory[exercise.category.name].includes(muscle.id)) {
                            muscleImage.imgUrls.push(`https://wger.de/${muscle.image_url_main}`);
                            muscleImage.isFront = muscle.is_front;
                            muscleImage.id = m.id;
                        }
                    });
                    return <ExerciseListItem exercise={exercise} muscleImage={muscleImage} key={exercise.id} />
                })}
        </div>
    )
};

export default ExercisesList;