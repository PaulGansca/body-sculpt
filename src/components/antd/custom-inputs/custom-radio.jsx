import React from 'react';

import { Radio, Form } from 'antd';

const CustomRadio = ({name, options, className}) => {
    return (
    <Form.Item noStyle={true} name={name} key={name}><Radio.Group className={`${className ? className : ''}`}>
        {Object.keys(options).map(key =>
            <Radio key={key} value={key}>
                {options[key]}
            </Radio>
        )}
    </Radio.Group></Form.Item>
)};

export default CustomRadio;