import {
  GET_ITEM_SECTIONS_SUCCESS,
  GET_ITEM_SECTIONS_IN_PROGRESS,
  GET_ITEM_SECTIONS_ERROR,
  GET_ITEMS_IN_PROGRESS,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR
} from "../actions/actionTypes";

const itemSectionsInitialState = {
  data: [],
  inProgress: false,
  error: null
};

export function itemSectionsReducer(state = itemSectionsInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEM_SECTIONS_IN_PROGRESS:
      return {
        ...state,
        inProgress: true,
        error: null
      };

    case GET_ITEM_SECTIONS_SUCCESS:
      return {
        ...state,
        data: payload,
        inProgress: false,
        error: null
      };

    case GET_ITEM_SECTIONS_ERROR:
      return {
        ...state,
        inProgress: false,
        error: payload
      };

    default:
      return state;
  }
}

const itemsInitialState = {
  data: {},
  inProgress: false,
  error: null
};

export function itemsDataReducer(state = itemsInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEMS_IN_PROGRESS:
      return {
        ...state,
        inProgress: true,
        error: null
      };

    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        data: payload,
        inProgress: false,
        error: null
      };

    case GET_ITEMS_ERROR:
      return {
        ...state,
        inProgress: false,
        error: payload
      };

    default:
      return state;
  }
}
