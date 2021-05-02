import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProfileSetupPageContainer from '../profile-setup-page/profile-setup-page.container';
import WorkoutPageContainer from '../workout-page/workout-page.container';
import WorkoutsLoggedPageContainer from '../workouts-logged-page/workouts-logged-page.container';
import ProfilePageContainer from '../profile-page/profile-page-container';
import LeaderboardPageContainer from '../leaderboard-page/leaderboard-page-container';
import NavBar from '../../components/nav-bar/nav-bar';

const User = ({match, location, currentUser}) => {
  const redirectLink = currentUser && !currentUser.goalSet ? '/user/profile-setup' : (!currentUser ? '/' : '');
  return (
        <>
          {location.pathname !== "/user/profile-setup"  && !location.pathname.includes("/exercise/") ? <NavBar /> : <></>}
          <Switch>
            <Route exact={true} path={`${match.path}/profile-setup`} render={(routerProps) => currentUser ?
                <ProfileSetupPageContainer {...routerProps} /> : <Redirect to={`${redirectLink}`} />} />
            <Route path={`${match.path}/workout/:workoutId`} render={(routerProps) => currentUser && currentUser.goalSet  ?
                <WorkoutPageContainer {...routerProps} /> : <Redirect to={`${redirectLink}`} />} />
            <Route exact={true} path={`${match.path}/workouts-logged`} render={(routerProps) => currentUser && currentUser.goalSet  ?
                <WorkoutsLoggedPageContainer {...routerProps} /> : <Redirect to={`${redirectLink}`} />} />
            <Route exact={true} path={`${match.path}/profile`} render={(routerProps) => currentUser && currentUser.goalSet  ?
                <ProfilePageContainer {...routerProps} /> : <Redirect to={`${redirectLink}`} />} />
            <Route exact={true} path={`${match.path}/leaderboard`} render={(routerProps) => currentUser && currentUser.goalSet  ?
                <LeaderboardPageContainer {...routerProps} /> : <Redirect to={`${redirectLink}`} />} />
          </Switch>
        </>
    );
};

export default User;