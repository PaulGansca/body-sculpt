import React from 'react';

import './muscle-img.css'

const MuscleImg = ({muscleImage, transform}) => {
    let bodyClass = "";
    let muscleGroupClass = "";
    if(muscleImage.id === 10 || muscleImage.id === 8 || muscleImage.id === 11) {
        bodyClass = "lower-body-upper";
        muscleGroupClass = "muscle-group-lower-body-upper";
    } else if (muscleImage.id === 15 || muscleImage.id === 7) {
        bodyClass = "lower-body-lower";
        muscleGroupClass = "muscle-group-lower-body-lower";
    } else {
        bodyClass = "upper-body";
        muscleGroupClass = "muscle-group-upper-body";
    }
    return (
        <div style={{transform}} className="muscle-group-container">
            <img alt="" className={bodyClass} src={`https://wger.de/static/images/muscles/muscular_system_${muscleImage.isFront ? "front" : "back"}.svg`} />
            {muscleImage.imgUrls && muscleImage.imgUrls.map((imgUrl, idx) => <img key={idx} alt="" className={muscleGroupClass} src={imgUrl} />)}
        </div>
    )
};

export default MuscleImg;