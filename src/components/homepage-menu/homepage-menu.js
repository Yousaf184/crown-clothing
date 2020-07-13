import React from "react";
import MenuItem from "./menu-item/menu-item";

import classes from "./homepage-menu.module.scss";

function HomepageMenu() {
  return (
    <div className={classes.homepageMenu}>
      <MenuItem title="Hats" bgImage="https://i.ibb.co/cvpntL1/hats.png" />
      <MenuItem
        title="Jackets"
        bgImage="https://i.ibb.co/px2tCc3/jackets.png"
      />
      <MenuItem
        title="Sneakers"
        bgImage="https://i.ibb.co/0jqHpnp/sneakers.png"
      />
      <MenuItem title="Womens" bgImage="https://i.ibb.co/GCCdy8t/womens.png" />
      <MenuItem title="Mens" bgImage="https://i.ibb.co/R70vBrQ/men.png" />
    </div>
  );
}

export default React.memo(HomepageMenu);
