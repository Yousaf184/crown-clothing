import React from "react";

import { cartItem, itemInfo } from "./cartItem.module.scss";

function CartItem(props) {
  const { name, imageUrl, quantity, price } = props.item;
  return (
    <div className={cartItem}>
      <img src={imageUrl} alt={name} />
      <div className={itemInfo}>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
}

export default CartItem;
