import { combineReducers } from "redux";
import { userReducer } from "./user";
import { cartReducer } from "./cart";

const rootReducer = combineReducers({
  userReducer,
  cartReducer
});

export default rootReducer;
