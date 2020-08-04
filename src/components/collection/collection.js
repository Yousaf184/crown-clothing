import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import CollectionItem from "./collection-item/collection-item";
import Spinner from "../spinner/spinner";

import { addToCart as handleAddToCartClick } from "../../utils/sharedCallbacks";
import { getItemsStart } from "../../redux/actions/shopData";
import { addItemToCart } from "../../redux/actions/cart";

import { collection, itemsContainer } from "./collection.module.scss";

function Collection(props) {
  const collectionName = props.match.params.collectionName;

  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.itemsDataReducer.data[collectionName]?.items
  );

  useEffect(() => {
    if (!items) {
      dispatch(getItemsStart());
    }
  }, [dispatch, items]);

  const addToCart = useCallback(
    (event) => {
      handleAddToCartClick(event, dispatch, addItemToCart);
    },
    [dispatch]
  );

  if (!items) {
    return <Spinner />;
  }
  return (
    <div className={collection}>
      <h2>{collectionName.toUpperCase()}</h2>

      <div className={itemsContainer}>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} addItemToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default Collection;
