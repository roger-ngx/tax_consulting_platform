import * as firebase from 'firebase/app'
import 'firebase/firestore' // <- needed if using firestore
import 'firebase/functions' // <- needed if using httpsCallable

const firebaseConfig = {
  apiKey: "AIzaSyD18wnxIwXNFYqS7kvVyOpjJqaQ3UdqsaU",
  authDomain: "taxfun-9443f.firebaseapp.com",
  projectId: "taxfun-9443f",
  storageBucket: "taxfun-9443f.appspot.com",
  messagingSenderId: "508623094133",
  appId: "1:508623094133:web:eb77ff096ac4156d34533c",
  measurementId: "G-TBXJZ7LTBK"
};


if (!firebase.apps.length) {
  // Initialize firebase instance
  firebase.initializeApp(firebaseConfig)

  // Initialize other services on firebase instance
  firebase.firestore() // <- needed if using firestore
  firebase.functions() // <- needed if using httpsCallable
}else {
  firebase.app(); // if already initialized, use that one
}
export default firebase;
