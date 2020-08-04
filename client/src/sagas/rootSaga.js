import { all, call } from "redux-saga/effects";

import shopDataSagas from "../sagas/shopData";
import userSagas from "../sagas/user";

function* rootSaga() {
  yield all([call(shopDataSagas), call(userSagas)]);
}

export default rootSaga;
