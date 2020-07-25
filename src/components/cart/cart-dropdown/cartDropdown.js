import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import CartItem from "../cart-item/cartItem";

import classes, {
  cartDropdown,
  emptyCartInfoMsg
} from "./cartDropdown.module.scss";

function CartDropdown() {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const routerHistory = useHistory();

  const goToCheckoutPage = () => {
    routerHistory.push("/checkout");
  };

  return (
    <div className={cartDropdown}>
      {cartItems.length === 0 ? (
        <span className={emptyCartInfoMsg}>Cart is Empty</span>
      ) : (
        <div className={classes.cartItems}>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}

      <button
        className="outline"
        disabled={cartItems.length === 0}
        onClick={goToCheckoutPage}
      >
        Checkout
      </button>
    </div>
  );
}

export default CartDropdown;
