import reducer from './workout.reducer';
import { WorkoutActionTypes } from './workout.types';

const INITIAL_STATE = {
    exercises: [],
    date: Date.now(),
    isLoading: true,
    isExerciseLoading: false,
    err: "",
    id: "",
    timeElapsed: "0:0",
    workoutState: "not started",
}

describe('workout reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE)
    })

    it('should handle SET_WORKOUT_START', () => {
        expect(
          reducer({isLoading: false}, {
            type: WorkoutActionTypes.SET_WORKOUT_START,
          })
        ).toEqual(
          {
              isLoading: true,
          }
        )
    });

    it('should handle SET_WORKOUT_SUCCESS', () => {
        expect(
          reducer({isLoading: true}, {
            type: WorkoutActionTypes.SET_WORKOUT_SUCCESS,
            payload: {exercises: [1,2,3], id: "123"}
          })
        ).toEqual(
          {
              isLoading: false,
              exercises: [1,2,3],
              id: "123",
          }
        )
    });

    it('should handle SET_WORKOUT_FAIL', () => {
        expect(
          reducer({isLoading: true}, {
            type: WorkoutActionTypes.SET_WORKOUT_FAIL,
            payload: "ERROR"
          })
        ).toEqual(
          {
              isLoading: false,
              err: "ERROR",
          }
        )
    });

    it('should handle CREATE_CURRENT_WORKOUT_START', () => {
        expect(
          reducer({isLoading: false}, {
            type: WorkoutActionTypes.CREATE_CURRENT_WORKOUT_START,
          })
        ).toEqual(
          {
                isLoading: true,
          }
        )
    });

    it('should handle CREATE_CURRENT_WORKOUT_SUCCESS', () => {
        expect(
          reducer({isLoading: true}, {
            type: WorkoutActionTypes.CREATE_CURRENT_WORKOUT_SUCCESS,
            payload: {exercises: [1,2,3], id: ""}
          })
        ).toEqual(
          {
                isLoading: false,
                exercises: [1,2,3],
                id: "",
          }
        )
    });

    it('should handle CREATE_CURRENT_WORKOUT_FAIL', () => {
        expect(
          reducer({isLoading: true}, {
            type: WorkoutActionTypes.CREATE_CURRENT_WORKOUT_FAIL,
            payload: "ERROR"
          })
        ).toEqual(
          {
              isLoading: false,
              err: "ERROR",
          }
        )
    });

    it('should handle ADD_EXERCISE_START', () => {
        expect(
          reducer({isExerciseLoading: false}, {
            type: WorkoutActionTypes.ADD_EXERCISE_START,
          })
        ).toEqual(
          {
                isExerciseLoading: true,
          }
        )
    });

    it('should handle ADD_EXERCISE_SUCCESS', () => {
        expect(
          reducer({isExerciseLoading: true, exercises: [1,2]}, {
            type: WorkoutActionTypes.ADD_EXERCISE_SUCCESS,
            payload: 3
          })
        ).toEqual(
          {
                isExerciseLoading: false,
                exercises: [1,2,3],
          }
        )
    });

    it('should handle ADD_EXERCISE_FAIL', () => {
        expect(
          reducer({isExerciseLoading: true}, {
            type: WorkoutActionTypes.ADD_EXERCISE_FAIL,
            payload: "ERROR"
          })
        ).toEqual(
          {
              isExerciseLoading: false,
              err: "ERROR",
          }
        )
    });

    it('should handle DELETE_EXERCISE', () => {
        expect(
          reducer({exercises: [1,2,3]}, {
            type: WorkoutActionTypes.DELETE_EXERCISE,
            payload: 2
          })
        ).toEqual(
          {
                isLoading: false,
                exercises: [1,2]
          }
        )
    });

    it('should handle SWAP_EXERCISE_START', () => {
        expect(
          reducer({isExerciseLoading: false}, {
            type: WorkoutActionTypes.SWAP_EXERCISE_START,
          })
        ).toEqual(
          {
                isExerciseLoading: true,
          }
        )
    });

    it('should handle SWAP_EXERCISE_SUCCESS', () => {
        expect(
          reducer({isExerciseLoading: true, exercises: [{id:1},{id:2},{id:3}]}, {
            type: WorkoutActionTypes.SWAP_EXERCISE_SUCCESS,
            payload: {exerciseIdx: 2, exercise: {id:5}}
          })
        ).toEqual(
          {
                isExerciseLoading: false,
                exercises: [{id:1},{id:2},{id:5}],
          }
        )
    });

    it('should handle SWAP_EXERCISE_FAIL', () => {
        expect(
          reducer({isExerciseLoading: true}, {
            type: WorkoutActionTypes.SWAP_EXERCISE_FAIL,
            payload: "ERROR"
          })
        ).toEqual(
          {
              isExerciseLoading: false,
              err: "ERROR",
          }
        )
    });

    it('should handle MOVE_EXERCISE', () => {
        expect(
          reducer({exercises: [1,2,3]}, {
            type: WorkoutActionTypes.MOVE_EXERCISE,
            payload: [1,3,2]
          })
        ).toEqual(
          {
                exercises: [1,3,2]
          }
        )
    });

    it('should handle UPDATE_EXERCISE', () => {
        expect(
          reducer({exercises: [{id:1},{id:2},{id:3, db_id: 35}]}, {
            type: WorkoutActionTypes.UPDATE_EXERCISE,
            payload: {db_id: 35, id: 3, sets: [{reps: 10, weight: 50}]}
          })
        ).toEqual(
          {
                exercises: [{id:1},{id:2},{db_id: 35, id: 3, sets: [{reps: 10, weight: 50}]}]
          }
        )
    });

    it('should handle TOGGLE_WORKOUT_STATE', () => {
        expect(
          reducer({}, {
            type: WorkoutActionTypes.TOGGLE_WORKOUT_STATE,
            payload: "in progress"
          })
        ).toEqual(
          {
            workoutState: "in progress"
          }
        )
    });

    it('should handle UPDATE_TIME_ELAPSED', () => {
        expect(
          reducer({}, {
            type: WorkoutActionTypes.UPDATE_TIME_ELAPSED,
            payload: "01:35"
          })
        ).toEqual(
          {
            timeElapsed: "01:35"
          }
        )
    });

    it('should handle LOG_SET', () => {
        expect(
          reducer({exercises: [{id:1},{id:2},{id:3, db_id: 35}]}, {
            type: WorkoutActionTypes.LOG_SET,
            payload: {db_id: 35, id: 3, sets: [{reps: 10, weight: 50}]}
          })
        ).toEqual(
          {
            exercises: [{id:1},{id:2},{db_id: 35, id: 3, sets: [{reps: 10, weight: 50}]}]
          }
        )
    });

    it('should handle LOG_SET_WITH_SWAP', () => {
        expect(
          reducer({}, {
            type: WorkoutActionTypes.LOG_SET_WITH_SWAP,
            payload: [{id:1},{id:2},{id:3}]
          })
        ).toEqual(
          {
            exercises: [{id:1},{id:2},{id:3}]
          }
        )
    });

    it('should handle PERMISSION_DENIED', () => {
        expect(
          reducer({}, {
            type: WorkoutActionTypes.PERMISSION_DENIED,
            payload: "PERMISSION DENIED"
          })
        ).toEqual(
          {
            isLoading: false,
            err: "PERMISSION DENIED"
          }
        )
    });
})