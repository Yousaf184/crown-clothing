import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  GET_ITEM_SECTIONS_START,
  GET_ITEMS_START
} from "../redux/actions/actionTypes";
import {
  getItemSectionsError,
  getItemSectionsSuccess,
  getItemsSuccess,
  getItemsError
} from "../redux/actions/shopData";

import { getCollection } from "../utils/firebase";

function* fetchItemSections() {
  try {
    const collection = yield getCollection("itemSections");
    const itemSections = [];

    collection.docs.forEach((doc) => {
      itemSections.push(doc.data());
    });

    yield put(getItemSectionsSuccess(itemSections));
  } catch (error) {
    yield put(getItemSectionsError(error.message));
  }
}

function* fetchItems() {
  try {
    const collection = yield getCollection("items");
    const items = {};
    let data;

    collection.docs.forEach((doc) => {
      data = doc.data();
      items[data.title.toLowerCase()] = data;
    });

    yield put(getItemsSuccess(items));
  } catch (error) {
    yield put(getItemsError(error.message));
  }
}

function* watchFetchItemSectionsStart() {
  yield takeLatest(GET_ITEM_SECTIONS_START, fetchItemSections);
}

function* watchFetchItemsStart() {
  yield takeLatest(GET_ITEMS_START, fetchItems);
}

function* shopDataSagas() {
  yield all([call(watchFetchItemSectionsStart), call(watchFetchItemsStart)]);
}

export default shopDataSagas;
