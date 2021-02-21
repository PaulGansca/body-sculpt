import React from 'react';

import { Typography } from 'antd';

import './question.css';

const { Title } = Typography;

const Question = ({question}) => {
    return (
    <Typography className="question-container">
        <Title level={2}>{question.text}</Title>
        {question.input}
    </Typography>
)};

export default Question;