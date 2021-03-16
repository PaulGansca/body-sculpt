import _ from 'lodash';

// an array of the fields stored in the db for an exercise separate
// from what is retrieved from the api
// sets is an array of {reps, weight, id}
// id is the exercise id used by wger api vs db_id which is generated for the app
// rpe is used to measure exertion
export const exerciseFieldsStored = ["sets", "id", "db_id", "rpe" ];

// trim exercise fields to contain what's not in the wger api
// return new workout object with updated exercise array
export const createDbWorkout = (workout) => {
    const dbWorkout = JSON.parse(JSON.stringify(workout))
    dbWorkout.exercises = workout.exercises.map(e => {
        const existingFields = exerciseFieldsStored.filter(field => e[field]);
        return _.pick(e, existingFields);
    })
    return dbWorkout;
}