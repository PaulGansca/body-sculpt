import React, { useState } from 'react';
import { Form } from 'antd';
import { MailOutlined, CheckCircleOutlined } from '@ant-design/icons';

import CustomButton from '../../components/antd/custom-button/custom-button';
import CustomInput from '../../components/antd/custom-inputs/custom-input';
import CustomForm from '../../components/antd/custom-form/custom-form';
import AnimatedBackground from '../../components/animated-background/animated-background';
import { ReactComponent as Logo } from '../../assets/bicep.svg';

import { auth } from '../../firebase/firebase.utils';

const formInputItems = [{
    input: <CustomInput bordered={false} placeholder="email" type="text"
        prefix={<MailOutlined style={{marginRight: 10}} className="site-form-item-icon" />} />,
    name:"email",
    rules: [{
            required: true,
            message: 'Please input your email!'
            }, {
            type: 'email',
            message: 'Not a valid email'
            }
    ]
}
]
const formTailItems = [{
    elem: (isLoading) => <CustomButton loading={isLoading} htmlType="submit" shape="round">Reset Password</CustomButton>
}
]

const handleSubmit = async (values, setIsLoading, setIsSuccessful) => {
    const { email } = values;
    setIsLoading(true);
    try {
        await auth.sendPasswordResetEmail(email);
        setIsLoading(false);
        setIsSuccessful(true);
    } catch (e){
        alert(e);
        setIsLoading(false);
        setIsSuccessful(false);
    }
}

const PasswordReset = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(undefined);

    return (
    <AnimatedBackground pageName="password-reset-page">
        <div className="login-page-container">
            <div className="branding">
                <h1 style={{color: 'white'}}>Password Recovery</h1>
                <Logo className="logo"/>
            </div>
            <div className="login-panel">
                {isSuccessful === undefined ? <CustomForm name="loginForm" onFinish={(values) => handleSubmit(values, setIsLoading, setIsSuccessful)}>
                    {formInputItems.map(({input, ...inputProps}, idx) => <Form.Item key={idx} {...inputProps}>{input}</Form.Item>)}
                    {formTailItems.map(({elem, ...tailProps}, idx) => <Form.Item key={idx} {...tailProps}>{elem(isLoading)}</Form.Item>)}
                </CustomForm> : isSuccessful === true ? 
                    <>An email to reset your password has been sent {<CheckCircleOutlined style={{color: 'green', fontSize: 20, verticalAlign: '-0.2em'}} />}</> 
                    : <>The email address entered isn't registered!</>}
            </div>
        </div>
    </AnimatedBackground>
)};

export default PasswordReset;