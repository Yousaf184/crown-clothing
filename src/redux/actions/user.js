import {
  GOOGLE_LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GOOGLE_LOGIN_REDIRECT_RESULT,
  EMAIL_PASSWORD_LOGIN_START,
  AUTH_IN_PROGRESS,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  CHECK_USER_SESSION
} from "./actionTypes";

export function setAuthInProgress() {
  return { type: AUTH_IN_PROGRESS };
}

export function googleLoginStart() {
  return { type: GOOGLE_LOGIN_START };
}

export function checkGoogleRedirectResult() {
  return { type: GOOGLE_LOGIN_REDIRECT_RESULT };
}

export function loginSuccess(user) {
  return { type: LOGIN_SUCCESS, payload: user };
}

export function loginError(errorMessage) {
  return { type: LOGIN_ERROR, payload: errorMessage };
}

export function loginWithEmailPasswordStart(email, password) {
  return { type: EMAIL_PASSWORD_LOGIN_START, payload: { email, password } };
}

export function userSignOut() {
  return { type: SIGN_OUT };
}

export function userSignoutSuccess() {
  return { type: SIGN_OUT_SUCCESS };
}

export function checkUserSession() {
  return { type: CHECK_USER_SESSION };
}
