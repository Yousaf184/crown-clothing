import React, { Suspense } from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collection/collections-overview/collectionsOverview";
import Spinner from "../../components/spinner/spinner";

const Collection = React.lazy(() =>
  import("../../components/collection/collection")
);

function ShopPage(props) {
  return (
    <>
      <Route path={props.match.path} exact component={CollectionsOverview} />
      <Suspense fallback={Spinner}>
        <Route
          path={`${props.match.path}/:collectionName`}
          component={Collection}
        />
      </Suspense>
    </>
  );
}

export default ShopPage;
