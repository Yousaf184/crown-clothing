import {
  GOOGLE_LOGIN_START,
  EMAIL_PASSWORD_LOGIN_START,
  SIGN_UP_START,
  LOGIN_ERROR,
  SIGN_UP_ERROR,
  LOGIN_SUCCESS,
  AUTH_IN_PROGRESS,
  SIGN_OUT
} from "../actions/actionTypes";

const initialState = {
  user: null,
  userAuthInProgress: false,
  error: null
};

export function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, user: payload };

    case GOOGLE_LOGIN_START:
    case EMAIL_PASSWORD_LOGIN_START:
    case SIGN_UP_START:
    case AUTH_IN_PROGRESS:
      return { ...state, userAuthInProgress: true, error: null };

    case LOGIN_ERROR:
    case SIGN_UP_ERROR:
      return { ...state, userAuthInProgress: false, error: payload };

    case SIGN_OUT:
      return { ...state, user: null };

    default:
      return state;
  }
}
