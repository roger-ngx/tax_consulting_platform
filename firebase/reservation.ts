import firebase from '../firebase/firebaseInit';

type AddProps = {
    user: any,
    expertId: string,
    question?: string,
    price: object,
    reservationTime: Date
}

export const completeResevation = async (props : AddProps) => {

    const { user, expertId, question, price, reservationTime } = props;

    try{
        const reservationDoc = await firebase.firestore().collection('reservations').doc(user.id)
        .collection('items')
        .add({
            expertId,
            question,
            reservationTime,
            price,
            status: 'REQUESTED',
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        await firebase.firestore().collection('experts').doc(expertId)
        .collection('reservations')
        .doc(reservationDoc.id)
        .set({
            question,
            reservationTime,
            price,
            userId: user.id,
            status: 'REQUESTED',
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        await firebase.firestore().collection('experts').doc(expertId).update({
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            reservedTimes: firebase.firestore.FieldValue.arrayUnion(reservationTime)
        })
    }catch(ex){
        console.log('completeResevation', ex);
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