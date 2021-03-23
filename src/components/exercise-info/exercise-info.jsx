import React from 'react';
import { Markup } from 'interweave';

import { Row, Col, Divider } from 'antd';

import CustomCard from '../antd/custom-card/custom-card';
import CustomTag from '../antd/custom-tag/custom-tag';
import MusclesEngaged from '../muscles-engaged/muscles-engaged';

import './exercise-info.css'

const ExerciseInfo = ({muscles, muscles_secondary, description, images, comments, equipment}) => {
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
                <MusclesEngaged muscles={muscles} muscles_secondary={muscles_secondary} />
            </Col>
        </Row>
    )
};

export default ExerciseInfo;