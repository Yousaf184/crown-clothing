import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../form";
import Spinner from "../../spinner/spinner";
import FormToggler from "../form-toggler/formToggler";

import { loginForm } from "../../../utils/formConfig";

import {
  googleLoginStart,
  loginWithEmailPasswordStart,
  setAuthInProgress
} from "../../../redux/actions/user";

import classes from "./loginForm.module.scss";

// key for localStorage
const LOGIN_IN_PROGRESS_KEY = "loginInProgress";

function LoginForm(props) {
  const loginInProgress = useSelector(
    (state) => state.userReducer.userAuthInProgress
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // login progress status is saved in localStorage
    // because of google signin which redirects to login page
    if (localStorage.getItem(LOGIN_IN_PROGRESS_KEY)) {
      dispatch(setAuthInProgress());
    }

    return () => localStorage.removeItem(LOGIN_IN_PROGRESS_KEY);
  }, [dispatch]);

  const googleSignIn = async () => {
    // after redirect from google sign in page, this value
    // in localStorage will be used to determine whether to show spinner
    localStorage.setItem(LOGIN_IN_PROGRESS_KEY, true);
    dispatch(googleLoginStart());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.elements["email"].value;
    const password = event.target.elements["password"].value;

    dispatch(loginWithEmailPasswordStart(email, password));
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
