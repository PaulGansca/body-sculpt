import React, { useState } from 'react';
import { MenuUnfoldOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/bicep.svg';
import { ReactComponent as Dumbbell } from '../../assets/dumbbell.svg';

import CustomDrawer from '../antd/custom-drawer/custom-drawer';
import {auth} from '../../firebase/firebase.utils';

const NavBarMobile = ({handleMountProfile}) => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
      };
      const onClose = () => {
        setVisible(false);
      };
    return (
        <>
            <div style={{width: "100%", backgroundColor: "rgb(16, 61, 187)"}}>
                <MenuUnfoldOutlined style={{fontSize: 35, color: 'white', marginLeft: "4.5%", marginTop: 25}} onClick={showDrawer} />
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
                <li className="mobile-nav-link"><NavLink activeClassName="selected" to="/user/workout/new">Workout <Dumbbell className="dumbbell" /></NavLink></li>
                <li className="mobile-nav-link"><NavLink activeClassName="selected" to="/user/workouts-logged">Log <HistoryOutlined /></NavLink></li>
                <li className="mobile-nav-link"><NavLink activeClassName="selected" onClick={() => handleMountProfile()} to="/user/profile">Profile <UserOutlined /></NavLink></li>
                <li className="mobile-nav-link"><NavLink to="/" onClick={() => auth.signOut()}>Sign out</NavLink></li>
                <li className="mobile-nav-link"><NavLink to="/"><Logo /></NavLink></li>
            </ul>
            </CustomDrawer>
        </>
    );
};

export default NavBarMobile;