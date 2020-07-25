import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { addItemToCart } from "../../../redux/actions/cart";

import CollectionItem from "../collection-item/collection-item";

import {
  collectionPreview,
  title,
  preview
} from "./collection-preview.module.scss";

function CollectionPreview(props) {
  const disptach = useDispatch();

  const addToCart = useCallback(
    (event) => {
      const clickedBtn = event.target;

      // change the text of the button to indicate
      // that item has been added to the cart
      clickedBtn.textContent = "Done";

      const itemToAdd = JSON.parse(clickedBtn.dataset.item);
      disptach(addItemToCart(itemToAdd));

      // change the text of the button back to original value
      setTimeout(() => {
        clickedBtn.textContent = "Add To Cart";
      }, 1500);
    },
    [disptach]
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
