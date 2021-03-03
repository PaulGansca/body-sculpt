import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import workoutReducer from './workout/workout.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    workout: workoutReducer
});

export default rootReducer;