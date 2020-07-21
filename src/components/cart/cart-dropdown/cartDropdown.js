import React from "react";
import { useSelector } from "react-redux";

import CartItem from "../cart-item/cartItem";

import classes from "./cartDropdown.module.scss";

function CartDropdown() {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  return (
    <div className={classes.cartDropdown}>
      <div className={classes.cartItems}>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <button className="outline">Checkout</button>
    </div>
  );
}

export default CartDropdown;
