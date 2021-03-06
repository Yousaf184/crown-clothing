import {
  TOGGLE_CART_DROPDOWN,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  INCREASE_CART_ITEM_QUANITITY,
  DECREASE_CART_ITEM_QUANITITY
} from "../actions/actionTypes";
import {
  addItemToCart,
  removeItemFromCart,
  decreaseItemQuantity
} from "../../utils/cart";

const initialState = {
  openCartDropdown: false,
  cartItems: [],
  cartItemsCount: 0,
  total: 0
};

export function cartReducer(state = initialState, action) {
  const { type, payload: item } = action;

  switch (type) {
    case TOGGLE_CART_DROPDOWN:
      return { ...state, openCartDropdown: !state.openCartDropdown };

    case ADD_ITEM_TO_CART:
    case INCREASE_CART_ITEM_QUANITITY:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, item),
        cartItemsCount: state.cartItemsCount + 1,
        total: state.total + item.price
      };

    case DECREASE_CART_ITEM_QUANITITY:
      return {
        ...state,
        cartItems: decreaseItemQuantity(state.cartItems, item),
        cartItemsCount: state.cartItemsCount - 1,
        total: state.total - item.price
      };

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, item),
        cartItemsCount: state.cartItemsCount - 1 * item.quantity,
        total: state.total - item.quantity * item.price
      };

    default:
      return state;
  }
}
