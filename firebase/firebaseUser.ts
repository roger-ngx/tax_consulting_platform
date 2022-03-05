import firebase from '../firebase/firebaseInit';
import { map } from 'lodash';

export const getUserById = async (uid: string) => {
    const userDoc = await firebase.firestore().collection('users').doc(uid).get();
    if(userDoc.exists){
        return userDoc.data();
    }

    return null;
}

export const likeExpert = async (uid: string, expertId: string) => {
    try{

        const batch = firebase.firestore().batch();

        batch.update(
            firebase.firestore().collection('users').doc(uid),
            {
                favoriteExperts: firebase.firestore.FieldValue.arrayUnion(expertId),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        );

        batch.set(
            firebase.firestore().collection('users').doc(uid)
            .collection('likes').doc(expertId),
            {
                expertId,
                active: true,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        );

        await batch.commit();

        return true;
    }catch(ex){
        console.log('likeExpert', ex);
    }

    return false;
}

export const dislikeExpert = async (uid: string, expertId: string) => {
    try{
        const batch = firebase.firestore().batch();

        batch.update(
            firebase.firestore().collection('users').doc(uid),
            {
                favoriteExperts: firebase.firestore.FieldValue.arrayRemove(expertId),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        );

        batch.update(
            firebase.firestore().collection('users').doc(uid)
            .collection('likes').doc(expertId),
            {
                active: false,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        );

        await batch.commit();

        return true;
    }catch(ex){
        console.log('dislikeExpert', ex);
    }

    return false;
}

export const getFavoriteExperts = async (uid: string) => {
    try{
        const query = await firebase.firestore().collection('users').doc(uid)
        .collection('likes').where('active', '==', true)
        .orderBy('createdAt', 'desc').get();

        const ids = map(query.docs, doc => doc.id);

        const promises = map(ids, expertId => firebase.firestore().collection('experts').doc(expertId).get());

        return await Promise.all(promises);
    }catch(ex){
        console.log('likeExpert', ex);
    }

    return null;
}

type UpdatedUserInfo = {
    displayName: string,
    photoURL: string,
    phoneNumber: string
}

export const updateUser = async (uid: string, data: UpdatedUserInfo) => {
    try{
        const { photoURL } = data;

        let profilePhotoURL = photoURL;

        if(photoURL && !photoURL.startsWith('https')){
            const snapshot = await firebase.storage().ref()
                .child(`profiles/${uid}.png`)
                .putString(photoURL, 'data_url');
            profilePhotoURL = await snapshot.ref.getDownloadURL();
        }

        await firebase.firestore().collection('users')
        .doc(uid).update({...data,photoURL: profilePhotoURL});
        return true;
    }catch(ex){
        console.log('updateUser', ex);
    }
    return false;
}