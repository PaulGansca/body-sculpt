import React from 'react';

import { Carousel } from 'antd';

const CustomCarousel = ({children, customRef, ...carouselProps}) => {
    return (
    <Carousel ref={customRef} {...carouselProps}>
        {children}
    </Carousel>
)};

export default CustomCarousel;