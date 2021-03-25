import React from 'react';

import { Drawer } from 'antd';

const CustomDrawer = ({children, customRef, ...drawerProps}) => {
    return (
    <Drawer ref={customRef} {...drawerProps}>
        {children}
    </Drawer>
)};

export default CustomDrawer;