import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Form from "../form";
import Spinner from "../../spinner/spinner";

import {
  saveUserIfNotExists,
  signupWithEmailAndPassword
} from "../../../utils/firebase";
import {
  requiredRule,
  minLengthRule,
  maxLengthRule
} from "../../../utils/inputValidationRules";

const signupFormObj = {
  name: {
    label: "Full Name",
    inputConfig: {
      name: "name",
      type: "text"
    },
    validationRules: [
      requiredRule("name"),
      minLengthRule("name", 3),
      maxLengthRule("name", 25)
    ],
    value: "",
    valid: false,
    errorMessage: "",
    touched: false
  },
  email: {
    label: "Email",
    inputConfig: {
      name: "email",
      type: "email"
    },
    validationRules: [
      requiredRule("email"),
      minLengthRule("email", 10),
      maxLengthRule("email", 25)
    ],
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
    validationRules: [
      requiredRule("password"),
      minLengthRule("password", 8),
      maxLengthRule("password", 20)
    ],
    value: "",
    valid: false,
    errorMessage: "",
    touched: false
  },
  confirmPassword: {
    label: "Confirm Password",
    inputConfig: {
      name: "confirmPassword",
      type: "password"
    },
    validationRules: [
      {
        name: "passwordMisMatch",
        message: "passwords do not match",
        validate(inputValue) {
          return this.password.value === inputValue;
        }
      }
    ],
    value: "",
    valid: false,
    errorMessage: "",
    touched: false
  }
};

function SignupForm(props) {
  const [signupInProgress, setSignupInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [signupForm] = useState(signupFormObj);
  const routerHistory = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSignupInProgress(true);

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

          saveUserIfNotExists(newUser);
          routerHistory.replace("/");
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
