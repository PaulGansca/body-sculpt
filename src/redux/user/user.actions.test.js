
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from './user.actions';
import { UserActionTypes } from './user.types';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

window.alert = jest.fn();

describe('User Actions', () => {
    afterEach(() => {
        fetchMock.restore()
      })    
    it('should create an action to set current user', () => {
        const expectedAction = {
            type: UserActionTypes.SET_CURRENT_USER,
        }
        expect(actions.setCurrentUser()).toEqual(expectedAction);
    });

    it('should create action to start setting goals and success', () => {
        const history = {push: () => jest.fn()}
        const expectedActions = [
            { type: UserActionTypes.SET_USER_GOALS_START },
            { type: UserActionTypes.SET_USER_GOALS_SUCCESS, payload: {} }
        ]
        const store = mockStore({ goals: {} })

        return store.dispatch(actions.setUserGoals("", {}, history)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
          })
    });
    it('should create an action to start setting goals and handle fail', () => {
        const history = {push: () => jest.fn()}
        const expectedActions = [
            { type: UserActionTypes.SET_USER_GOALS_START },
            { type: UserActionTypes.SET_USER_GOALS_FAIL, payload: "ERROR"}
        ]
        const store = mockStore({ err: "" })
        return store.dispatch(actions.setUserGoals("doesn't exist", {}, history)).catch(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
          })
    });

    it('should create action to start setting profile info and success', () => {
        const expectedActions = [
            { type: UserActionTypes.SET_PROFILE_SETTINGS_START },
            { type: UserActionTypes.SET_PROFILE_SETTINGS_SUCCESS, payload: {} }
        ]
        const store = mockStore({ goals: {} })

        return store.dispatch(actions.setProfileSettings("", {})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
          })
    });
    it('should create an action to start setting profile info and handle fail', () => {
        const expectedActions = [
            { type: UserActionTypes.SET_PROFILE_SETTINGS_START },
            { type: UserActionTypes.SET_PROFILE_SETTINGS_FAIL, payload: "ERROR"}
        ]
        const store = mockStore({ err: "" })
        return store.dispatch(actions.setProfileSettings("doesn't exist", {})).catch(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
          })
    });
});