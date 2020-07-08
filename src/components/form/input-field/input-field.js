import React from "react";

import classes from "./input-field.module.scss";

function InputField(props) {
  const {
    label,
    type,
    name,
    handleChange,
    errorMessage,
    isValid,
    value
  } = props;

  return (
    <div className={classes.inputContainer}>
      <input type={type} name={name} value={value} onChange={handleChange} />
      <label className={value ? classes.shrink : ""}>{label}</label>
      {errorMessage && !isValid && (
        <span className={classes.error}>{errorMessage}</span>
      )}
    </div>
  );
}

export default InputField;
