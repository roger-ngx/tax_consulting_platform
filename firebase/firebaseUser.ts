import firebase from '../firebase/firebaseInit';

export const getUserById = async (uid: string) => {
    const userDoc = await firebase.firestore().collection('users').doc(uid).get();
    if(userDoc.exists){
        return userDoc.data();
    }

    return null;
}