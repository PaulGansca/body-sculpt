import React from 'react';

import { Row } from 'antd';

import CustomTag from '../antd/custom-tag/custom-tag';
import { exerciseCategory }  from '../../static/exercise-category';
import { MUSCLES_DATA }  from '../../static/muscle-images';

const MusclesEngaged = ({muscles_secondary, muscles, category}) => {
    const muscleImgs = muscles.concat(muscles_secondary).reduce((acc, m, index) => {
        m.imgUrl = `url(https://wger.de/static/images/muscles/${index >= muscles.length ? "secondary" : "main"}/muscle-${m.id}.svg)`
        if(m.is_front) acc.frontImgs.push(m)
        else acc.backImgs.push(m)
        return acc;
    }, {frontImgs: [], backImgs: []});
    if(!muscles.concat(muscles_secondary).length) {
        muscleImgs[exerciseCategory[category.name].isFront ? "frontImgs" : "backImgs"].push({
            imgUrl: `url(https://wger.de${exerciseCategory[category.name].image_url_main})`,
            name: MUSCLES_DATA.find(m => exerciseCategory[category.name].muscleIds[0] === m.id).name,
            id: exerciseCategory[category.name].muscleIds[0]
        })
    }
    return (
        <Row style={{marginBottom: 30}} gutter={{xs: 2, sm: 4, md: 8, lg: 16}}>
                    {muscleImgs.frontImgs.length ? <div style={{backgroundImage: muscleImgs.frontImgs.map(i => i.imgUrl)
                        .concat("url(https://wger.de/static/images/muscles/muscular_system_front.svg)").join()}} className="muscle-background" /> : <></>}
                    {muscleImgs.backImgs.length ? <div style={{backgroundImage: muscleImgs.backImgs.map(i => i.imgUrl)
                        .concat("url(https://wger.de/static/images/muscles/muscular_system_back.svg)").join()}} className="muscle-background" /> : <></>}
                    <p style={{marginTop: 15}}>Muscles engaged: {muscles.map(m => <CustomTag key={m.id} color="#cc0000">{m.name}</CustomTag>)}
                         {muscles_secondary.map(m => <CustomTag key={m.id} color="#f57900">{m.name}</CustomTag>)}
                         {!muscles.concat(muscles_secondary).length ?
                            muscleImgs.frontImgs.concat(muscleImgs.backImgs)
                            .map(m => <CustomTag key={m.id} color="#cc0000">{m.name}</CustomTag>) : <></>}</p>
        </Row>
    );
};

export default MusclesEngaged;