import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Form from "../form";
import Spinner from "../../spinner/spinner";
import { requiredRule } from "../../../utils/inputValidationRules";

import {
  signInWithGoogle,
  firebaseAuth,
  signInWithEmail
} from "../../../utils/firebase";

const LOGIN_IN_PROGRESS_KEY = "loginInProgress";
const loginFormObj = {
  email: {
    label: "Email",
    inputConfig: {
      name: "email",
      type: "email"
    },
    validationRules: [requiredRule("email")],
    value: "",
    valid: false,
    errorMessage: "",
    touched: false
  },
  password: {
    label: "Password",
    inputConfig: {
      name: "password",
      type: "password"
    },
    validationRules: [requiredRule("password")],
    value: "",
    valid: false,
    errorMessage: "",
    touched: false
  }
};

function LoginForm(props) {
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginForm] = useState(loginFormObj);
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
          // redirect user to home page after google sign in
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
      <button className="googleSignInBtn" onClick={googleSignIn}>
        Sign in with Google
      </button>
      <span>Don't have an account?</span>
      <button className="authFormToggleBtn" onClick={props.showRegisterForm}>
        Register
      </button>
    </Form>
  );
}

export default LoginForm;
