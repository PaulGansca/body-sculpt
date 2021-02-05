import React from 'react';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import CustomButton from '../../components/custom-button/custom-button';
import CustomInput from '../../components/custom-inputs/custom-input';
import CustomForm from '../../components/custom-form/custom-form';
import AnimatedBackground from '../../components/animated-background/animated-background';
import { ReactComponent as Logo } from '../../assets/dumbbell.svg';

import './signup.css';

const SignUpPage = () => {
    const formInputItems = [{
        input: <CustomInput bordered={false} placeholder="Name" type="text" 
            prefix={<UserOutlined style={{marginRight: 10}} className="site-form-item-icon" />} />,
        name:"name",
        rules: [{required: true,
            message: 'Please input your password!'}]
        }, {
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
            input: <CustomInput bordered={false} placeholder="Create Password" type="password" 
                prefix={<LockOutlined style={{marginRight: 10}} className="site-form-item-icon" />} />,
            name:"password",
            rules: [{required: true,
                message: 'Please input your password!'}]
        }, {
            input: <CustomInput bordered={false} placeholder="Confirm Password" type="password" 
                prefix={<LockOutlined style={{marginRight: 10}} className="site-form-item-icon" />} />,
            name:"confirmPassword",
            rules: [{required: true,
                message: 'Please input your password!'}]
        }
    ]
    const formTailItems = [{
            elem: <CustomButton htmlType="submit" shape="round">Sign up</CustomButton>
        }
    ]
    return (
    <AnimatedBackground pageName="signup-page">
        <div className="signup-page-container">
            <div className="branding">
                <h1 style={{color: 'white'}}>Create your account</h1>
                <Logo className="logo"/>
            </div>
            <div className="signup-panel">
                <CustomForm formInputItems={formInputItems} formTailItems={formTailItems} />
                <p style={{marginTop: 16, marginBottom: 10}}>Already have an account?
                    {<CustomButton type="link">
                        {<Link to='/login'>Login</Link>}
                    </CustomButton>}
                </p>
            </div>
        </div>
    </AnimatedBackground>
)};

export default SignUpPage;