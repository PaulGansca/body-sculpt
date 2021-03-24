import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setUserGoals } from '../../redux/user/user.actions';
import { selectCurrentUser, selectIsLoading } from '../../redux/user/user.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner';
import ProfileSetupPage from './profile-setup-page';

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    loading: selectIsLoading
})

const mapDispatchToProps = (dispatch) => ({
    setUserGoals: (userId, goalsData, history) => dispatch(setUserGoals(userId, goalsData, history))
})

const ProfileSetupPageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithSpinner
)(ProfileSetupPage);

export default ProfileSetupPageContainer;
