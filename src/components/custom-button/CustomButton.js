import React from "react";

import classes from "./CustomButton.module.scss";

function CustomButton(props) {
  const {
    clickHandler = null,
    width = "150px",
    backgroundColor = "cornflowerblue",
    disabled = false,
    type = "button",
    outlineBtn = false,
    blockBtn = false,
    topMargin = "20px",
    bottomMargin = "0px",
    leftMargin = "0px",
    rightMargin = "0px"
  } = props;

  return (
    <button
      type={type}
      onClick={clickHandler}
      disabled={disabled}
      style={{
        width: outlineBtn ? "auto" : width,
        backgroundColor: !disabled && !outlineBtn && backgroundColor,
        display: blockBtn ? "block" : "initial",
        margin: `${topMargin} ${rightMargin} ${bottomMargin} ${leftMargin}`
      }}
      className={outlineBtn ? classes.outline : undefined}
    >
      {props.children}
    </button>
  );
}

export default CustomButton;
