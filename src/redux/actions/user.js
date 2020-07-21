import { SET_CURRENT_USER } from "./actionTypes";

export function setUser(user) {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
}
