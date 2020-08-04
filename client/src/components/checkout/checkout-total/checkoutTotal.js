import React from "react";

import classes from "./checkoutTotal.module.scss";

function CheckoutTotal({ cartItemsTotal }) {
  return (
    <div className={classes.total}>
      <span>Total: ${cartItemsTotal}</span>
    </div>
  );
}

export default CheckoutTotal;
