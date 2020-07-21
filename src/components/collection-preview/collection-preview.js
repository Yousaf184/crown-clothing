import React, { useCallback } from "react";
import { connect } from "react-redux";

import { createAction } from "../../redux/actions/common";
import { ADD_ITEM_TO_CART } from "../../redux/actions/actionTypes";

import CollectionItem from "./collection-item/collection-item";

import classes from "./collection-preview.module.scss";

function CollectionPreview(props) {
  const { addToCart } = props;

  const addItemToCart = useCallback(
    (event) => {
      const clickedBtn = event.target;

      // change the text of the button to indicate
      // that item has been added to the cart
      clickedBtn.textContent = "Done";

      const itemToAdd = JSON.parse(clickedBtn.dataset.item);
      addToCart(itemToAdd);

      // change the text of the button back to original value
      setTimeout(() => {
        clickedBtn.textContent = "Add To Cart";
      }, 1500);
    },
    [addToCart]
  );

  return (
    <div className={classes.collectionPreview}>
      <h1 className={classes.title}>{props.title}</h1>
      <div className={classes.preview}>
        {props.items
          .filter((_, idx) => idx < 4) // only show first 4 items
          .map((item) => (
            <CollectionItem
              key={item.id}
              item={item}
              addItemToCart={addItemToCart}
            />
          ))}
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(createAction(ADD_ITEM_TO_CART, { item }))
});

export default connect(null, mapDispatchToProps)(CollectionPreview);
