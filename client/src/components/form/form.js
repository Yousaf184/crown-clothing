import React from "react";
import { useSelector } from "react-redux";

import useForm from "../../custom-hooks/useForm";

import { errorBlock, subtitle, form, submitBtn } from "./form.module.scss";

function Form(props) {
  const {
    formTitle,
    formSubtitle,
    formObj,
    submitBtnLabel,
    submitHandler
  } = props;

  const authError = useSelector((state) => state.userReducer.error);
  const { renderFormInputs, isFormValid } = useForm(formObj);

  return (
    <React.Fragment>
      {authError && <span className={errorBlock}>{authError}</span>}

      <div className={form}>
        <form onSubmit={submitHandler}>
          <h2>{formTitle}</h2>
          <span className={subtitle}>{formSubtitle}</span>

          {renderFormInputs()}

          <button
            type="submit"
            className={submitBtn}
            disabled={!isFormValid()}
            style={{ marginTop: "20px" }}
          >
            {submitBtnLabel}
          </button>
        </form>

        {props.children}
      </div>
    </React.Fragment>
  );
}

export default React.memo(Form);
