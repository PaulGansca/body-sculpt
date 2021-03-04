import React from 'react';

import { DeleteOutlined, SwapOutlined } from '@ant-design/icons';

import CustomButton from '../antd/custom-button/custom-button';
import CustomTooltip from '../antd/custom-tooltip/custom-tooltip';

const SwapDeleteIcons = (props) => {
    return (
        <div style={{display: 'flex', flexDirection:'column'}}>
                <CustomTooltip title={"Replace with another exercise in the same category"}>
                    <CustomButton style={{marginBottom: 5}} size={"small"} shape={"round"} icon={<SwapOutlined />} />
                </CustomTooltip>
                <CustomButton size={"small"} danger shape={"round"} icon={<DeleteOutlined />} />
        </div>
    )
}

export default SwapDeleteIcons;