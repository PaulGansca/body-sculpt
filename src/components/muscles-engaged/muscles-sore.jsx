import React from 'react';

import { Row, Col } from 'antd';

import CustomTag from '../antd/custom-tag/custom-tag';

const MusclesSore = ({recentWorkouts, fitnessLevel}) => {
    const muscles = {}
    recentWorkouts.forEach(w => w.exercises.forEach(exercise => {
        exercise.muscles.forEach(m => {
            if(!muscles[m.id]) {
                muscles[m.id] = {...m, sets: exercise.sets.length};
            } else muscles[m.id].sets = muscles[m.id].sets + exercise.sets.length;
        })
        exercise.muscles_secondary.forEach(m => {
            if(!muscles[m.id]) {
                muscles[m.id] = {...m, sets: exercise.sets.length / 4};
            } else muscles[m.id].sets = muscles[m.id].sets + exercise.sets.length/4;
        })
    }))

    const muscleImgs = Object.keys(muscles).reduce((acc, m) => {
        muscles[m].imgUrl = `url(https://wger.de/static/images/muscles/main/muscle-${muscles[m].id}.svg)`
        if(muscles[m].is_front) acc.frontImgs.push(muscles[m])
        else acc.backImgs.push(muscles[m])
        return acc;
    }, {frontImgs: [], backImgs: []});
    const maxWorkload = {beginner: 10, intermediate: 15, advanced: 20}
    const smallScreen = window.innerWidth < 992 || Object.keys(muscles).length < 9 ? {display: 'block', marginTop: 5, marginRight: 0, width: '100%'} : {};
    
    return (
        <>
                <Row className="muscles-overview-section">
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    {muscleImgs.frontImgs.length ? <div style={{display: 'inline-block', backgroundImage: muscleImgs.frontImgs.map(i => i.imgUrl)
                        .concat("url(https://wger.de/static/images/muscles/muscular_system_front.svg)").join()}} className="muscle-background" /> :
                        <div style={{display: 'inline-block', backgroundImage: "url(https://wger.de/static/images/muscles/muscular_system_front.svg)"}} className="muscle-background" />}
                    {muscleImgs.backImgs.length ? <div style={{display: 'inline-block', backgroundImage: muscleImgs.backImgs.map(i => i.imgUrl)
                        .concat("url(https://wger.de/static/images/muscles/muscular_system_back.svg)").join()}} className="muscle-background" /> :
                        <div style={{display: 'inline-block', backgroundImage: "url(https://wger.de/static/images/muscles/muscular_system_back.svg)"}} className="muscle-background" />}
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                    <p style={{marginTop: 15}}>
                        {Object.keys(muscles).length ? "Muscles trained for optimal workload volume in the last 7 days: " : <>All muscles are fully recovered.</>}
                        {Object.keys(muscles).map((m, idx) => {
                            let workloadPercentage = Math.round(muscles[m].sets/maxWorkload[fitnessLevel] * 100);
                            workloadPercentage = workloadPercentage > 100 ? 100 : workloadPercentage;
                            return <CustomTag style={{...smallScreen}} key={idx} 
                            color={workloadPercentage > 30 ?  (workloadPercentage > 60 ? "#87d068" : "#fa8c16"): "#cc0000"}>{muscles[m].name} {' '}
                             {workloadPercentage}% of workload</CustomTag>})}
                    </p>
                </Col>
                </Row>
        </>
    );
};

export default MusclesSore;