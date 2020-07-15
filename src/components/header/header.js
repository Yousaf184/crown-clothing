import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { AuthContext } from "../../contexts/authContext";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import classes from "./header.module.scss";

function Header(props) {
  const { signOut } = useContext(AuthContext);

  let conditionalNavItem = (
    <Link to="/auth" className={classes.navItem}>
      Sign in
    </Link>
  );

  if (props.user) {
    conditionalNavItem = (
      <span className={classes.navItem} onClick={signOut}>
        Sign out
      </span>
    );
  }

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
        {conditionalNavItem}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps, null)(Header);
