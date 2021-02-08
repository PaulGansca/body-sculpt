import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDEm02SVxBhYLB3-8ituaNPZtNObjR8eBE",
    authDomain: "body-sculpt-5ab47.firebaseapp.com",
    projectId: "body-sculpt-5ab47",
    storageBucket: "body-sculpt-5ab47.appspot.com",
    messagingSenderId: "717646268019",
    appId: "1:717646268019:web:7b8084909e590e6b8c0c06",
    measurementId: "G-JN2LX5QRQT"
}

firebase.initializeApp(config);

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
                ...additionalData
            });
        } catch (err) {
            console.log(err);
        }
    }

    return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;