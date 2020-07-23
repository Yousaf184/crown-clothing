import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reduxStore = createStore(
  persistedReducer,
  // redux devtool extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistorStore = persistStore(reduxStore);

export { persistorStore, reduxStore };
