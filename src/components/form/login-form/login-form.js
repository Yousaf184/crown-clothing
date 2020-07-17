import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Form from "../form";
import Spinner from "../../spinner/spinner";
import FormToggler from "../form-toggler/formToggler";

import {
  signInWithGoogle,
  firebaseAuth,
  signInWithEmail,
  saveUserIfNotExists
} from "../../../utils/firebase";
import { loginForm } from "../../../utils/formConfig";

import classes from "./loginForm.module.scss";

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
      .then(async (result) => {
        if (result.user) {
          const { uid, displayName, email } = result.user;
          const user = { id: uid, name: displayName, email };
          await saveUserIfNotExists(user);
          routerHistory.replace("/");
        }
      })
      .catch((error) => console.log(error.message));
  }, [routerHistory]);

  const googleSignIn = async () => {
    // after redirect from google sign in page, this value
    // in localStorage will be used to determine whether to show spinner
    localStorage.setItem(LOGIN_IN_PROGRESS_KEY, true);
    setLoginInProgress(true);

    signInWithGoogle();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginInProgress(true);

    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;

    try {
      await signInWithEmail(email, password);
      routerHistory.replace("/");
    } catch (error) {
      setErrorMessage("incorrect email/password combination");
      setLoginInProgress(false);
    }
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
      <button className={classes.googleSignInBtn} onClick={googleSignIn}>
        Sign in with Google
      </button>
      <FormToggler
        label="Don't have an account?"
        clickHandler={props.showRegisterForm}
        btnLabel="Register"
        btnClasses="outline"
      />
    </Form>
  );
}

export default LoginForm;
