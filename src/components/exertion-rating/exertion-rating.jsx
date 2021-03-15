import React, { useState } from 'react';

import ExertionLabel from './exertion-label';
import ExertionSlider from './exertion-slider';
import CustomCollapse from '../antd/custom-collapse/custom-collapse';
import { marks } from './marks';

const ExertionRating = ({rpe}) => {
    const [exertionLevel, setExertionLevel] = useState(rpe ? marks[rpe] : marks[3]);

    const handleChange = (value, label) => {
        console.log(value);
        setExertionLevel(label);
    }
    const panels = [{
        content: <>
                <span>How difficult were those sets and reps?</span>
                <h4 style={{...exertionLevel.style, marginTop: 5}}>{exertionLevel.label}</h4>
                {exertionLevel.info}
                <ExertionSlider handleChange={handleChange} /></>, 
        props: {header: <ExertionLabel />, key: "1"}
    }];

    return (
        <div className="exertion-rating-container">
            <CustomCollapse className="rating-collapse-header" ghost panels={panels} />
        </div>
    )
}

export default ExertionRating;