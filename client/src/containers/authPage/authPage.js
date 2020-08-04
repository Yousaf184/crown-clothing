import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import LoginForm from "../../components/form/login-form/login-form";
import SignupForm from "../../components/form/signup-form/signup-form";

function AuthPage() {
  const [showRegisterForm, setShowRegistrationForm] = useState(false);
  const user = useSelector((state) => state.userReducer.user);
  let componentToRender;

  const toggleAuthForm = () => {
    setShowRegistrationForm((showRegisterForm) => !showRegisterForm);
  };

  // if user is logged in, redirect to home page
  if (user) {
    componentToRender = <Redirect to="/" />;
  } else if (showRegisterForm) {
    componentToRender = <SignupForm showLoginForm={toggleAuthForm} />;
  } else {
    componentToRender = <LoginForm showRegisterForm={toggleAuthForm} />;
  }

  return componentToRender;
}

export default AuthPage;
