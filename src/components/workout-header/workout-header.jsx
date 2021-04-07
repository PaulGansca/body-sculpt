import React from 'react';
import { Typography, Row, Col } from 'antd';
import { muscleNamesTaxonomy }  from '../../static/exercise-category';

import './workout-header.css';

import MuscleImg from '../muscle-img/muscle-img';

const { Title } = Typography;

const WorkoutHeader = (props) => {
    const { primaryMuscles, musclesImages } = props;
    const headingSize = window.innerWidth < 500 ? 5 : 3;
    return (
        <Row>
            <Col xs={{span: 22, offset: 1}} md={{span: 20, offset: 2}} lg={{span: 18, offset: 3}} className="workout-header">
                <Title level={headingSize}>Muscles Engaged: {Object.keys(primaryMuscles).map(id => muscleNamesTaxonomy[id]).join(', ')}</Title>
                <div className="workout-header-images">
                    {musclesImages.map((muscleImage, idx) => <MuscleImg key={idx} muscleImage={muscleImage} />)}
                </div>
            </Col>
        </Row>
    )
};

export default WorkoutHeader;