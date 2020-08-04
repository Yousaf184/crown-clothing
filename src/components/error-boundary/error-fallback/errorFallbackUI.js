import React from "react";

import { errorUIContainer } from "./errorFallbackUI.module.scss";

function ErrorFallbackUI({ fallbackImg, infoText }) {
  return (
    <div className={errorUIContainer}>
      <img src={fallbackImg} alt="something went wrong" />
      <h2>{infoText}</h2>
    </div>
  );
}

export default ErrorFallbackUI;
