import React from 'react';
import { Button } from 'antd';

import CustomButton from '../../components/custom-button/custom-button';
import { ReactComponent as Logo } from '../../assets/dumbbell.svg';
import './homepage.css';

const HomePage = ({history, ...props}) => (
    <div className="homepage background">
        <div className="homepage-container">
            <div className="branding">
                <h1>Welcome Back</h1>
                <Logo className="logo" />
                <h1>BODY SCULPT</h1>
                <h3>Your new personal trainer</h3>
            </div>

            <CustomButton
                onClick={() => history.push('/login')}
                style={{width: 200, marginBottom: 25}}
                shape="round">
                LOGIN
            </CustomButton>
            <CustomButton
                onClick={() => history.push('/signup')}
                style={{width: 200}}
                shape="round">
                SIGN UP
            </CustomButton>
        </div>
    </div>
)

export default HomePage;