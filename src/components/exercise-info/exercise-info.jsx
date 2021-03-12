import React from 'react';
import { Markup } from 'interweave';

import { Row, Col, Divider } from 'antd';

import CustomCard from '../antd/custom-card/custom-card';
import CustomTag from '../antd/custom-tag/custom-tag';


import './exercise-info.css'

const ExerciseInfo = ({muscles, muscles_secondary, description, images, comments, equipment}) => {
    const muscleImgs = muscles.concat(muscles_secondary).reduce((acc, m, index) => {
        m.imgUrl = `url(https://wger.de/static/images/muscles/${index >= muscles.length ? "secondary" : "main"}/muscle-${m.id}.svg)`
        if(m.is_front) acc.frontImgs.push(m)
        else acc.backImgs.push(m)
        return acc;
    }, {frontImgs: [], backImgs: []});

    return (
        <Row className="exercise-info">
            <Col xs={{span: 20, offset: 2}} lg={{span: 18, offset: 3}}>
                {images.length ? 
                    <Row gutter={{xs: 4, sm: 8, md: 16}} className="images-container">
                    {images.map(image => <Col key={image.id} xs={{ span: 12 }}>
                        <CustomCard meta={{name: "Meta", props: {title: image.is_main ? "BEGIN" : "END"}}} hoverable
                         cover={<img alt="" src={image.image} />} /></Col>)} 
                    </Row> : <></>}
                {equipment.length ? <p>Equipment required: {equipment.map(e => <CustomTag key={e.id} color="#87d068">{e.name}</CustomTag>)}</p> : <></>}
                {description ? 
                    <>
                        <Divider orientation="left">Instructions</Divider>
                        <Markup content={description} />
                    </> : ""}
                <>
                    {comments.length ? comments.map(c => <Markup key={c.id} content={c.comment} />) : <></>}
                </>
                <Divider orientation="left">Muscles</Divider>
                <Row style={{marginBottom: 30}} gutter={{xs: 2, sm: 4, md: 8, lg: 16}}>
                    {muscleImgs.frontImgs.length ? <div style={{backgroundImage: muscleImgs.frontImgs.map(i => i.imgUrl)
                        .concat("url(https://wger.de/static/images/muscles/muscular_system_front.svg)").join()}} className="muscle-background" /> : <></>}
                    {muscleImgs.backImgs.length ? <div style={{backgroundImage: muscleImgs.backImgs.map(i => i.imgUrl)
                        .concat("url(https://wger.de/static/images/muscles/muscular_system_back.svg)").join()}} className="muscle-background" /> : <></>}
                    <p style={{marginTop: 15}}>Muscles engaged: {muscles.map(m => <CustomTag key={m.id} color="#cc0000">{m.name}</CustomTag>)}
                         {muscles_secondary.map(m => <CustomTag key={m.id} color="#f57900">{m.name}</CustomTag>)}</p>
                </Row>
            </Col>
        </Row>
    )
};

export default ExerciseInfo;