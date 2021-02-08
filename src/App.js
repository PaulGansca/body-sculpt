import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import UserPage from './pages/user-page/user-page';
import LoginPage from './pages/login-page/login-page';
import SignUpPage from './pages/signup-page/signup-page';
import HomePageContainer from './pages/homepage/homepage.container';

import "antd/dist/antd.css";
import './App.css';

const App = ({ currentUser }) => {
  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/" render={() => currentUser ? <Redirect to='/user/profile' /> : <HomePageContainer />} />
        <Route exact={true} path="/login" render={() => currentUser ? <Redirect to='/user/profile' /> : <LoginPage />} />
        <Route exact={true} path="/signup" render={() => currentUser ? <Redirect to='/user/profile' /> : <SignUpPage />} />
        <Route path="/user" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
