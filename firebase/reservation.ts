import firebase from '../firebase/firebaseInit';

type AddProps = {
    user: any,
    expertId: string,
    question: string|null,
    price: object,
    reservationTime: Date
}

export const completeResevation = async (props : AddProps) => {

    const { user, expertId, question, price, reservationTime } = props;

    console.log('user', user);

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
            user,
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

type UpdateProps = {
    status: string,
    expertId: string,
    uid: string,
    reservationId: string,
    reservationTime: Date
}

export const updateReservationStatus = async (props: UpdateProps) => {
    const {status, expertId, uid, reservationId, reservationTime} = props;

    try{
        await firebase.firestore().collection('reservations').doc(uid)
        .collection('items')
        .doc(reservationId)
        .update({
            status,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })

        await firebase.firestore().collection('experts').doc(expertId)
        .collection('reservations')
        .doc(reservationId)
        .update({
            status,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        })

        status==='CANCEL' && await firebase.firestore().collection('experts').doc(expertId).update({
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            reservedTimes: firebase.firestore.FieldValue.arrayRemove(reservationTime)
        })
    }catch(ex){
        console.log('completeResevation', ex);
    }
}