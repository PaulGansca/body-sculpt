import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProfileSetupPageContainer from '../profile-setup-page/profile-setup-page.container';
import WorkoutPageContainer from '../workout-page/workout-page.container';
import WorkoutsLoggedPageContainer from '../workouts-logged-page/workouts-logged-page.container';
import ProfilePageContainer from '../profile-page/profile-page-container';
import LeaderboardPageContainer from '../leaderboard-page/leaderboard-page-container';
import NavBar from '../../components/nav-bar/nav-bar';

const User = ({match, location}) => {
    return (
        <>
          {location.pathname !== "/user/profile-setup"  && !location.pathname.includes("/exercise/") ? <NavBar /> : <></>}
          <Switch>
            <Route exact={true} path={`${match.path}/profile-setup`} component={ProfileSetupPageContainer} />
            <Route path={`${match.path}/workout/:workoutId`} component={WorkoutPageContainer} />
            <Route exact={true} path={`${match.path}/workouts-logged`} component={WorkoutsLoggedPageContainer} />
            <Route exact={true} path={`${match.path}/profile`} component={ProfilePageContainer} />
            <Route exact={true} path={`${match.path}/leaderboard`} component={LeaderboardPageContainer} />
          </Switch>
        </>
    );
};

export default User;