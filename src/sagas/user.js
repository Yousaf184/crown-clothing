import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  GOOGLE_LOGIN_START,
  GOOGLE_LOGIN_REDIRECT_RESULT,
  EMAIL_PASSWORD_LOGIN_START,
  SIGN_OUT,
  CHECK_USER_SESSION
} from "../redux/actions/actionTypes";
import {
  loginSuccess,
  loginError,
  userSignoutSuccess
} from "../redux/actions/user";

import {
  signInWithGoogle,
  firebaseAuth,
  saveUserIfNotExists,
  signInWithEmailPassword,
  isUserIsAuthenticated,
  getUserByID
} from "../utils/firebase";

function* loginWithGoogle() {
  yield signInWithGoogle();
}

function* onGoogleRedirectResult() {
  try {
    const result = yield firebaseAuth.getRedirectResult();

    if (!result.user) {
      return;
    }

    const { uid, displayName, email } = result.user;
    const user = { id: uid, name: displayName, email };

    yield saveUserIfNotExists(user);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginError(error.message));
  }
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

    const user = yield getUserByID(authUser.uid);
    yield put(loginSuccess(user));
  } catch (error) {
    console.log(error.message);
  }
}

function* watchGoogleLoginStart() {
  yield takeLatest(GOOGLE_LOGIN_START, loginWithGoogle);
}

function* watchCheckGoogleRedirectResult() {
  yield takeLatest(GOOGLE_LOGIN_REDIRECT_RESULT, onGoogleRedirectResult);
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

function* userSagas() {
  yield all([
    call(watchGoogleLoginStart),
    call(watchCheckGoogleRedirectResult),
    call(watchLoginWithEmailPassStart),
    call(watchUserSignOut),
    call(watchCheckUserSession)
  ]);
}

export default userSagas;
