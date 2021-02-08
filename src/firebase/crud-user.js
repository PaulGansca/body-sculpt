import { firestore } from './firebase.utils';

//check if email is already in use in app
//prevents sign-up form submission if in use
export const checkEmailExists = async(email) => {
    const usersRef = firestore.collection(`users`);
    const user = await usersRef.where('email', '==', email).get();

    if(!user.empty) {
        return true;
    } else return false;
}