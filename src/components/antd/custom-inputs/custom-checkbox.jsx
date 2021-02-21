import React from 'react';

import { Checkbox, Form } from 'antd';

const CustomCheckbox = ({name, options, className}) => {
    return (
    <Form.Item noStyle={true} name={name} key={name}><Checkbox.Group className={`${className ? className : ''}`} name={name}>
        {Object.keys(options).map(key =>
            <Checkbox key={key} value={key}>
                {options[key]}
            </Checkbox>
        )}
    </Checkbox.Group></Form.Item>
)};

export default CustomCheckbox;