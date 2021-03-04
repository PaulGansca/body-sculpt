import React from 'react';

import { Tooltip } from 'antd';

const CustomTooltip = ({children, ...props}) => {
    return (
    <Tooltip {...props}>{children}</Tooltip>
)};

export default CustomTooltip;