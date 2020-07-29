import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxLogger from "redux-logger";

import rootSaga from "../sagas/rootSaga";
import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// redux devtool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const reduxStore = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(reduxThunk, sagaMiddleware, reduxLogger))
);

sagaMiddleware.run(rootSaga);

const persistorStore = persistStore(reduxStore);

export { persistorStore, reduxStore };
