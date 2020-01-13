import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import classes from './header.module.scss';

function Header(props) {
    return (
        <div className={classes.header}>
            <Link to="/"  className={classes.logoContainer}>
                <Logo className={classes.logo}/>
            </Link>
            <div className={classes.navItems}>
                <Link to="/shop" className={classes.navItem}>Shop</Link>
                <Link to="/contact" className={classes.navItem}>Contact</Link>
                <Link to="/auth" className={classes.navItem}>Sign in</Link>
            </div>
        </div>
    );
}

export default Header;