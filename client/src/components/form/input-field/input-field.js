import React from "react";

import { inputContainer, shrink, error } from "./input-field.module.scss";

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
    <div className={inputContainer}>
      <input type={type} name={name} value={value} onChange={handleChange} />
      <label className={value ? shrink : ""}>{label}</label>
      {errorMessage && !isValid && (
        <span className={error}>{errorMessage}</span>
      )}
    </div>
  );
}

export default React.memo(InputField);
