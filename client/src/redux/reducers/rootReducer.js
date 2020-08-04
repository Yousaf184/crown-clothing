import { combineReducers } from "redux";
import { userReducer } from "./user";
import { cartReducer } from "./cart";
import { itemSectionsReducer, itemsDataReducer } from "./shopData";

const rootReducer = combineReducers({
  userReducer,
  cartReducer,
  itemSectionsReducer,
  itemsDataReducer
});

export default rootReducer;
