import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProfileSetupPageContainer from '../profile-setup-page/profile-setup-page-container';


const User = ({match}) => {
    return (
        <Switch>
          <Route exact={true} path={`${match.path}/profile-setup`} component={ProfileSetupPageContainer} />
          <Route exact={true} path={`${match.path}/workout/:id`} component={() => <h1>Workout In progress Page</h1>} />
          <Route exact={true} path={`${match.path}/workouts-logged/`} component={() => <h1>Workout Logs Page</h1>} />
          <Route exact={true} path={`${match.path}/profile`} component={() => <h1>Profile Page</h1>} />
        </Switch>
    );
};

export default User;