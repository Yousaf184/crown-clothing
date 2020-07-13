import React from "react";

import useForm from "../../custom-hooks/useForm";

import classes from "./form.module.scss";
import CustomButton from "../custom-button/CustomButton";

function Form(props) {
  const {
    formTitle,
    formSubtitle,
    formObj,
    submitBtnLabel,
    submitHandler,
    errorMessage
  } = props;

  const { renderFormInputs, isFormValid } = useForm(formObj);

  return (
    <React.Fragment>
      {errorMessage && (
        <span className={classes.errorBlock}>{errorMessage}</span>
      )}

      <div className={classes.form}>
        <form onSubmit={submitHandler}>
          <h2>{formTitle}</h2>
          <span className={classes.subtitle}>{formSubtitle}</span>

          {renderFormInputs()}

          <CustomButton
            type="submit"
            className={classes.submitBtn}
            disabled={!isFormValid()}
          >
            {submitBtnLabel}
          </CustomButton>
        </form>

        {props.children}
      </div>
    </React.Fragment>
  );
}

export default Form;
