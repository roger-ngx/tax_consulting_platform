import { Dispatch } from '@reduxjs/toolkit';
import firebase from '../firebase/firebaseInit';
import { setUserCredential } from '../stores/userInfoSlide';

export const loginWithGoogle = ({dispatch} : {dispatch: Dispatch}) => {

    try{
        const provider = new firebase.auth.GoogleAuthProvider();
    
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
    
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = credential.accessToken;
            // The signed-in user info.
            // var user = result.user;
            // console.log(user);
            dispatch(setUserCredential(credential));
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error);
        });
    }catch(ex){
        console.log('login', ex);
    }

}