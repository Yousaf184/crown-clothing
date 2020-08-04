import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleCartDropdown } from "../../redux/actions/cart";

import CartDropdown from "./cart-dropdown/cartDropdown";
import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";

import { cart, icon, itemCount } from "./cart.module.scss";

function Cart() {
  const disptach = useDispatch();
  const openCartDropdown = useSelector(
    (state) => state.cartReducer.openCartDropdown
  );
  const cartItemsCount = useSelector(
    (state) => state.cartReducer.cartItemsCount
  );

  const toggleDropdown = () => {
    disptach(toggleCartDropdown());
  };

  return (
    <div className={cart} onClick={toggleDropdown}>
      <ShoppingBagIcon className={icon} />
      <span className={itemCount}>{cartItemsCount}</span>

      {openCartDropdown && <CartDropdown />}
    </div>
  );
}

export default React.memo(Cart);
