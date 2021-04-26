
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from './workout.actions';
import { WorkoutActionTypes } from './workout.types';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

window.alert = jest.fn();
const history = {push: () => jest.fn()}

describe('Workout Actions', () => {
    afterEach(() => {
        fetchMock.restore()
    });

    it('should create action to start setting workout and success', () => {
        const expectedActions = [
            { type: WorkoutActionTypes.SET_WORKOUT_START },
            { type: WorkoutActionTypes.SET_WORKOUT_SUCCESS, payload: {exercises: [{id: 1, isFetched: true}]} }
        ]
        const store = mockStore({ isLoading: true })

        return store.dispatch(actions.setWorkout({exercises: [{id: 1, isFetched: true}]})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
          })
    });

    it('should create an action to start setting workout and handle wger fail', () => {
        const expectedActions = [
            { type: WorkoutActionTypes.SET_WORKOUT_START },
            { type: WorkoutActionTypes.SET_WORKOUT_FAIL, payload: "ERROR"}
        ]
        const store = mockStore({ err: "" })

        return store.dispatch(actions.setWorkout({exercises: [{id: 100000}]})).catch(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('should create an action to start setting workout and handle action fail', () => {
        const expectedActions = [
            { type: WorkoutActionTypes.SET_WORKOUT_START },
            { type: WorkoutActionTypes.SET_WORKOUT_FAIL,
                payload: TypeError("Cannot read property 'exercises' of undefined")}
        ]
        const store = mockStore({ err: "" })

        store.dispatch(actions.setWorkout())
        expect(store.getActions()).toEqual(expectedActions)
    });

    it('should create action to start saving existing workout and success', () => {
        const expectedActions = [
            { type: WorkoutActionTypes.SAVE_WORKOUT_START },
            { type: WorkoutActionTypes.SAVE_WORKOUT_SUCCESS }
        ]
        const store = mockStore({ isLoading: true })

        return store.dispatch(actions.saveWorkout({exercises: []}, "", "123")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
          })
    });

    it('should create action to start saving new workout and success', () => {
        const expectedActions = [
            { type: WorkoutActionTypes.SAVE_WORKOUT_START },
            { type: WorkoutActionTypes.SAVE_WORKOUT_SUCCESS }
        ]
        const store = mockStore({ isLoading: true })

        return store.dispatch(actions.saveWorkout({exercises: []}, "")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
          })
    });

    it('should create an action to start saving workout and handle fail', () => {
        const expectedActions = [
            { type: WorkoutActionTypes.SAVE_WORKOUT_START },
            { type: WorkoutActionTypes.SAVE_WORKOUT_FAIL, payload: "ERROR"}
        ]
        const store = mockStore({ err: "" })

        return store.dispatch(actions.saveWorkout(undefined, "")).catch(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('should create an action to move exercise', () => {
        const expectedAction = {
            type: WorkoutActionTypes.MOVE_EXERCISE,
            payload: ['b', 'a']
        };
        const dispatch = jest.fn();
        actions.moveExercise(0, 1, ['a', 'b'])(dispatch)
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('should create an action to update exercise workload', () => {
        const expectedAction = {
            type: WorkoutActionTypes.UPDATE_EXERCISE,
            payload: {id: 1, sets:[]}
        };
        const dispatch = jest.fn();
        actions.updateExerciseWorkload({id: 1, sets:[]})(dispatch)
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('should create an action to delete exercise', () => {
        const expectedAction = {
            type: WorkoutActionTypes.DELETE_EXERCISE,
            payload: 1
        };
        const dispatch = jest.fn();
        actions.deleteExercise(1)(dispatch)
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('should create an action to toggle workout state', () => {
        const expectedAction = {
            type: WorkoutActionTypes.TOGGLE_WORKOUT_STATE,
            payload: "in progress"
        };
        const dispatch = jest.fn();
        actions.toggleWorkoutState("in progress")(dispatch)
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('should create an action to update time elapsed', () => {
        const expectedAction = {
            type: WorkoutActionTypes.UPDATE_TIME_ELAPSED,
            payload: "01:33"
        };
        const dispatch = jest.fn();
        actions.updateTimeElapsed("01:33")(dispatch)
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('should create an action to log set', () => {
        const expectedAction = {
            type: WorkoutActionTypes.LOG_SET,
            payload: {id: 1, sets:[{reps: 10, weight: 5, db_id: 123}]}
        };
        const dispatch = jest.fn();
        actions.logSet({id: 1, sets:[{reps: 10, weight: 5, db_id: 123}]})(dispatch)
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('should create an action to log set with swap exercise', () => {
        const expectedAction = {
            type: WorkoutActionTypes.LOG_SET_WITH_SWAP,
            payload: ['b', 'a']
        };
        const dispatch = jest.fn();
        actions.logSetWithSwapExercise(['a', 'b'], 0, 1,)(dispatch)
        expect(dispatch).toBeCalledWith(expectedAction);
    });

    it('should create action to start complete workout and success', () => {
        const expectedActions = [
            { type: WorkoutActionTypes.COMPLETE_WORKOUT_START },
            { type: WorkoutActionTypes.COMPLETE_WORKOUT_SUCCESS}
        ]
        const store = mockStore({ isLoading: false })

        return store.dispatch(actions.completeWorkout({exercises: [{id: 1, isFetched: true}]},"",history)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
          })
    });

    it('should create an action to start complete workout and handle fail', () => {
        const expectedActions = [
            { type: WorkoutActionTypes.SET_WORKOUT_START },
            { type: WorkoutActionTypes.SET_WORKOUT_FAIL, payload: "ERROR"}
        ]
        const store = mockStore({ err: "" })

        return store.dispatch(actions.completeWorkout({exercises: [{id: 100000}]})).catch(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('should create an action to reset state', () => {
        const expectedAction = {
            type: WorkoutActionTypes.RESET_WORKOUT_STATE,
        };
        const dispatch = jest.fn();
        actions.resetState()(dispatch)
        expect(dispatch).toBeCalledWith(expectedAction);
    });
});