import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleCartDropdown } from "../../redux/actions/cart";

import CartDropdown from "./cart-dropdown/cartDropdown";
import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";

import classes from "./cart.module.scss";

function Cart() {
  const disptach = useDispatch();
  const openCartDropdown = useSelector(
    (state) => state.cartReducer.openCartDropdown
  );

  const toggleDropdown = () => {
    disptach(toggleCartDropdown());
  };

  return (
    <div className={classes.cartIcon} onClick={toggleDropdown}>
      <ShoppingBagIcon className={classes.icon} />
      <span className={classes.itemCount}>0</span>

      {openCartDropdown && <CartDropdown />}
    </div>
  );
}

export default React.memo(Cart);
