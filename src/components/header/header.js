import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { AuthContext } from "../../contexts/authContext";

import CartIcon from "../cart/cart-icon/cartIcon";
import CartDropdown from "../cart/cart-dropdown/cartDropdown";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import classes from "./header.module.scss";

function Header(props) {
  const { signOut } = useContext(AuthContext);

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
        {props.user ? (
          <span className={classes.navItem} onClick={signOut}>
            Sign out
          </span>
        ) : (
          <Link to="/auth" className={classes.navItem}>
            Sign in
          </Link>
        )}
        <CartIcon />
      </div>
      {props.openCartDropdown && <CartDropdown />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  openCartDropdown: state.cartDropdownReducer.openCartDropdown
});

export default connect(mapStateToProps, null)(Header);
