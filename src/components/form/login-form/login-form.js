import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Form from "../form";
import Spinner from "../../spinner/spinner";
import CustomButton from "../../custom-button/CustomButton";

import {
  signInWithGoogle,
  firebaseAuth,
  signInWithEmail
} from "../../../utils/firebase";
import { loginForm } from "../../../utils/formConfig";

// key for localStorage
const LOGIN_IN_PROGRESS_KEY = "loginInProgress";

function LoginForm(props) {
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const routerHistory = useHistory();

  useEffect(() => {
    // login progress status is saved in localStorage
    // because of google signin which redirects to login page
    if (localStorage.getItem(LOGIN_IN_PROGRESS_KEY)) {
      setLoginInProgress(true);
      localStorage.removeItem(LOGIN_IN_PROGRESS_KEY);
    }

    firebaseAuth
      .getRedirectResult()
      .then((result) => {
        if (result.user) {
          routerHistory.replace("/");
        }
      })
      .catch((error) => console.log(error.message));
  }, [routerHistory]);

  const googleSignIn = () => {
    // after redirect from google sign in page, this value
    // in localStorage will be used to determine whether to show spinner
    localStorage.setItem(LOGIN_IN_PROGRESS_KEY, true);
    setLoginInProgress(true);
    signInWithGoogle();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginInProgress(true);

    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;

    signInWithEmail(email, password)
      .then((result) => {
        if (result.user) {
          routerHistory.replace("/");
        }
      })
      .catch((error) => {
        setErrorMessage("incorrect email/password combination");
        setLoginInProgress(false);
      });
  };

  if (loginInProgress) {
    return <Spinner />;
  }

  return (
    <Form
      formTitle="I already have an account"
      formSubtitle="Sign in with your email and password"
      formObj={loginForm}
      submitBtnLabel="Login"
      submitHandler={handleSubmit}
      errorMessage={errorMessage}
    >
      <CustomButton
        className="googleSignInBtn"
        clickHandler={googleSignIn}
        blockBtn={true}
      >
        Sign in with Google
      </CustomButton>
      <span>Don't have an account?</span>
      <CustomButton
        className="authFormToggleBtn"
        clickHandler={props.showRegisterForm}
        outlineBtn="true"
        leftMargin="10px"
      >
        Register
      </CustomButton>
    </Form>
  );
}

export default LoginForm;
