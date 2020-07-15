import { SET_CURRENT_USER } from "../actions/actionTypes";

const initialState = {
  user: null
};

export function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_USER:
      return { ...state, user: payload.user };
    default:
      return state;
  }
}
