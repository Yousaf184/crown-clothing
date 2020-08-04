import {
  GET_ITEM_SECTIONS_SUCCESS,
  GET_ITEM_SECTIONS_START,
  GET_ITEM_SECTIONS_ERROR,
  GET_ITEMS_START,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR
} from "./actionTypes";

export function getItemSectionsStart() {
  return { type: GET_ITEM_SECTIONS_START };
}

export function getItemSectionsSuccess(itemSectionsArr) {
  return { type: GET_ITEM_SECTIONS_SUCCESS, payload: itemSectionsArr };
}

export function getItemSectionsError(errorMessage) {
  return { type: GET_ITEM_SECTIONS_ERROR, payload: errorMessage };
}

export function getItemsStart() {
  return { type: GET_ITEMS_START };
}

export function getItemsSuccess(items) {
  return { type: GET_ITEMS_SUCCESS, payload: items };
}

export function getItemsError(errorMessage) {
  return { type: GET_ITEMS_ERROR, payload: errorMessage };
}
