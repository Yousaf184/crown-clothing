import { combineReducers } from "redux";
import { userReducer } from "./user";
import { cartDropdownReducer } from "./cart";

const rootReducer = combineReducers({
  userReducer,
  cartDropdownReducer
});

export default rootReducer;
