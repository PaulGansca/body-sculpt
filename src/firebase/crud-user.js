import { firestore } from './firebase.utils';
import moment from 'moment';

//check if email is already in use in app
//prevents sign-up form submission if in use
export const checkEmailExists = async(email) => {
    const usersRef = firestore.collection(`users`);
    const user = await usersRef.where('email', '==', email).get();

    if(!user.empty) {
        return true;
    } else return false;
}

// search for user in DB
// if user doesn't exist create new record
export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const user = await userRef.get();

    if(!user.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                goalSet: false,
                currentWorkout: {exercises: []},
                ...additionalData
            });
        } catch (err) {
            console.log(err);
        }
    }

    return userRef;
}


//set user goals
export const setUserGoals = async(userId, userData) => {
    if (!userId) return;

    const userRef = firestore.doc(`users/${userId}`)

    return userRef.update({
        goalSet: true,
        ...userData
    });
}

//update current workout
export const updateCurrentWorkout = async(userId, currentWorkout) => {
    if (!userId) return;

    const userRef = firestore.doc(`users/${userId}`)

    return userRef.update({
        currentWorkout
    });
}

//update completed workout
export const updateCompledWorkout = async(workoutId, completedWorkout) => {
    if (!workoutId) return;

    const workoutRef = firestore.doc(`workouts/${workoutId}`)

    return workoutRef.update({
        ...completedWorkout
    });
}

//complete workout
export const completeWorkout = async(userId, workout) => {
    if (!userId) return;

    const workoutsRef = firestore.collection(`workouts`);
    const userRef = firestore.doc(`users/${userId}`);

    return Promise.all([workoutsRef.add(workout),
    userRef.update({currentWorkout: {exercises: []}})]);
}

export const getUserWorkouts = (userId) => {
    const workoutsRef = firestore.collection(`workouts`);
    const workouts = workoutsRef.where('userId', '==', userId).get();

    return workouts;
}

export const getWorkout = async (userId, workoutId) => {
    const workoutRef = firestore.doc(`workouts/${workoutId}`);
    const workout = await workoutRef.get();
    if(workout.data().userId === userId) {
        return workout;
    } else return "Permission Denied"
}

export const deleteWorkout = async (userId, workoutId) => {
    const workoutRef = firestore.doc(`workouts/${workoutId}`);
    const workout = await workoutRef.get();
    if(workout.data().userId === userId) {
        return workoutRef.delete();
    } else return "Permission Denied";
}

//get recent workouts
export const getUserRecentWorkouts = (userId, amount, units) => {
    const workoutsRef = firestore.collection(`workouts`);
    const workouts = workoutsRef.where('userId', '==', userId).where("date", ">", moment().subtract(amount, units).format("YYYY-MM-DD")).get();
    return workouts;
}