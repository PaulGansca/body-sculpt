import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchUserEntries } from '../../redux/leaderboard/leaderboard.actions';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { selectUsers, selectIsLoading } from '../../redux/leaderboard/leaderboard.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner';
import LeaderboardPage from './leaderboard-page';

const leaderboardEffects = (WrappedComponent) => ({fetchUserEntries, ...otherProps}) => {
    useEffect(() => {
        fetchUserEntries()
        // eslint-disable-next-line
    }, []);
    return (
        <WrappedComponent {...otherProps} />       
    )
}


const mapStateToProps = createStructuredSelector({
    userId: selectCurrentUserId,
    loading: selectIsLoading,
    users: selectUsers,
})

const mapDispatchToProps = (dispatch) => ({
    fetchUserEntries: () => dispatch(fetchUserEntries(dispatch))
})

const LeaderboardPageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    leaderboardEffects,
    WithSpinner
)(LeaderboardPage);

export default LeaderboardPageContainer;
