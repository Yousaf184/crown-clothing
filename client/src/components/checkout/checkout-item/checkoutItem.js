import React from "react";

import {
  checkoutItem,
  imgContainer,
  col,
  quantityCol,
  upArrow,
  downArrow
} from "./checkoutItem.module.scss";

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
    <div className={checkoutItem}>
      <div className={`${imgContainer} ${col}`}>
        <img src={imageUrl} alt="checkout item" />
      </div>
      <span className={col}>{name}</span>
      <div className={`${col} ${quantityCol}`}>
        <span
          className={upArrow}
          onClick={changeItemQuantity}
          data-change={INCREASE}
        >
          &#10094;
        </span>
        <span>x{quantity}</span>
        <span
          className={downArrow}
          onClick={changeItemQuantity}
          data-change={DECREASE}
        >
          &#10094;
        </span>
      </div>
      <span className={col}>${price}</span>
      <span onClick={removeItem} className={col}>
        &#10005;
      </span>
    </div>
  );
}

export default CheckoutItem;
