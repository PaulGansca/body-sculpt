import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import UserPage from './pages/user-page/user-page';
import LoginPage from './pages/login-page/login-page';
import PasswordReset from './pages/login-page/password-reset';
import SignUpPage from './pages/signup-page/signup-page';
import HomePageContainer from './pages/home-page/home-page.container';

import "antd/dist/antd.css";
import './App.css';

const App = ({ currentUser }) => {
  const redirectLink = currentUser && currentUser.goalSet ? '/user/profile' : '/user/profile-setup'
  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/" render={() => currentUser ? <Redirect to={`${redirectLink}`} /> : <HomePageContainer />} />
        <Route exact={true} path="/login" render={() => currentUser ? <Redirect to={`${redirectLink}`} /> : <LoginPage />} />
        <Route exact={true} path="/signup" render={() => currentUser ? <Redirect to={`${redirectLink}`} /> : <SignUpPage />} />
        <Route exact={true} path="/passwordreset" render={() => currentUser ? <Redirect to={`${redirectLink}`} /> : <PasswordReset />} />
        <Route path="/user" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
