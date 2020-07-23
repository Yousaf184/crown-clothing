import React from "react";
import { useSelector } from "react-redux";

import MenuItem from "./menu-item/menu-item";

import classes from "./homepage-menu.module.scss";

function HomepageMenu() {
  const sections = useSelector((state) => state.shopDataReducer.sectionsData);

  return (
    <div className={classes.homepageMenu}>
      {sections.map((sec) => (
        <MenuItem key={sec.id} section={sec} />
      ))}
    </div>
  );
}

export default React.memo(HomepageMenu);
