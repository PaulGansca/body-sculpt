import React, { useEffect, useState } from 'react';
import { Typography, Row, Col } from 'antd';

import './workout-header.css';

import MuscleImg from '../muscle-img/muscle-img';

const { Title } = Typography;

const WorkoutHeader = (props) => {
    const { exercises, muscles } = props;
    const [primaryMuscles, setPrimaryMuscles] = useState({});
    const [musclesImages, setMusclesImages] = useState([]);

    useEffect(() => {
        exercises.forEach(e => e.muscles.forEach(m =>
            setPrimaryMuscles(prevState => {return {...prevState, [m.id]: m.name}})
       ));
    }, [exercises]);
    useEffect(() => {
        Object.keys(primaryMuscles).forEach(id => {
            const muscle = muscles.find(muscle => muscle.id === parseInt(id))
            const imgUrl = `https://wger.de/${muscle.image_url_main}`;
            const isFront = muscle.is_front;
            setMusclesImages(prevState => [...prevState, {imgUrl, isFront, id: parseInt(id)}])
        })
    }, [primaryMuscles, muscles]);


    return (
        <Row>
            <Col xs={{span: 22, offset: 1}} md={{span: 20, offset: 2}} lg={{span: 18, offset: 3}} className="workout-header">
                <Title level={3}>Muscles Engaged: {Object.keys(primaryMuscles).map(id => primaryMuscles[id]).join(', ')}</Title>
                <div className="workout-images">
                    {musclesImages.map(muscleImage => <MuscleImg key={muscleImage.id} muscleImage={muscleImage} />)}
                </div>
            </Col>
        </Row>
    )
};

export default WorkoutHeader;