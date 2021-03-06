import React from 'react';
import { Form } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import CustomButton from '../../components/antd/custom-button/custom-button';
import CustomInput from '../../components/antd/custom-inputs/custom-input';
import CustomForm from '../../components/antd/custom-form/custom-form';
import AnimatedBackground from '../../components/animated-background/animated-background';
import { ReactComponent as Logo } from '../../assets/bicep.svg';

import { auth } from '../../firebase/firebase.utils';
import { checkEmailExists, createUserProfileDocument } from '../../firebase/crud-user';

import './signup.css';
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const formInputItems = [{
    input: <CustomInput bordered={false} placeholder="Name" type="text" 
        prefix={<UserOutlined style={{marginRight: 10}} className="site-form-item-icon" />} />,
    name:"displayName",
    rules: [{required: true,
        message: 'Please input your name!'}]
    }, {
        input: <CustomInput bordered={false} placeholder="email" type="text"
            prefix={<MailOutlined style={{marginRight: 10}} className="site-form-item-icon" />} />,
        name:"email",
        hasFeedback: true,
        rules: [
                () => ({
                    async validator(_, value) {
                        if(value) {
                            if(regexEmail.test(value)) {
                                if(await checkEmailExists(value)) return Promise.reject('Email already in use!')
                                else return Promise.resolve();
                            } else return Promise.reject('Not a valid email!')
                        } else {
                            return Promise.reject('Please input your email!');
                        }
                    },
                })
        ]
    }, {
        input: <CustomInput bordered={false} placeholder="Create Password" type="password" 
            prefix={<LockOutlined style={{marginRight: 10}} className="site-form-item-icon" />} />,
        name:"password",
        hasFeedback: true,
        rules: [{
                required: true,
                message: 'Please input your password!'
                }, {
                min: 6,
                message: 'Password should be at least 6 characters'
                }
        ]
    }, {
        input: <CustomInput bordered={false} placeholder="Confirm Password" type="password" 
            prefix={<LockOutlined style={{marginRight: 10}} className="site-form-item-icon" />} />,
        name:"confirmPassword",
        dependencies: ['password'],
        hasFeedback: true,
        rules: [{
                required: true,
                message: 'Please input your password!'
                }, {
                    min: 6,
                    message: 'Password should be at least 6 characters'
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject('The two passwords that you entered do not match!');
                    },
                })
        ]
    }
]
const formTailItems = [{
        elem: <CustomButton htmlType="submit" shape="round">Sign up</CustomButton>
    }
]

const handleSubmit = async (values) => {
    const { displayName, email, password } = values;

    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        await createUserProfileDocument(user, {displayName});
    } catch (e) {
        alert(e)
    }
}

const SignUpPage = () => {
    
    return (
    <AnimatedBackground pageName="signup-page">
        <div className="signup-page-container">
            <div className="branding">
                <h1 style={{color: 'white'}}>Create your account</h1>
                <Logo className="logo"/>
            </div>
            <div className="signup-panel">
                <CustomForm name="signUpForm" onFinish={handleSubmit}>
                    {formInputItems.map(({input, ...inputProps}, idx) => <Form.Item key={idx} {...inputProps}>{input}</Form.Item>)}
                    {formTailItems.map(({elem, ...tailProps}, idx) => <Form.Item key={idx} {...tailProps}>{elem}</Form.Item>)}
                </CustomForm>
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