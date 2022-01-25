import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyASYZ_h9RqfUM1nwOne6MFrlp25eY0Rycw",
    authDomain: "react-cursos-1e1ff.firebaseapp.com",
    projectId: "react-cursos-1e1ff",
    storageBucket: "react-cursos-1e1ff.appspot.com",
    messagingSenderId: "892753209889",
    appId: "1:892753209889:web:01c455d41038b1b4a79160"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}