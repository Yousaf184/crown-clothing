import { OPEN_CART_DROPDOWN } from "../actions/actionTypes";

const initialState = {
  openCartDropdown: false
};

export function cartDropdownReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case OPEN_CART_DROPDOWN:
      return { ...state, openCartDropdown: !state.openCartDropdown };
    default:
      return state;
  }
}
