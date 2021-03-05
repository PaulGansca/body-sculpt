import React from 'react';

import { AutoComplete } from 'antd';

const CustomAutoComplete = ({children, ...props}) => {
    return (
        <AutoComplete {...props}>
            {children}
        </AutoComplete>
    )
};

export default CustomAutoComplete;
