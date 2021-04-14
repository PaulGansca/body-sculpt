import React from 'react';

import CustomSpin from '../antd/custom-spin/custom-spin';

const WithSpinner = WrappedComponent => ({ loading, ...otherProps }) => {
    return (loading ?
         <CustomSpin size={"large"} className="main-spinner" /> 
         : <WrappedComponent {...otherProps} />);
};

export default WithSpinner;