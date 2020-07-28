import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CollectionPreview from "../collection-preview/collection-preview";
import Spinner from "../../spinner/spinner";

import { getItems } from "../../../redux/actions/shopData";

function CollectionsOverview() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.itemsDataReducer);

  useEffect(() => {
    if (Object.keys(state.data).length === 0) {
      dispatch(getItems());
    }
  }, [dispatch, state.data]);

  if (state.inProgress) {
    return <Spinner />;
  }

  return (
    <div>
      {Object.values(state.data).map((c) => (
        <CollectionPreview key={c.title} {...c} />
      ))}
    </div>
  );
}

export default CollectionsOverview;
