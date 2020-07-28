import { getCollection } from "../../utils/firebase";
import {
  GET_ITEM_SECTIONS_SUCCESS,
  GET_ITEM_SECTIONS_IN_PROGRESS,
  GET_ITEM_SECTIONS_ERROR,
  GET_ITEMS_IN_PROGRESS,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR
} from "./actionTypes";

function createItemAction(actionType, payload) {
  return { type: actionType, payload };
}

export function getItemSections() {
  return (dispatch) => {
    dispatch(createItemAction(GET_ITEM_SECTIONS_IN_PROGRESS, null));

    getCollection("itemSections")
      .then((collection) => {
        const itemSections = [];

        collection.docs.forEach((doc) => {
          itemSections.push(doc.data());
        });

        dispatch(createItemAction(GET_ITEM_SECTIONS_SUCCESS, itemSections));
      })
      .catch((error) => {
        dispatch(createItemAction(GET_ITEM_SECTIONS_ERROR, error.message));
      });
  };
}

export function getItems() {
  return (dispatch) => {
    dispatch(createItemAction(GET_ITEMS_IN_PROGRESS, null));

    getCollection("items")
      .then((collection) => {
        const items = {};
        let data;

        collection.docs.forEach((doc) => {
          data = doc.data();
          items[data.title.toLowerCase()] = data;
        });

        dispatch(createItemAction(GET_ITEMS_SUCCESS, items));
      })
      .catch((error) => {
        dispatch(createItemAction(GET_ITEMS_ERROR, error.message));
      });
  };
}
