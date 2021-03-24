import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const CustomSelect = ({options, ...selectProps}) => {
    return (
        <Select {...selectProps}>
            {options.map(o => <Option {...o.props}>{o.text}</Option>)}
        </Select>
    );
};

export default CustomSelect;