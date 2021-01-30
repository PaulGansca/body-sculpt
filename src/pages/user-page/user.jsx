import React from 'react';
import { Route, Switch } from 'react-router-dom';


const User = ({match}) => {
    console.log(match)
    return (
      <div className="App">
        <Switch>
          <Route exact={true} path={`${match.path}/profile-setup`} component={() => <h1>Profile Setup Page</h1>} />
          <Route exact={true} path={`${match.path}/workout/:id`} component={() => <h1>Workout In progress Page</h1>} />
          <Route exact={true} path={`${match.path}/workouts-logged/`} component={() => <h1>Workout Logs Page</h1>} />
          <Route exact={true} path={`${match.path}/profile`} component={() => <h1>Profile Page</h1>} />
        </Switch>
      </div>
    );
};

export default User;