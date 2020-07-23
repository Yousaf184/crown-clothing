import { combineReducers } from "redux";
import { userReducer } from "./user";
import { cartReducer } from "./cart";
import { shopDataReducer } from "./shopData";

const rootReducer = combineReducers({
  userReducer,
  cartReducer,
  shopDataReducer
});

export default rootReducer;
