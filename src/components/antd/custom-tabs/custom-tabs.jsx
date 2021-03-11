import React from 'react';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

const CustomTabs = ({tabPanes, ...tabProps}) => {
    return (
        <Tabs {...tabProps}>
            {tabPanes.map(tp => <TabPane {...tp.props}>{tp.content}</TabPane>)}
        </Tabs>
    );
};

export default CustomTabs;