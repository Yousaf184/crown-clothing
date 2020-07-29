import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import MenuItem from "./menu-item/menu-item";
import Spinner from "../spinner/spinner";

import { getItemSectionsStart } from "../../redux/actions/shopData";

import { homepageMenu } from "./homepage-menu.module.scss";

function HomepageMenu() {
  const routerHistory = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.itemSectionsReducer);

  useEffect(() => {
    if (state.data.length === 0) {
      dispatch(getItemSectionsStart());
    }
  }, [dispatch, state.data]);

  const showCollection = useCallback(
    ({ target }) => {
      const title = target.closest("[data-collection]").dataset.collection;
      routerHistory.push(`/shop/${title.toLowerCase()}`);
    },
    [routerHistory]
  );

  if (state.inProgress) {
    return <Spinner />;
  }

  return (
    <div className={homepageMenu}>
      {state.data.map((sec) => (
        <MenuItem
          key={sec.title}
          section={sec}
          showCollection={showCollection}
        />
      ))}
    </div>
  );
}

export default React.memo(HomepageMenu);
