import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  GOOGLE_LOGIN_START,
  EMAIL_PASSWORD_LOGIN_START,
  SIGN_OUT,
  CHECK_USER_SESSION,
  SIGN_UP_START
} from "../redux/actions/actionTypes";
import {
  loginSuccess,
  loginError,
  userSignoutSuccess,
  signUpError
} from "../redux/actions/user";

import {
  signInWithGoogle,
  firebaseAuth,
  saveUserIfNotExists,
  signInWithEmailPassword,
  isUserIsAuthenticated,
  getUserByID,
  signupWithEmailAndPassword,
  saveNewUser
} from "../utils/firebase";

function* loginWithGoogle() {
  yield signInWithGoogle();
}

function* loginWithEmailPassword(actionObj) {
  const { email, password } = actionObj.payload;

  try {
    const result = yield signInWithEmailPassword(email, password);
    const user = yield getUserByID(result.user.uid);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginError(error.message));
  }
}

function* signOut() {
  yield firebaseAuth.signOut();
  yield put(userSignoutSuccess());
}

function* isUserLoggedIn() {
  try {
    const authUser = yield isUserIsAuthenticated();

    if (!authUser) return;

    let user;

    // if 'autUser' contains a property named 'displayname'
    // then this means that user was redirected tpo the app after google login
    // So save the user in firesotre if it doesn't already exists in the database
    if (authUser.displayName) {
      const { uid, displayName, email } = authUser;
      user = { id: uid, name: displayName, email };

      yield saveUserIfNotExists(user);
    } else {
      user = yield getUserByID(authUser.uid);
    }

    yield put(loginSuccess(user));
  } catch (error) {
    console.log(error.message);
  }
}

function* userSignUp(actionObj) {
  const { name, email, password } = actionObj.payload;

  try {
    const result = yield signupWithEmailAndPassword(email, password);
    const userId = result.user.uid;

    yield saveNewUser({ id: userId, name, email });
    yield put(loginSuccess({ id: userId, name, email }));
  } catch (error) {
    yield put(signUpError(error.message));
  }
}

function* watchGoogleLoginStart() {
  yield takeLatest(GOOGLE_LOGIN_START, loginWithGoogle);
}

function* watchLoginWithEmailPassStart() {
  yield takeLatest(EMAIL_PASSWORD_LOGIN_START, loginWithEmailPassword);
}

function* watchUserSignOut() {
  yield takeLatest(SIGN_OUT, signOut);
}

function* watchCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, isUserLoggedIn);
}

function* watchUserSignUpStart() {
  yield takeLatest(SIGN_UP_START, userSignUp);
}

function* userSagas() {
  yield all([
    call(watchGoogleLoginStart),
    call(watchLoginWithEmailPassStart),
    call(watchUserSignOut),
    call(watchCheckUserSession),
    call(watchUserSignUpStart)
  ]);
}

export default userSagas;
