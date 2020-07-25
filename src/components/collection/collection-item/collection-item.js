import React from "react";

import classes, {
  collectionItem,
  image,
  collectionFooter,
  addToCartBtn
} from "./collection-item.module.scss";

function CollectionItem(props) {
  const { name, imageUrl, price } = props.item;

  return (
    <div className={collectionItem}>
      <div
        className={image}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className={collectionFooter}>
        <span className={classes.name}>{name}</span>
        <span className={classes.price}>${price}</span>
      </div>
      <button
        className={`${addToCartBtn} outline`}
        onClick={props.addItemToCart}
        data-item={JSON.stringify(props.item)} // will be used by addItemToCart function
      >
        Add To Cart
      </button>
    </div>
  );
}

export default CollectionItem;
