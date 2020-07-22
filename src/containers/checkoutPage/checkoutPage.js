import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import CheckoutItem from "../../components/checkout/checkout-item/checkoutItem";

import { removeItemFromCart } from "../../redux/actions/cart";

import classes from "./checkoutPage.module.scss";

function CheckoutPage() {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const cartItemsTotal = useSelector((state) => state.cartReducer.total);

  const dispatch = useDispatch();

  const removeCartItem = useCallback(
    (item) => dispatch(removeItemFromCart(item)),
    [dispatch]
  );

  return (
    <div className={classes.checkoutPage}>
      <div className={classes.checkoutHeader}>
        <span>Product</span>
        <span>Name</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Remove</span>
      </div>
      <div>
        {cartItems.map((item) => (
          <CheckoutItem
            key={item.id}
            item={item}
            removeItemFromCheckout={removeCartItem}
          />
        ))}
      </div>
      <div className={classes.total}>
        <span>Total: ${cartItemsTotal}</span>
      </div>
    </div>
  );
}

export default CheckoutPage;
