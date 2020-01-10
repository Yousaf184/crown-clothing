import React from 'react';
import MenuItem from './menu-item/menu-item';

import classes from './homepage-menu.module.scss';

function HomepageMenu() {
    return (
        <div className={classes.homepageMenu}>
            <div className={classes.menuRow}>
                <MenuItem title="Hats"/>
                <MenuItem title="Jackets"/>
                <MenuItem title="Sneakers"/>
            </div>
            <div className={`${classes.menuRow} ${classes.twoItemRow}`}>
                <MenuItem title="Womens"/>
                <MenuItem title="Mens"/>
            </div>
        </div>
    );
}

export default HomepageMenu;