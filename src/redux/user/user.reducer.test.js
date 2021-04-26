import reducer from './user.reducer';
import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: "",
    isLoading: true,
    error: "",
    isSplitLoading: false
}

describe('user reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE)
    })
  
    it('should handle SET_CURRENT_USER', () => {
      expect(
        reducer({currentUser: ""}, {
          type: UserActionTypes.SET_CURRENT_USER,
          payload: "paul"
        })
      ).toEqual(
        {
            isLoading: false,
            currentUser: "paul",
        }
      )
    });

    it('should handle SET_USER_GOALS_START', () => {
        expect(
          reducer({isLoading: false}, {
            type: UserActionTypes.SET_USER_GOALS_START,
          })
        ).toEqual(
          {
              isLoading: true,
          }
        )
    });

    it('should handle SET_USER_GOALS_SUCCESS', () => {
        expect(
          reducer({isLoading: true}, {
            type: UserActionTypes.SET_USER_GOALS_SUCCESS,
            payload: {displayName: "paul", id: "123"}
          })
        ).toEqual(
          {
              isLoading: false,
              currentUser: {displayName: "paul", id: "123"},
          }
        )
    });

    it('should handle SET_USER_GOALS_FAIL', () => {
        expect(
          reducer({isLoading: true}, {
            type: UserActionTypes.SET_USER_GOALS_FAIL,
            payload: "ERROR"
          })
        ).toEqual(
          {
              isLoading: false,
              error: "ERROR",
          }
        )
    });

    it('should handle SET_PROFILE_SETTINGS_START', () => {
        expect(
          reducer({isSplitLoading: false}, {
            type: UserActionTypes.SET_PROFILE_SETTINGS_START,
          })
        ).toEqual(
          {
              isSplitLoading: true,
          }
        )
    });

    it('should handle SET_PROFILE_SETTINGS_SUCCESS', () => {
        expect(
          reducer({isSplitLoading: true}, {
            type: UserActionTypes.SET_PROFILE_SETTINGS_SUCCESS,
            payload: {displayName: "paul", id: "123"}
          })
        ).toEqual(
          {
              isSplitLoading: false,
              currentUser: {displayName: "paul", id: "123"},
          }
        )
    });

    it('should handle SET_PROFILE_SETTINGS_FAIL', () => {
        expect(
          reducer({isSplitLoading: true}, {
            type: UserActionTypes.SET_PROFILE_SETTINGS_FAIL,
            payload: "ERROR"
          })
        ).toEqual(
          {
              isSplitLoading: false,
              error: "ERROR",
          }
        )
    });
})