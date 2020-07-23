import React from "react";

import classes from "./menu-item.module.scss";

function MenuItem(props) {
  const { title, imageUrl } = props.section;

  return (
    <div className={classes.menuItem}>
      <div
        className={classes.backgroundImage}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className={`${classes.menuItemContent}`}>
        <h1 className={classes.title}>{title}</h1>
        <h3 className={classes.subtitle}>SHOW NOW</h3>
      </div>
    </div>
  );
}

export default MenuItem;
