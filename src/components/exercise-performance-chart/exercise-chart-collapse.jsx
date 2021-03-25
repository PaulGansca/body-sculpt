import React from 'react';
import { StarFilled } from '@ant-design/icons';

import ExerciseChartContainer from './exercise-performance-chart-container';
import CustomCollapse from '../antd/custom-collapse/custom-collapse';

const ExerciseChartCollapse = ({exerciseId}) => {
    const panels = [{
        content: <ExerciseChartContainer exerciseId={exerciseId} />, 
        props: {header: <h3><StarFilled style={{color: "#ffd662ff", fontSize: 24, marginRight: 5}} /> Achievements</h3>, key: "1"}
    }];
    return (
        <div className="exercise-chart-container">
            <CustomCollapse className="exercise-collapse-header" ghost panels={panels} />
        </div>
    )
}

export default ExerciseChartCollapse;