import React from 'react';

import { Space } from 'antd';

const CustomSpace = ({children, ...otherProps}) => {
    return (
        <Space {...otherProps}>
            {children}
        </Space>
    )
};

export default CustomSpace;