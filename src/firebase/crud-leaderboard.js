import { firestore } from './firebase.utils';

// search for user in DB
// if user doesn't exist create new record
export const createLeaderboardEntry = async(userId, data) => {
    if (!userId) return;

    const userRef = firestore.doc(`leaderboard/${userId}`)

    const user = await userRef.get();
    // user doesn't exist, create first entry in leaderboards db
    if(!user.exists) {
        const {displayName, performance, exerciseId, weight, gender, fitnessLevel } = data;        
        try {
            userRef.set({
                displayName, weight, gender, fitnessLevel,
                records: {[exerciseId]: performance}
            });
        } catch (err) {
            console.log(err);
        }
    } else {
    // user exists, check if exercise entry present or better max
        const { records } = user.data();
        const { performance, exerciseId } = data;
        if(!records[exerciseId]) {
            records[exerciseId] = performance;
        } else if(records[exerciseId].max < performance.max) {
            records[exerciseId] = performance;
        }
        try {
            userRef.set({
                records: {...records}
            }, {merge: true});
        } catch (err) {
            console.log(err);
        }
    }
}


// retrieve all entries in leaderboard collection
export const getLeaderboard = () => {
    const leaderboardRef = firestore.collection(`leaderboard`).get();

    return leaderboardRef;
}