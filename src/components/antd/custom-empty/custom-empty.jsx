import React from 'react';

import { Empty } from 'antd';

const CustomEmpty = ({children, ...props}) => {
    return (
    <Empty {...props}>{children}</Empty>
)};

export default CustomEmpty;