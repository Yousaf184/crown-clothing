import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import LoginForm from "../../components/form/login-form/login-form";
import SignupForm from "../../components/form/signup-form/signup-form";

function AuthPage(props) {
  const [showRegisterForm, setShowRegistrationForm] = useState(false);
  let componentToRender;

  const toggleAuthForm = () => {
    setShowRegistrationForm((showRegisterForm) => !showRegisterForm);
  };

  // if user is logged in, redirect to home page
  if (props.user) {
    componentToRender = <Redirect to="/" />;
  } else if (showRegisterForm) {
    componentToRender = <SignupForm showLoginForm={toggleAuthForm} />;
  } else {
    componentToRender = <LoginForm showRegisterForm={toggleAuthForm} />;
  }

  return componentToRender;
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps, null)(AuthPage);
