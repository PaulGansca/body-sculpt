import React from 'react';
import { connect } from 'react-redux';
import { HistoryOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { ReactComponent as Logo } from '../../assets/bicep.svg';
import { ReactComponent as Dumbbell } from '../../assets/dumbbell.svg';
import { fetchWorkoutsWithExercises } from '../../redux/workouts/workouts.actions';
import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import NavBarMobile from './nav-bar-mobile';
import {auth} from '../../firebase/firebase.utils';
import './nav-bar.css';

const NavBar = ({currentUserId, fetchWorkoutsWithExercises, history, setCurrentUser}) => {
    const handleMountProfile = () => fetchWorkoutsWithExercises(currentUserId);
    return (
        window.innerWidth > 500 ? 
        <ul className="desktop-nav">
            <li className="desktop-nav-link"><NavLink activeClassName="selected" to="/user/workout/new">Workout <Dumbbell className="dumbbell" /></NavLink></li>
            <li className="desktop-nav-link"><NavLink activeClassName="selected" to="/user/workouts-logged">Log <HistoryOutlined /></NavLink></li>
            <li className="desktop-nav-link"><NavLink activeClassName="selected" onClick={() => handleMountProfile()} to="/user/profile">Profile <UserOutlined /></NavLink></li>
            <li className="desktop-nav-link"><Link to="/" onClick={() => {setCurrentUser(""); auth.signOut()}}>Sign out</Link></li>
            <li className="desktop-nav-link"><Logo style={{position: "relative", top: 2}} /></li>
        </ul> : 
        <NavBarMobile setCurrentUser={setCurrentUser} handleMountProfile={handleMountProfile} />
    );
};

const mapStateToProps = createStructuredSelector({
    currentUserId: selectCurrentUserId
})

const mapDispatchToProps = dispatch => ({
    fetchWorkoutsWithExercises: (userId) => dispatch(fetchWorkoutsWithExercises(userId, dispatch)),
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

const NavBarContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(NavBar);

export default NavBarContainer;