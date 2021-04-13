import React from 'react';

import { Popconfirm } from 'antd';

const CustomPopconfirm = ({children, ...props}) => {
    return (
        <Popconfirm {...props}>
            {children}
        </Popconfirm>
    )
};

export default CustomPopconfirm;