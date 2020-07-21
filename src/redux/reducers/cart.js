import { TOGGLE_CART_DROPDOWN, ADD_ITEM_TO_CART } from "../actions/actionTypes";
import { addItemToCart } from "../../utils/cart";

const initialState = {
  openCartDropdown: false,
  cartItems: []
};

export function cartReducer(state = initialState, action) {
  const { type, payload: item } = action;

  switch (type) {
    case TOGGLE_CART_DROPDOWN:
      return { ...state, openCartDropdown: !state.openCartDropdown };

    case ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, item)
      };

    default:
      return state;
  }
}
