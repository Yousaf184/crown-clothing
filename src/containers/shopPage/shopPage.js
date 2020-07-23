import React from "react";
import { useSelector } from "react-redux";

import CollectionPreview from "../../components/collection-preview/collection-preview";

function ShopPage() {
  const collections = useSelector(
    (state) => state.shopDataReducer.collectionData
  );

  return (
    <div>
      {collections.map((c) => (
        <CollectionPreview key={c.id} {...c} />
      ))}
    </div>
  );
}

export default ShopPage;
