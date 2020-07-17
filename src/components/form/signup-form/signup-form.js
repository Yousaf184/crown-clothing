import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Form from "../form";
import Spinner from "../../spinner/spinner";
import FormToggler from "../form-toggler/formToggler";

import {
  signupWithEmailAndPassword,
  saveNewUser
} from "../../../utils/firebase";
import { signupForm } from "../../../utils/formConfig";

function SignupForm(props) {
  const [signupInProgress, setSignupInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const routerHistory = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSignupInProgress(true);

    const name = event.target.elements["name"].value;
    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;

    try {
      const result = await signupWithEmailAndPassword(email, password);
      await saveNewUser({ id: result.user.uid, name, email });
      routerHistory.replace("/");
    } catch (error) {
      setErrorMessage(error.message);
      setSignupInProgress(false);
    }
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
      errorMessage={errorMessage}
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
