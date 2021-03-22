import React from 'react';

import { Card } from 'antd';

const CustomCard = ({children, meta, customRef, ...cardProps}) => {
    const { ...childElements } = Card;

    return (
    <Card ref={customRef} {...cardProps}>
        {meta && meta.name ? childElements[meta.name]({...meta.props}) : <></>}
        {children}
    </Card>
)};

export default CustomCard;