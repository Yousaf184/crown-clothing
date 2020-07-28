import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CollectionItem from "./collection-item/collection-item";
import Spinner from "../spinner/spinner";

import { getItems } from "../../redux/actions/shopData";

import { collection, itemsContainer } from "./collection.module.scss";

function Collection(props) {
  const collectionName = props.match.params.collectionName;

  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.itemsDataReducer.data[collectionName]?.items
  );

  useEffect(() => {
    if (!items) {
      dispatch(getItems());
    }
  }, [dispatch, items]);

  if (!items) {
    return <Spinner />;
  }
  return (
    <div className={collection}>
      <h2>{collectionName.toUpperCase()}</h2>

      <div className={itemsContainer}>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Collection;
