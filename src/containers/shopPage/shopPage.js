import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collection/collections-overview/collectionsOverview";
import Collection from "../../components/collection/collection";

function ShopPage(props) {
  return (
    <>
      <Route path={props.match.path} exact component={CollectionsOverview} />
      <Route
        path={`${props.match.path}/:collectionName`}
        component={Collection}
      />
    </>
  );
}

export default ShopPage;
