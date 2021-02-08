import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import App from './App';

const userSubscription = (WrappedComponent) => ({setCurrentUser, ...otherProps}) => {
    useEffect(() => {
        const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if(userAuth) {
              const userRef = createUserProfileDocument(userAuth);
      
              (await userRef).onSnapshot(snapShot => {
                setCurrentUser({
                  id: snapShot.id,
                  ...snapShot.data()
                })
              })
            } else {
              setCurrentUser(userAuth)
            }
          })
    
        return () => {
            unsubscribeFromAuth();
        };
    }, [setCurrentUser]);

    return <WrappedComponent {...otherProps} />
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

const AppContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    userSubscription
)(App);

export default AppContainer;
