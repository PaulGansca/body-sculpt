import React from 'react';

import { List } from 'antd';

const CustomList = ({children, ...listProps}) => {
    return (
    <List {...listProps}>
        {children}
    </List>
)};

export default CustomList;