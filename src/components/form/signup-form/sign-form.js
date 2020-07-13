import React, { useState, useContext } from "react";

import { AuthContext } from "../../../contexts/authContext";

import Form from "../form";
import Spinner from "../../spinner/spinner";

import { signupWithEmailAndPassword } from "../../../utils/firebase";
import { signupForm } from "../../../utils/formConfig";

function SignupForm(props) {
  const [signupInProgress, setSignupInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const authContext = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSignupInProgress(true);
    authContext.setIsSignUp(true);

    const name = event.target.elements["name"].value;
    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;

    signupWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          const newUser = {
            id: result.user.uid,
            name,
            email
          };

          authContext.onUserSignup(newUser);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSignupInProgress(false);
      });
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
      <span>Already have an account?</span>
      <button className="authFormToggleBtn" onClick={props.showLoginForm}>
        Login
      </button>
    </Form>
  );
}

export default SignupForm;
