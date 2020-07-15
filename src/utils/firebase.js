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
  let userDocRef = firestore.collection("users").doc(user.id);

  try {
    const snapshot = await userDocRef.get();

    // user object will have only id property when this function
    // is called from 'App' component from inside of 'onAuthStateChanged'
    // function. In this case, don't save the user and just return the
    // document reference object so that 'onSnapshot' function can be called
    // on the returned document reference object
    if (!snapshot.exists && user.email) {
      await userDocRef.set(user);
    }
  } catch (error) {
    throw error;
  }

  return userDocRef;
}

/* called when user signs up using email-password
 *
 * as saveUserIfNotExists function saves the user in the
 * database, this function just calls that function
 */
export async function saveNewUser(newUser) {
  try {
    await saveUserIfNotExists(newUser);
  } catch (error) {
    throw error;
  }
}

export async function getUserByID(userID) {
  try {
    const userDocRef = firestore.collection("users").doc(userID);
    const snapshot = await userDocRef.get();

    if (snapshot.exists) {
      return snapshot.data();
    } else {
      throw new Error(`User with the id: (${userID}) doesn't exists`);
    }
  } catch (error) {
    throw error;
  }
}
