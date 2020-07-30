import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../form";
import Spinner from "../../spinner/spinner";
import FormToggler from "../form-toggler/formToggler";

import { signUpStart } from "../../../redux/actions/user";
import { signupForm } from "../../../utils/formConfig";

function SignupForm(props) {
  const signupInProgress = useSelector(
    (state) => state.userReducer.userAuthInProgress
  );
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.elements["name"].value;
    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;

    dispatch(signUpStart(name, email, password));
  };

  if (signupInProgress) {
    return <Spinner />;
  }

  return (
    <Form
      formTitle="I don't have an account"
      formSubtitle="Sign up by providing required information"
      formObj={signupForm}
      submitBtnLabel="Sign up"
      submitHandler={handleSubmit}
    >
      <FormToggler
        label="Already have an account?"
        clickHandler={props.showLoginForm}
        btnLabel="Login"
        btnClasses="outline"
      />
    </Form>
  );
}

export default SignupForm;
