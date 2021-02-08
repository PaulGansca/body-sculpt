import React from 'react';
import { Divider } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import CustomButton from '../../components/custom-button/custom-button';
import CustomInput from '../../components/custom-inputs/custom-input';
import CustomForm from '../../components/custom-form/custom-form';
import AnimatedBackground from '../../components/animated-background/animated-background';
import { ReactComponent as Logo } from '../../assets/dumbbell.svg';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './login.css';

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
}, {
    input: <CustomInput bordered={false} placeholder="Password" type="password" 
        prefix={<LockOutlined style={{marginRight: 10}} className="site-form-item-icon" />} />,
    name:"password",
    rules: [{required: true,
        message: 'Please input your password!'}]
}
]
const formTailItems = [{
    elem: <><CustomButton htmlType="submit" shape="round">Sign in</CustomButton>
    <CustomButton type="link">Forgot password?</CustomButton></>,

}
]

const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (e){
        alert(e);
    }
}

const LoginPage = () => {
    return (
    <AnimatedBackground pageName="login-page">
        <div className="login-page-container">
            <div className="branding">
                <h1 style={{color: 'white'}}>Hello, Sign in!</h1>
                <Logo className="logo"/>
            </div>
            <div className="login-panel">
                <CustomForm formInputItems={formInputItems} formTailItems={formTailItems} handleSubmit={handleSubmit} />
                <Divider dashed={true}>Or</Divider>
                <CustomButton icon={<GoogleOutlined />} onClick={signInWithGoogle} shape="round">Sign in with google</CustomButton>
                <p style={{marginTop: 16, marginBottom: 10}}>Don't have an account?
                    {<CustomButton type="link">
                        {<Link to='/signup'>Sign Up</Link>}
                    </CustomButton>}
                </p>
            </div>
        </div>
    </AnimatedBackground>
)};

export default LoginPage;