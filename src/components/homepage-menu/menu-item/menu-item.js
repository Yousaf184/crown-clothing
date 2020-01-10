import React from 'react';

import classes from './menu-item.module.scss';

function MenuItem(props) {
    return (
        <div className={classes.menuItem}>
            <div
                className={classes.backgroundImage}
                style={{ backgroundImage: `url(${props.bgImage})` }}>
            </div>
            <div className={`${classes.menuItemContent}`}>
                <h1 className={classes.title}>{ props.title }</h1>
                <h3 className={classes.subtitle}>SHOW NOW</h3>
            </div>
        </div>
    );
}

export default MenuItem;