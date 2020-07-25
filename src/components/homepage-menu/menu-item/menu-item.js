import React from "react";

import classes, {
  menuItem,
  backgroundImage,
  menuItemContent,
  subtitle
} from "./menu-item.module.scss";

function MenuItem(props) {
  const { title, imageUrl } = props.section;

  return (
    <div
      className={menuItem}
      onClick={props.showCollection}
      data-collection={title} // data-* attribute will be used by 'showCollection' function
    >
      <div
        className={backgroundImage}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className={`${menuItemContent}`}>
        <h1 className={classes.title}>{title}</h1>
        <h3 className={subtitle}>SHOW NOW</h3>
      </div>
    </div>
  );
}

export default MenuItem;
