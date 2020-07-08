import React, { useState } from "react";

import CollectionPreview from "../../components/collection-preview/collection-preview";
import SHOP_DATA from "./shop-data";

function ShopPage() {
  const [collections] = useState(SHOP_DATA);

  return (
    <div>
      {collections.map((c) => (
        <CollectionPreview key={c.id} {...c} />
      ))}
    </div>
  );
}

export default ShopPage;
