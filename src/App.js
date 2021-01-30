import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import UserPage from './pages/user-page/user';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/" component={() => <h1>Home Page</h1>} />
        <Route exact={true} path="/login" component={() => <h1>Login Page</h1>} />
        <Route exact={true} path="/signup" component={() => <h1>SignUp Page</h1>} />
        <Route path="/user" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
