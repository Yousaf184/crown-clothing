import React, { Component } from 'react';

import Form from '../form/form';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signupForm: {
                name: {
                    label: 'Full Name',
                    inputConfig: {
                        name: 'name',
                        type: 'text'
                    },
                    validationRules: {
                        required: { message: 'name required' },
                        minLength: {
                            value: 3,
                            message: 'name should contain atleast 3 characters'
                        },
                        maxLength: {
                            value: 30,
                            message: 'name cannot contain more than 30 characters'
                        }
                    },
                    value: '',
                    valid: false,
                    errorMessage: '',
                    touched: false
                },
                email: {
                    label: 'Email',
                    inputConfig: {
                        name: 'email',
                        type: 'email'
                    },
                    validationRules: {
                        required: { message: 'email required' },
                        minLength: {
                            value: 10,
                            message: 'email should contain atleast 10 characters'
                        },
                        maxLength: {
                            value: 30,
                            message: 'email cannot contain more than 30 characters'
                        }
                    },
                    value: '',
                    valid: false,
                    errorMessage: '',
                    touched: false
                },
                password: {
                    label: 'Password',
                    inputConfig: {
                        name: 'password',
                        type: 'password'
                    },
                    validationRules: {
                        required: { message: 'password required' },
                        minLength: {
                            value: 8,
                            message: 'password should contain atleast 8 characters'
                        },
                        maxLength: {
                            value: 20,
                            message: 'password cannot contain more than 20 characters'
                        }
                    },
                    value: '',
                    valid: false,
                    errorMessage: '',
                    touched: false
                },
                confirmPassword: {
                    label: 'Confirm Password',
                    inputConfig: {
                        name: 'confirmPassword',
                        type: 'password'
                    },
                    validationRules: {
                        passwordMisMatch: {
                            // current password value in password field
                            passwordValue: () => this.state.signupForm.password.value,
                            message: 'passwords do not match'
                        }
                    },
                    value: '',
                    valid: false,
                    errorMessage: '',
                    touched: false
                }
            }
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('signup form');
    };

    render() {
        return (
            <Form
                formTitle="I don't have an account"
                formSubtitle="Sign up by providing required information"
                formObj={this.state.signupForm}
                thisObj={this}
                formKey='signupForm'
                submitBtnLabel="Sign up"
                submitHandler={this.handleSubmit}
            >
                <span>Already have an account?</span>
                <button
                    className="authFormToggleBtn"
                    onClick={this.props.showLoginForm}>
                    Login
                </button>
            </Form>
        );
    }
}

export default SignupForm;