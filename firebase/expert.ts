import { merge, map } from 'lodash';
import { uuid } from 'uuidv4';

import firebase from '../firebase/firebaseInit';
import ExpertProfile from '../models/ExpertProfile';
import ExpertService from '../models/ExpertService';
import Price, { ExpertPriceType } from '../models/Price';


export type ExpertType = {
    id: string,
    profile: ExpertProfile,
    service: ExpertService,
    price: ExpertPriceType
}

export const getExpertById = async (uid: string) => {
    const expertDoc = await firebase.firestore().collection('experts').doc(uid).get();
    if(expertDoc.exists){
        return expertDoc.data();
    }

    return null;
}

/* 
* enroll expert
* use the same id
* copy all data from an users doc to an experts doc
*/
export const addExpert = async (expert: ExpertType) => {
    try{
        const photoDataUrl = expert.profile.photo;
        let profilePhotoURL = null;
    
        if(photoDataUrl){
            const snapshot = await firebase.storage().ref()
                .child(`profiles/${expert.id}.png`)
                .putString(photoDataUrl, 'data_url');
            profilePhotoURL = await snapshot.ref.getDownloadURL();
        }
    
        const servicePhotos: any = expert.service.photos;
        let servicePhotoURLs = [];
    
        if(servicePhotos){
            const promises: any = map(servicePhotos, async (photo:string) => {
                    const snapshot = await firebase.storage().ref()
                    .child(`services/${expert.id}/${uuid()}.png`)
                    .putString(photo, 'data_url');
                    return await snapshot.ref.getDownloadURL();
                }
            )
            servicePhotoURLs.push(...(await Promise.all(promises)));
        }
    
        const userDoc = await firebase.firestore().collection('users').doc(expert.id).get();
    
        const data = merge(
            JSON.parse(JSON.stringify(expert)),
            {
                profile: {
                    photo: profilePhotoURL
                },
                service: {
                    photos: servicePhotoURLs
                }
            },
            userDoc.data()
        )

        const batch = firebase.firestore().batch();
    
        batch.set(
            firebase.firestore().collection('experts').doc(expert.id),
            {
                ...data,
                active: true,
                withdrewAt: null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        );
        batch.update(
            firebase.firestore().collection('users').doc(expert.id),
            {
                enrollExpert: true,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        await batch.commit();

        return true;
    }catch(ex){
        console.log('addExpert', ex);
    }
    return false;
}

export const withDraw = async (expertId: string) => {
    await firebase.firestore().collection('experts')
    .doc(expertId)
    .update({
        active: false,
        withdrewAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

export const updateExpert = async (uid: string, data: object) => {
    await firebase.firestore().collection('experts')
    .doc(uid)
    .update({
        ...data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

export const getAllExperts = async () => {
    const expertDocs = await firebase.firestore().collection('experts').get();

    const experts = map(expertDocs, (doc:any) => doc.data());

    return experts;
}

export const getExpertReservations = async (expertId: string) => {
    try{
        const query = await firebase.firestore().collection('experts').doc(expertId).collection('reservations').get();

        return map(query.docs, doc => doc.data());
    }catch(ex){
        console.log('getExpertReservations', ex);
    }
}