import React from "react";

import classes from "./checkoutHeader.module.scss";

function CheckoutHeader() {
  return (
    <div className={classes.checkoutHeader}>
      <span>Product</span>
      <span>Name</span>
      <span>Quantity</span>
      <span>Price</span>
      <span>Remove</span>
    </div>
  );
}

export default React.memo(CheckoutHeader);
