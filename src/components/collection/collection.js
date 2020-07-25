import React from "react";
import { useSelector } from "react-redux";

import CollectionItem from "./collection-item/collection-item";

import { collection, itemsContainer } from "./collection.module.scss";

function Collection(props) {
  const collectionName = props.match.params.collectionName;

  const collectionItems = useSelector(
    (state) => state.shopDataReducer.collectionData[collectionName].items
  );

  return (
    <div className={collection}>
      <h2>{collectionName.toUpperCase()}</h2>

      <div className={itemsContainer}>
        {collectionItems.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Collection;
