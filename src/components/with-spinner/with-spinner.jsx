import React from 'react';

import CustomSpin from '../antd/custom-spin/custom-spin';

const WithSpinner = WrappedComponent => ({ loading, ...otherProps }) => {
    return (loading ?
         <CustomSpin /> 
         : <WrappedComponent {...otherProps} />);
};

export default WithSpinner;