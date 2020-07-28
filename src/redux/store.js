import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer", "itemSectionsReducer", "itemsDataReducer"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// redux devtool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reduxStore = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const persistorStore = persistStore(reduxStore);

export { persistorStore, reduxStore };
