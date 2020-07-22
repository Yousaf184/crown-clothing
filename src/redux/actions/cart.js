import {
  TOGGLE_CART_DROPDOWN,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART
} from "./actionTypes";

export function toggleCartDropdown() {
  return {
    type: TOGGLE_CART_DROPDOWN
  };
}

export function addItemToCart(item) {
  return {
    type: ADD_ITEM_TO_CART,
    payload: item
  };
}

export function removeItemFromCart(item) {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: item
  };
}
