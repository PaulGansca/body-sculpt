import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import HomePage from './homepage';

const CollectionOverviewContainer = compose(
    withRouter,
)(HomePage);

export default CollectionOverviewContainer;