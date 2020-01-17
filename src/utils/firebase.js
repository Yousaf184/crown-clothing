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

export const firestore = firebase.firestore();
export const firebaseAuth = firebase.auth();

export function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithRedirect(provider);
}

export function signInWithEmail(email, password) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
}

export function signupWithEmailAndPassword(email, password) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
}

export async function createUserDocument(user) {
    try {
        const userDocRef = firestore.collection('users').doc(user.id);
        const snapshot = await userDocRef.get();

        if (!snapshot.exists) {
            await userDocRef.set(user);
        }
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchUser(userId) {
    try {
        const userDocRef = firestore.collection('users').doc(userId);
        const snapshot = await userDocRef.get();

        if (snapshot.exists) {
            return snapshot.data();
        } else {
            /**
             * when a user creates an account using email/password, fetchUser
             * function will be called immediately after user is logged in.
             * there may be a case where user info hasn't been saved in database
             * yet, so in this case, wait for 1 second and then read the newly
             * created user's info and resolve the promise
             */
            return new Promise((resolve, reject) => {
                setTimeout(async () => {
                    const snapshot = await userDocRef.get();
                    resolve(snapshot.data());
                }, 1000);
            });
        }

    } catch (error) {
        console.log(error.message);
    }
}
