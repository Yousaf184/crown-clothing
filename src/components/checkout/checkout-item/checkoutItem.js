import React from "react";

import classes from "./checkoutItem.module.scss";

function CheckoutItem(props) {
  const { name, imageUrl, price, quantity } = props.item;

  const handleClick = () => {
    props.removeItemFromCheckout(props.item);
  };

  return (
    <div className={classes.checkoutItem}>
      <div className={classes.imgContainer}>
        <img src={imageUrl} alt="checkout item" />
      </div>
      <span>{name}</span>
      <span>x{quantity}</span>
      <span>${price}</span>
      <span onClick={handleClick}>&#10005;</span>
    </div>
  );
}

export default CheckoutItem;
