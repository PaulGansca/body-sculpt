import React from 'react';

import MuscleImg from '../muscle-img/muscle-img';

import './exercise-list-item.css';

const ExerciseListItem = (props) => {
    const { exercise, muscleImage, SwapDeleteIcons, ExerciseWorkload, idx, history } = props;
    return (
        <div className="exercise-list-item">
            <SwapDeleteIcons exercise={exercise} exerciseIdx={idx} />
            <span style={{display: 'contents'}} 
                onClick={() => history.push(`${history.location.pathname}/exercise/${exercise.db_id}`)}>
                <MuscleImg style={{transform: "scale(0.6)", marginRight: 0, minWidth: 150}} key={muscleImage.id} muscleImage={muscleImage} />
                <ExerciseWorkload exercise={exercise} />
            </span>
        </div>
    )
};

export default ExerciseListItem;