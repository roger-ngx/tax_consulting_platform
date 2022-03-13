import firebase from './firebaseInit';
import { random } from 'lodash';

const createCode = () => {
    const value = random(999999);

    return ('00000' + value).slice(-6); 
}

type CreateVerificationRequest = {
    uid: string,
    phoneNumber: string
}

export const createVerificationCode = async({uid, phoneNumber} : CreateVerificationRequest) => {
    try{
        const code = createCode();

        const doc = await firebase.firestore().collection('verificationCodes').add({
            uid,
            phoneNumber,
            code,
            available: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        return doc.id;
    }catch(ex){
        console.log('createVerificationCode', ex);
    }
    return null;
}

type VerificationRequest = {
    verificationId: string,
    verificationCode: string
}

export const verifyCode = async({verificationId, verificationCode} : VerificationRequest) => {
    try{
        const doc = await firebase.firestore().collection('verificationCodes').doc(verificationId).get();

        if(doc.exists){
            const data = doc.data()

            if(data){
                const { code, uid, phoneNumber } = data;
                
                if(code === verificationCode){
                    await updatePhonenumber(uid, phoneNumber);
                    return true;
                }
            }
        }
    }catch(ex){
        console.log('createVerificationCode', ex);
    }
    return false;
}

const updatePhonenumber = async (uid: string, phoneNumber: string) => {
    try{
        const batch = firebase.firestore().batch();

        batch.update(
            firebase.firestore().collection('users').doc(uid),
            {
                phoneNumber,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                phoneNumberVerified: true
            }
        )

        batch.set(
            firebase.firestore().collection('experts').doc(uid),
            {
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                active: false,
                withdrewAt: null,
                phoneNumber,
                phoneNumberVerified: true
            }
        )

        await batch.commit();
    }catch(ex){

    }
}