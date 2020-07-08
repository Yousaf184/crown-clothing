import React from "react";

import classes from "./collection-item.module.scss";

function CollectionItem(props) {
  const { name, imageUrl, price } = props;

  return (
    <div className={classes.collectionItem}>
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className={classes.collectionFooter}>
        <span className={classes.name}>{name}</span>
        <span className={classes.price}>{price}</span>
      </div>
    </div>
  );
}

export default CollectionItem;
