import React from 'react';

import './animated-background.css';

const AnimatedBackground = ({children, pageName, ...props}) => {
    return (
    <div className={`auth-page background ${pageName ? pageName : ''}`}>
        {children}
    </div>
)};

export default AnimatedBackground;