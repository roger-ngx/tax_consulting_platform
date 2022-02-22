import { Dispatch } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import firebase from './firebaseInit';
import { setUserCredential, setUserType } from '../stores/userInfoSlide';

export const loginWithGoogle = ({dispatch}) => {

    return new Promise((resolve, reject) => {

        try{
            const provider = new firebase.auth.GoogleAuthProvider();
        
            firebase.auth()
            .signInWithPopup(provider)
            .then(async (result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
        
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var {
                    displayName,
                    email,
                    emailVerified,
                    lastLoginAt,
                    phoneNumber,
                    photoURL,
                    uid
                } = result.user;
    
                if(uid){
                    resolve(uid);

                    const expertDoc = await firebase.firestore().collection('experts').doc(uid).get();
                    if(expertDoc.exists){
                        const expert = expertDoc.data();
                        if(expert.active){
                            await firebase.firestore().collection('experts').doc(uid).update({
                                lastLoginAt: dayjs(lastLoginAt).toDate(),
                                token,
                                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                            });
                            dispatch(setUserType('expert'));
                            return;
                        }
                    }

                    const userDoc = await firebase.firestore().collection('users').doc(uid).get();
                    if(userDoc.exists){
                        const user = userDoc.data();
                        if(user.active){
                            await firebase.firestore().collection('users').doc(uid).update({
                                lastLoginAt: dayjs(lastLoginAt).toDate(),
                                token,
                                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                            });
                        }else{
                            alert('user is not active or withdrew');
                            return;
                        }
                    }else{
                        await firebase.firestore().collection('users').doc(uid).set({
                            displayName,
                            email,
                            emailVerified,
                            lastLoginAt: dayjs(lastLoginAt).toDate(),
                            phoneNumber,
                            photoURL,
                            uid,
                            token,
                            active: true,
                            withdrewAt: null,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    }
                    // console.log(user);
                    dispatch(setUserType('user'));
                    dispatch(setUserCredential(credential));
                }else{
                    reject('uid is null');
                }
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log(error);
                reject(error);
            });
        }catch(ex){
            console.log('login', ex);
            reject(ex);
        }
    })
}

export const updateOnlineStatus = async (uid) => {

    try{
        await firebase.firestore().collection('users').doc(uid).update({
            lastAccessAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    }catch(ex){
        console.log('updateOnlineStatus', ex);
    }
}