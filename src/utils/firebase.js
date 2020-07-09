import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Firebase configuration
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

// create user document if it doesn't already exists in the database
export async function saveUserIfNotExists(user) {
  try {
    const userDocRef = firestore.collection("users").doc(user.id);
    const snapshot = await userDocRef.get();

    if (!snapshot.exists) {
      await userDocRef.set(user);
    }
  } catch (error) {
    console.log(error.message);
  }
}
