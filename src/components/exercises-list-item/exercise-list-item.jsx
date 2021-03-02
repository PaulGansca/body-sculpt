import React from 'react';

import MuscleImg from '../muscle-img/muscle-img';

const ExerciseListItem = (props) => {
    const { exercise, muscleImage } = props;
    return (
        <div style={{display: 'flex', width: 360}}>
            <MuscleImg key={muscleImage.id} muscleImage={muscleImage} transform={"scale(0.6)"} />
            <div style={{display: 'flex', flexFlow: 'column', alignItems: 'baseline', alignSelf: 'center'}}>
                <span>{exercise.name}</span>
                <span>3 sets | 10 reps | 40kg</span>
            </div>
        </div>
    )
};

export default ExerciseListItem;