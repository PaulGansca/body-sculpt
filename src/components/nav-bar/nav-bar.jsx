import React from 'react';
import { HistoryOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/bicep.svg';
import { ReactComponent as Dumbbell } from '../../assets/dumbbell.svg';

import NavBarMobile from './nav-bar-mobile';
import {auth} from '../../firebase/firebase.utils';
import './nav-bar.css';

const NavBar = (props) => {
    return (
        window.innerWidth > 500 ? 
        <ul className="desktop-nav">
            <li className="desktop-nav-link"><NavLink activeClassName="selected" to="/user/workout/new">Workout <Dumbbell className="dumbbell" /></NavLink></li>
            <li className="desktop-nav-link"><NavLink activeClassName="selected" to="/user/workouts-logged">Log <HistoryOutlined /></NavLink></li>
            <li className="desktop-nav-link"><NavLink activeClassName="selected" to="/user/profile">Profile <UserOutlined /></NavLink></li>
            <li className="desktop-nav-link"><NavLink to="/" onClick={() => auth.signOut()}>Sign out</NavLink></li>
            <li className="desktop-nav-link"><NavLink to="/"><Logo /></NavLink></li>
        </ul> : 
        <NavBarMobile />
    );
};

export default NavBar;