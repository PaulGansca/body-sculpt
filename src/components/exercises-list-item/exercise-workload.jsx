import React from 'react';

const ExerciseWorkload = (props) => {
    const { exercise } = props;
    return (
        <div style={{display: 'flex', flexFlow: 'column', alignItems: 'baseline', overflow: 'hidden'}}>
                <span style={{textAlign: 'left'}}>{exercise.name}</span>
                <span>3 sets | 10 reps | 40kg</span>
        </div>
    )
}

export default ExerciseWorkload;