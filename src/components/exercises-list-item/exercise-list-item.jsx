import React from 'react';

import MuscleImg from '../muscle-img/muscle-img';

import './exercise-list-item.css';

const ExerciseListItem = (props) => {
    const { exercise, muscleImage, SwapDeleteIcons, ExerciseWorkload, idx } = props;
    return (
        <div className="exercise-list-item">
            <SwapDeleteIcons exerciseIdx={idx} />
            <MuscleImg style={{transform: "scale(0.6)", marginRight: 0, minWidth: 150}} key={muscleImage.id} muscleImage={muscleImage} />
            <ExerciseWorkload exercise={exercise} />
        </div>
    )
};

export default ExerciseListItem;