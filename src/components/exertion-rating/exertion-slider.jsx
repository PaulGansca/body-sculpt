import React from 'react';

import CustomSlider from '../antd/custom-inputs/custom-slider';
import { marks } from './marks';

const ExertionSlider = ({handleChange, rpe}) => {

    return (
        <CustomSlider min={1} max={5} onChange={(v) => handleChange(v, marks[v])} marks={marks} step={null} defaultValue={rpe} />
    )
}

export default ExertionSlider;