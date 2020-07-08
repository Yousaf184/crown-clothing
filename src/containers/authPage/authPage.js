import React, { useState } from "react";

import LoginForm from "../../components/form/login-form/login-form";
import SignupForm from "../../components/form/signup-form/sign-form";

function AuthPage() {
  const [showRegisterForm, setShowRegistrationForm] = useState(false);

  const toggleAuthForm = () => {
    setShowRegistrationForm((showRegisterForm) => !showRegisterForm);
  };

  if (showRegisterForm) {
    return <SignupForm showLoginForm={toggleAuthForm} />;
  }

  return <LoginForm showRegisterForm={toggleAuthForm} />;
}

export default AuthPage;
