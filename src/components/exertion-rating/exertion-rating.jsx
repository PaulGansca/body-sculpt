import React, { useState } from 'react';

import ExertionLabel from './exertion-label';
import ExertionSlider from './exertion-slider';
import CustomCollapse from '../antd/custom-collapse/custom-collapse';
import { marks } from './marks';

const ExertionRating = ({updateExercise, exercise, rpe}) => {
    const [exertionLevel, setExertionLevel] = useState(rpe ? marks[rpe] : marks[3]);

    const handleChange = (value, label) => {
        exercise.rpe = value; 
        updateExercise(exercise);
        setExertionLevel(label);
    }
    const panels = [{
        content: <>
                <span>How difficult were those sets and reps?</span>
                <h4 style={{...exertionLevel.style, marginTop: 5}}>{exertionLevel.label}</h4>
                {exertionLevel.info}
                <ExertionSlider rpe={rpe ? rpe : 3} handleChange={handleChange} /></>, 
        props: {header: <ExertionLabel />, key: "1"}
    }];

    return (
        <div className="exertion-rating-container">
            <CustomCollapse className="rating-collapse-header" ghost panels={panels} />
        </div>
    )
}

export default ExertionRating;