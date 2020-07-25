import React from "react";
import { useSelector } from "react-redux";

import CollectionPreview from "../collection-preview/collection-preview";

function CollectionsOverview() {
  const collections = useSelector(
    (state) => state.shopDataReducer.collectionData
  );

  return (
    <div>
      {Object.values(collections).map((c) => (
        <CollectionPreview key={c.id} {...c} />
      ))}
    </div>
  );
}

export default CollectionsOverview;
