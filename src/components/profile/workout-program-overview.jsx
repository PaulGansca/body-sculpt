import React from 'react';

import CustomTag from '../antd/custom-tag/custom-tag';

import './profile.css';

const WorkoutProgramOverview = (props) => {
    return (
        <div className="workout-program">
            <h1>Push Pull Legs Program</h1>
            <p className="workout-description">This is the perfect training program for intermediate to advanced
                 lifters looking for something NEW to spark amazing results.
                 In order to maximize growth, it may be beneficial for intermediate-advanced lifters to stimulate
                 muscles more frequently throughout the week.
            </p>
            <p>Goal: <CustomTag color={'#2db7f5'}>Muscle Gain</CustomTag></p>
            <p>Experience Level: <CustomTag color={'#2db7f5'}>Intermediate</CustomTag></p>
            <p>Emphasising training: {' '}
                <CustomTag color={'#2db7f5'}>Chest</CustomTag>
                <CustomTag color={'#2db7f5'}>Shoulders</CustomTag>
            </p>
            <p>Training Frequncy: <CustomTag color={'#2db7f5'}>6 x Week</CustomTag></p>
            <p>Set workout reminders via email.</p>
        </div>
    )
};

export default WorkoutProgramOverview;