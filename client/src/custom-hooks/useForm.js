import React, { useState, useCallback } from "react";
import InputField from "../components/form/input-field/input-field";

function useForm(formObj) {
  const [form, setForm] = useState(formObj);

  function renderFormInputs() {
    const arr = Object.values(form);

    return arr.map((inputObj, index) => (
      <InputField
        key={index}
        {...inputObj.inputConfig}
        isValid={inputObj.valid}
        value={inputObj.value}
        errorMessage={inputObj.errorMessage}
        label={inputObj.label}
        handleChange={onInputChange}
      />
    ));
  }

  /**
   * set error message of the validation rule passed as an argument
   * as an error message of the inputField passed as an argument.
   *
   * @param {object} inputField - object representation of the input field
   * @param {object} validationRule - object containing validation rule that was broken
   */
  const setInputFieldErrorMessage = useCallback(
    (inputField, validationRule) => {
      inputField.errorMessage = validationRule.message;
    },
    []
  );

  const isInputFieldValid = useCallback(
    (inputField) => {
      const validationRules = inputField.validationRules;

      for (let i = 0; i < validationRules.length; i++) {
        // 'this' inside the validate function should refer to form obj
        // this is done to compare password and confirmPassword values
        if (!validationRules[i].validate.call(form, inputField.value)) {
          setInputFieldErrorMessage(inputField, validationRules[i]);
          return false;
        }
      }

      return true;
    },
    [form, setInputFieldErrorMessage]
  );

  const onInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      // copy input object whose value was changed
      const inputObj = { ...form[name] };
      // update value
      inputObj.value = value;

      // update input field's validity
      const isValidInput = isInputFieldValid(inputObj);
      // if input is valid and it was previously set to invalid
      // set its valid status to true
      if (isValidInput && !inputObj.valid) {
        inputObj.valid = true;
      } else if (!isValidInput && inputObj.valid) {
        // if input is not valid and it was previously valid
        // set its valid status to false
        inputObj.valid = false;
      }

      // mark input field as touched
      inputObj.touched = true;
      setForm({ ...form, [name]: inputObj });
    },
    [form, isInputFieldValid]
  );

  /**
   * returns boolean value indicating whether overall form is valid
   *
   * @param {object} formObj - object respresentation of a form
   */
  const isFormValid = useCallback(() => {
    let isValid = true;
    const arr = Object.values(form);

    for (let i = 0; i < arr.length; i++) {
      if (!arr[i].valid) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }, [form]);

  return { form, renderFormInputs, isFormValid };
}

export default useForm;
