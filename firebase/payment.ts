import firebase from './firebaseInit';

export type SuccessfulPaymentType = {
    uid: string,
    subscribedUntil: Date,
    paymentData: PaymentData,
    orderId: string
}

export type PaymentData = {
    createTime: string,
    orderId: string,
    payer: object,
    purchaseUnit: object,
    status: string,
    updateTime: string
}

export const handleSuccessfulPayment = async ({uid, orderId, subscribedUntil, paymentData} : SuccessfulPaymentType) => {
    console.log(uid, orderId, subscribedUntil, paymentData);
    try{
        const batch = firebase.firestore().batch();

        batch.set(
            firebase.firestore().collection('payments').doc(uid).collection('orders').doc(orderId),
            {
                ...paymentData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        batch.set(
            firebase.firestore().collection('experts').doc(uid),
            {
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                subscribedUntil 
            }
        )

        await batch.commit();

    }catch(ex){
        console.log('handleSuccessfulPayment', ex);
    }
}

export const handleFailedPayment = async ({uid, paymentData} : SuccessfulPaymentType) => {
    try{
        const batch = firebase.firestore().batch();

        batch.set(
            firebase.firestore().collection('payments').doc(uid).collection('errors').doc(),
            {
                ...paymentData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        await batch.commit();

    }catch(ex){

    }
}