import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Cart from "../cart/cart";

import { userSignOut } from "../../redux/actions/user";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import {
  header,
  logoContainer,
  navItem,
  logo,
  navItems
} from "./header.module.scss";

function Header(props) {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  return (
    <div className={header}>
      <Link to="/" className={logoContainer}>
        <Logo className={logo} />
      </Link>
      <div className={navItems}>
        <Link to="/shop" className={navItem}>
          Shop
        </Link>
        <Link to="/contact" className={navItem}>
          Contact
        </Link>
        {/* if user is logged in, show 'sign out' option otherwise show 'sign in' option */}
        {user ? (
          <span className={navItem} onClick={() => dispatch(userSignOut())}>
            Sign out
          </span>
        ) : (
          <Link to="/auth" className={navItem}>
            Sign in
          </Link>
        )}
        <Cart />
      </div>
    </div>
  );
}

export default Header;
