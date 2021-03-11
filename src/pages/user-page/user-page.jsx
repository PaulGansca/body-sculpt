import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProfileSetupPageContainer from '../profile-setup-page/profile-setup-page.container';
import WorkoutPageContainer from '../workout-page/workout-page.container';


const User = ({match}) => {
    return (
        <Switch>
          <Route exact={true} path={`${match.path}/profile-setup`} component={ProfileSetupPageContainer} />
          <Route path={`${match.path}/workout/:workoutId`} component={WorkoutPageContainer} />
          <Route exact={true} path={`${match.path}/workouts-logged/`} component={() => <h1>Workout Logs Page</h1>} />
          <Route exact={true} path={`${match.path}/profile`} component={() => <h1>Profile Page</h1>} />
        </Switch>
    );
};

export default User;