import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import workoutReducer from './workout/workout.reducer';
import workoutsReducer from './workouts/workouts.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    workout: workoutReducer,
    workouts: workoutsReducer
});

export default rootReducer;