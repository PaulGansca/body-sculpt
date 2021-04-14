import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import workoutReducer from './workout/workout.reducer';
import workoutsReducer from './workouts/workouts.reducer';
import leaderboardReducer from './leaderboard/leaderboard.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    workout: workoutReducer,
    workouts: workoutsReducer,
    leaderboard: leaderboardReducer
});

export default rootReducer;