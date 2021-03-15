import React from 'react';

import { Collapse } from 'antd';

const CustomCollapse = ({panels, ...collapseProps}) => {
    const { Panel } = Collapse;

    return (
    <Collapse {...collapseProps}>
        {panels.map(p => <Panel {...p.props}>{p.content}</Panel>)}
    </Collapse>
)};

export default CustomCollapse;