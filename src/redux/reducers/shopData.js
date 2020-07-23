import SHOP_DATA from "../../data/shop_data";
import SECTIONS_DATA from "../../data/sections_data";

const initialState = {
  collectionData: SHOP_DATA,
  sectionsData: SECTIONS_DATA
};

export function shopDataReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
