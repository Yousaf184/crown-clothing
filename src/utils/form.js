import React from 'react';

import InputField from '../components/input-field/input-field';

/**
 * @param {object} formObj - object representation of form
 * @param {object} thisObj - this object refereing to the react component containing form
 * @param {string} formKeyName - form key in the state of the component containing form
 */
export function renderFormInputs(formObj, thisObj, formKeyName) {
    const arr = Object.values(formObj);
    const handleChange = onInputChange.bind(thisObj, formKeyName);

    return arr.map((inputObj, index) => (
        <InputField
            key={index}
            {...inputObj.inputConfig}
            isValid={inputObj.valid}
            value={inputObj.value}
            errorMessage={inputObj.errorMessage}
            label={inputObj.label}
            handleChange={handleChange}
        />
    ));
}

/**
 * input change event handler.
 * value of 'this' is the component containing the input on which
 * this onChange event handler function is called.
 *
 * Value of 'this' and 'formKeyName' is set by the bind function in
 * 'renderFormInputs' function
 *
 * @param {object} e - event object
 */
function onInputChange(formKeyName, e) {
    // clone form object
    const updatedForm = { ...this.state[formKeyName] };
    // copy input object whose value was changed
    const updatedInputObj = { ...updatedForm[e.target.name] };

    // update value
    updatedInputObj.value = e.target.value;

    // update input field's validity
    const isValidInput = isInputFieldValid(updatedInputObj, updatedInputObj.validationRules);
    // if input is valid and it was previously set to invalid
    // set its valid status to true
    if (isValidInput && !updatedInputObj.valid) {
        updatedInputObj.valid = true;
    }
    else if (!isValidInput && updatedInputObj.valid) {
        // if input is not valid and it was previously valid
        // set its valid status to false
        updatedInputObj.valid = false;
    }

    // mark input field as touched
    updatedInputObj.touched = true;

    // update copied form object
    updatedForm[e.target.name] = updatedInputObj;

    // update state
    this.setState({ [formKeyName]: updatedForm });
};

function isInputFieldValid(inputField, validationRules) {
    if (validationRules.required && inputField.value.trim().length === 0) {
        setInputFieldErrorMessage(inputField, validationRules.required);
        return false;
    }

    if (
        validationRules.minLength &&
        inputField.value.length < validationRules.minLength.value
    ) {
        setInputFieldErrorMessage(inputField, validationRules.minLength);
        return false;
    }

    if (
        validationRules.maxLength &&
        inputField.value.length > validationRules.maxLength.value
    ) {
        setInputFieldErrorMessage(inputField, validationRules.maxLength);
        return false;
    }

    if (
        validationRules.passwordMisMatch &&
        inputField.value !== validationRules.passwordMisMatch.passwordValue()
    ) {
        setInputFieldErrorMessage(inputField, validationRules.passwordMisMatch);
        return false;
    }

    return true;
};

/**
 * set error message of the validation rule passed as an argument
 * as an error message of the inputField passed as an argument.
 *
 * @param {object} inputField - object representation of the input field
 * @param {object} validationRule - object containing validation rules for the input field
 */
function setInputFieldErrorMessage(inputField, validationRule) {
    inputField.errorMessage = validationRule.message;
};