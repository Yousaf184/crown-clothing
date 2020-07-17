import React from "react";

import classes from "./cartDropdown.module.scss";

function CartDropdown() {
  return (
    <div className={classes.cartDropdown}>
      <div className={classes.cartItems}></div>
      <button className="outline">Checkout</button>
    </div>
  );
}

export default CartDropdown;
