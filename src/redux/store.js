import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const reduxStore = createStore(
  rootReducer,
  // redux devtool extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default reduxStore;
