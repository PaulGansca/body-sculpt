import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import HomePage from './home-page';

const HomePageContainer = compose(
    withRouter,
)(HomePage);

export default HomePageContainer;