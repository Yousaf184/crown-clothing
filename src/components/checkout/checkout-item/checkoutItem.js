import React from "react";

import classes from "./checkoutItem.module.scss";

// constants used for changing cart item quantity
const INCREASE = "increase";
const DECREASE = "deccrease";

function CheckoutItem(props) {
  const { name, imageUrl, price, quantity } = props.item;

  const removeItem = () => {
    props.removeItemFromCheckout(props.item);
  };

  const changeItemQuantity = (event) => {
    const change = event.target.dataset.change;

    if (change === INCREASE) {
      props.increaseItemQuantity(props.item);
    } else {
      props.decreaseItemQuantity(props.item);
    }
  };

  return (
    <div className={classes.checkoutItem}>
      <div className={`${classes.imgContainer} ${classes.col}`}>
        <img src={imageUrl} alt="checkout item" />
      </div>
      <span className={classes.col}>{name}</span>
      <div className={`${classes.col} ${classes.quantityCol}`}>
        <span
          className={classes.upArrow}
          onClick={changeItemQuantity}
          data-change={INCREASE}
        >
          &#10094;
        </span>
        <span>x{quantity}</span>
        <span
          className={classes.downArrow}
          onClick={changeItemQuantity}
          data-change={DECREASE}
        >
          &#10094;
        </span>
      </div>
      <span className={classes.col}>${price}</span>
      <span onClick={removeItem} className={classes.col}>
        &#10005;
      </span>
    </div>
  );
}

export default CheckoutItem;
