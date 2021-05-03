import React, { useState } from 'react';
import { MenuUnfoldOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/bicep.svg';
import { ReactComponent as Dumbbell } from '../../assets/dumbbell.svg';

import CustomDrawer from '../antd/custom-drawer/custom-drawer';
import {auth} from '../../firebase/firebase.utils';

const NavBarMobile = ({handleMountProfile, setCurrentUser, location}) => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
      };
      const onClose = () => {
        setVisible(false);
      };
    let currentPage = "";
    if(location.pathname === "/user/workout/new") currentPage = "Workout";
    if(location.pathname === "/user/workouts-logged") currentPage = "Log";
    if(location.pathname === "/user/profile") currentPage = "Profile";
    if(location.pathname === "/user/leaderboard") currentPage = "Leaderboard";

    return (
        <>
            <div style={{width: "100%", backgroundColor: "rgb(16, 61, 187)"}}>
                <MenuUnfoldOutlined style={{fontSize: 35, color: 'white', marginLeft: "4.5%", marginTop: 25}} onClick={showDrawer} />
                <span className="current-page">{currentPage}</span>
            </div>
            <CustomDrawer
                title=""
                drawerStyle={{backgroundColor: "rgb(16, 61, 187)"}}
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
            <ul className="mobile-nav">
                <li className="mobile-nav-link"><NavLink activeClassName="selected" onClick={() => onClose()} to="/user/workout/new">Workout <Dumbbell className="dumbbell" /></NavLink></li>
                <li className="mobile-nav-link"><NavLink activeClassName="selected" onClick={() => onClose()} to="/user/workouts-logged">Log <HistoryOutlined /></NavLink></li>
                <li className="mobile-nav-link"><NavLink activeClassName="selected" onClick={() => {handleMountProfile(); onClose()}} to="/user/profile">Profile <UserOutlined /></NavLink></li>
                <li className="mobile-nav-link"><Link to="/" onClick={() => {setCurrentUser(""); auth.signOut()}}>Sign out</Link></li>
                <li className="mobile-nav-link"><Logo /></li>
            </ul>
            </CustomDrawer>
        </>
    );
};

export default NavBarMobile;