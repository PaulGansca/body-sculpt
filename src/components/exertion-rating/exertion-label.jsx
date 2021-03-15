import React from 'react';

import { FundOutlined, InfoCircleOutlined } from '@ant-design/icons';

import CustomTooltip from '../antd/custom-tooltip/custom-tooltip';

import './exertion.css';

const ExertionLabel = ({difficulty, difficultyColour}) => {
    return (
        <div className="exertion-label-container">
            <FundOutlined className="exertion-label-icon" />
            <div className="exertion-text">
                <span style={{...difficultyColour}}>
                    {difficulty ? difficulty : "EXERTION RATING (RPE)"}
                    <CustomTooltip className="exertion-info-icon" title={`Rating the difficulty of sets reps and
                     weight combinations helps BodySculpt generate more accurate workloads.`}>
                        <InfoCircleOutlined />
                    </CustomTooltip>
                </span>
            </div>
        </div>
    )
}

export default ExertionLabel;