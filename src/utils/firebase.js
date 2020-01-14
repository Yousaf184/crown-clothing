import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDipg2tbk6oHBUl6Y8gGkRUP2dBH_m9m2Y",
    authDomain: "crown-clothing-1157e.firebaseapp.com",
    databaseURL: "https://crown-clothing-1157e.firebaseio.com",
    projectId: "crown-clothing-1157e",
    storageBucket: "crown-clothing-1157e.appspot.com",
    messagingSenderId: "735648603094",
    appId: "1:735648603094:web:176be7dad0b8440ef12277",
    measurementId: "G-SQG749CTV7"
};

firebase.initializeApp(firebaseConfig);

export function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}