import React from "react";
import { connect } from "react-redux";

import { createAction } from "../../../redux/actions/common";
import { OPEN_CART_DROPDOWN } from "../../../redux/actions/actionTypes";

import { ReactComponent as ShoppingBagIcon } from "../../../assets/shopping-bag.svg";

import classes from "./cartIcon.module.scss";

function CartIcon(props) {
  return (
    <div className={classes.cartIcon} onClick={props.openCartDropdown}>
      <ShoppingBagIcon className={classes.icon} />
      <span className={classes.itemCount}>0</span>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  openCartDropdown: () => dispatch(createAction(OPEN_CART_DROPDOWN))
});

export default connect(null, mapDispatchToProps)(CartIcon);
