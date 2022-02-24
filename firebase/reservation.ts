import firebase from '../firebase/firebaseInit';
import { pick } from 'lodash';

type AddProps = {
    user: any,
    expertId: string,
    question: string|null,
    price: object,
    reservationTime: Date
}

export const completeResevation = async (props : AddProps) => {

    const { user, expertId, question, price, reservationTime } = props;

    try{
        const reservationDoc = await firebase.firestore().collection('reservations').doc(user.uid)
        .collection('items')
        .add({
            expertId,
            question,
            reservationTime,
            price,
            status: 'REQUEST',
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        await firebase.firestore().collection('experts').doc(expertId)
        .collection('reservations')
        .doc(reservationDoc.id)
        .set({
            user: pick(user, ['displayName', 'email', 'phoneNumber', 'photoURL', 'uid']),
            question,
            reservationTime,
            price,
            status: 'REQUEST',
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        await firebase.firestore().collection('experts').doc(expertId).update({
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            reservedTimes: firebase.firestore.FieldValue.arrayUnion(reservationTime)
        })

        return true;
    }catch(ex){
        console.log('completeResevation', ex);
        return false;
    }
}

export type ReservationUpdateProps = {
    status: string,
    expertId: string,
    uid: string,
    reservationId: string,
    reservationTime?: Date,
    cancelReason?: string
}

export const updateReservationStatus = async (props: ReservationUpdateProps) => {
    const {status, expertId, uid, reservationId, reservationTime, cancelReason} = props;

    try{

        const batch = firebase.firestore().batch();

        batch.update(
            firebase.firestore().collection('reservations').doc(uid)
            .collection('items').doc(reservationId),
            {
                status,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                cancelReason
            }
        )

        batch.update(
            firebase.firestore().collection('experts').doc(expertId)
            .collection('reservations').doc(reservationId),
            {
                status,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                cancelReason
            }
        )

        if(status==='CANCEL'){
            batch.update(
                firebase.firestore().collection('experts').doc(expertId),
                {
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    reservedTimes: firebase.firestore.FieldValue.arrayRemove(reservationTime)
                }
            )
        }
        await batch.commit();
        return true;
    }catch(ex){
        console.log('completeResevation', ex);
    }
    return false;
}

export type ReservationAnswerUpdateProps = {
    expertId: string,
    uid: string,
    reservationId: string,
    answer: string
}

export const updateReservationAnswer = async (props: ReservationAnswerUpdateProps) => {
    const {expertId, uid, reservationId, answer} = props;

    console.log(expertId, uid, reservationId, answer);

    try{

        const batch = firebase.firestore().batch();

        batch.update(
            firebase.firestore().collection('reservations').doc(uid)
            .collection('items').doc(reservationId),
            {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                answer
            }
        )

        batch.update(
            firebase.firestore().collection('experts').doc(expertId)
            .collection('reservations').doc(reservationId),
            {
                answer,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            }
        )

        await batch.commit();
        return true;
    }catch(ex){
        console.log('completeResevation', ex);
    }
    return false;
}