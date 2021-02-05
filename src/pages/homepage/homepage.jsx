import React from 'react';

import CustomButton from '../../components/custom-button/custom-button';
import { ReactComponent as Logo } from '../../assets/dumbbell.svg';
import AnimatedBackground from '../../components/animated-background/animated-background';
//import { ReactComponent as Wave } from '../../assets/wave.svg';

import './homepage.css';

const HomePage = ({history, ...props}) => (
    <AnimatedBackground pageName="homepage">
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
    </AnimatedBackground>
)

export default HomePage;