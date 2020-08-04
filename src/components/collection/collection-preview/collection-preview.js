import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import CollectionItem from "../collection-item/collection-item";

import { addItemToCart } from "../../../redux/actions/cart";
import { addToCart as handleAddToCartClick } from "../../../utils/sharedCallbacks";

import {
  collectionPreview,
  title,
  preview
} from "./collection-preview.module.scss";

function CollectionPreview(props) {
  const dispatch = useDispatch();

  const addToCart = useCallback(
    (event) => {
      handleAddToCartClick(event, dispatch, addItemToCart);
    },
    [dispatch]
  );

  return (
    <div className={collectionPreview}>
      <h1 className={title}>{props.title}</h1>
      <div className={preview}>
        {props.items
          .filter((_, idx) => idx < 4) // only show first 4 items
          .map((item) => (
            <CollectionItem
              key={item.id}
              item={item}
              addItemToCart={addToCart}
            />
          ))}
      </div>
    </div>
  );
}

export default CollectionPreview;
