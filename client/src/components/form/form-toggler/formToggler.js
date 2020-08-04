import React from "react";
import classes from "./formToggler.module.scss";

function FormToggler({ clickHandler, btnLabel, label, btnClasses }) {
  return (
    <div className={classes.formToggler}>
      <span>{label}</span>
      <button className={btnClasses} onClick={clickHandler}>
        {btnLabel}
      </button>
    </div>
  );
}

export default FormToggler;
