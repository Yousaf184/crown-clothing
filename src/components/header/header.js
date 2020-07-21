import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Cart from "../cart/cart";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import classes from "./header.module.scss";

function Header(props) {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div className={classes.header}>
      <Link to="/" className={classes.logoContainer}>
        <Logo className={classes.logo} />
      </Link>
      <div className={classes.navItems}>
        <Link to="/shop" className={classes.navItem}>
          Shop
        </Link>
        <Link to="/contact" className={classes.navItem}>
          Contact
        </Link>
        {/* if user is logged in, show 'sign out' option otherwise show 'sign in' option */}
        {user ? (
          <span className={classes.navItem} onClick={props.signOut}>
            Sign out
          </span>
        ) : (
          <Link to="/auth" className={classes.navItem}>
            Sign in
          </Link>
        )}
        <Cart />
      </div>
    </div>
  );
}

export default Header;
