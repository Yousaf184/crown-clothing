import React from "react";
import { connect } from "react-redux";

import CartItem from "../cart-item/cartItem";

import classes from "./cartDropdown.module.scss";

function CartDropdown(props) {
  return (
    <div className={classes.cartDropdown}>
      <div className={classes.cartItems}>
        {props.cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <button className="outline">Checkout</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cartItems: state.cartReducer.cartItems
});

export default connect(mapStateToProps, null)(CartDropdown);
