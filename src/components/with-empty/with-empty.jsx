import React from 'react';

import CustomEmpty from '../antd/custom-empty/custom-empty';

const WithEmpty = WrappedComponent => ({ isEmpty, emptyText, emptyProps, ...otherProps }) => {
    return (isEmpty ?
         <CustomEmpty {...emptyProps} description={<em>{emptyText}</em>} /> 
         : <WrappedComponent {...otherProps} />);
};

export default WithEmpty;