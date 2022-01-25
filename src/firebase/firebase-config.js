import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC7v-4pwCodF6XiWJRwjws1cWcYamVXats",
    authDomain: "saludarprueba-a9bda.firebaseapp.com",
    projectId: "saludarprueba-a9bda",
    storageBucket: "saludarprueba-a9bda.appspot.com",
    messagingSenderId: "601139261860",
    appId: "1:601139261860:web:c117830d011e7775259131"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
//const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    //googleAuthProvider,
    firebase
}