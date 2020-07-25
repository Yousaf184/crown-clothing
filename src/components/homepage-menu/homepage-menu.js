import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import MenuItem from "./menu-item/menu-item";

import { homepageMenu } from "./homepage-menu.module.scss";

function HomepageMenu() {
  const routerHistory = useHistory();
  const sections = useSelector((state) => state.shopDataReducer.sectionsData);

  const showCollection = useCallback(
    ({ target }) => {
      const title = target.closest("[data-collection]").dataset.collection;
      routerHistory.push(`/shop/${title.toLowerCase()}`);
    },
    [routerHistory]
  );

  return (
    <div className={homepageMenu}>
      {sections.map((sec) => (
        <MenuItem key={sec.id} section={sec} showCollection={showCollection} />
      ))}
    </div>
  );
}

export default React.memo(HomepageMenu);
