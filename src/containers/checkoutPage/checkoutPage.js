import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import CheckoutItem from "../../components/checkout/checkout-item/checkoutItem";
import CheckoutHeader from "../../components/checkout/checkout-header/checkoutHeader";
import CheckoutTotal from "../../components/checkout/checkout-total/checkoutTotal";

import {
  removeItemFromCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity
} from "../../redux/actions/cart";

import classes, {
  testCreditCardInfo,
  testCardInfo,
  paymentContainer
} from "./checkoutPage.module.scss";
import StripeCheckoutButton from "../../components/stripe-btn/stripeCheckoutBtn";

function CheckoutPage() {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const cartItemsTotal = useSelector((state) => state.cartReducer.total);

  const dispatch = useDispatch();

  const removeCartItem = useCallback(
    (item) => dispatch(removeItemFromCart(item)),
    [dispatch]
  );

  const increaseItemQuantity = useCallback(
    (item) => dispatch(increaseCartItemQuantity(item)),
    [dispatch]
  );

  const decreaseItemQuantity = useCallback(
    (item) => dispatch(decreaseCartItemQuantity(item)),
    [dispatch]
  );

  return (
    <div className={classes.checkoutPage}>
      <CheckoutHeader />
      <div>
        {cartItems.map((item) => (
          <CheckoutItem
            key={item.id}
            item={item}
            removeItemFromCheckout={removeCartItem}
            increaseItemQuantity={increaseItemQuantity}
            decreaseItemQuantity={decreaseItemQuantity}
          />
        ))}
      </div>

      <CheckoutTotal cartItemsTotal={cartItemsTotal} />

      <div className={paymentContainer}>
        <div className={testCreditCardInfo}>
          <span>Use following information for test payment</span>
          <div className={testCardInfo}>
            <span>Credit Card Number: 4242 4242 4242 4242</span>
            <span>Expiry: 01/20</span>
            <span>CVV: 123</span>
          </div>
        </div>

        <StripeCheckoutButton totalAmount={cartItemsTotal} />
      </div>
    </div>
  );
}

export default CheckoutPage;
