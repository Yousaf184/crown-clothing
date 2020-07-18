import React from "react";

import classes from "./cartItem.module.scss";

function CartItem(props) {
  const { name, imageUrl, quantity, price } = props.item;
  return (
    <div className={classes.cartItem}>
      <img src={imageUrl} alt={name} />
      <div className={classes.itemInfo}>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
}

export default CartItem;
