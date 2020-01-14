import React, { Component } from 'react';

import Form from '../form/form';
import Spinner from '../spinner/spinner';

import { firebaseAuth, createUserDocument } from '../../utils/firebase';
import routerHistory from '../../utils/routerHistory';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signupInProgress: false,
            errorMessage: '',
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
        this.setState({ signupInProgress: true });

        const email = this.state.signupForm.email.value;
        const password = this.state.signupForm.password.value;

        firebaseAuth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                if (result.user) {
                    const newUser = {
                        id: result.user.uid,
                        name: this.state.signupForm.name.value,
                        email: email
                    };

                    createUserDocument(newUser);
                    routerHistory.replace('/');
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: error.message,
                    signupInProgress: false
                });
            });
    };

    render() {
        if (this.state.signupInProgress) {
            return <Spinner/>;
        }

        return (
            <Form
                formTitle="I don't have an account"
                formSubtitle="Sign up by providing required information"
                formObj={this.state.signupForm}
                thisObj={this}
                formKey='signupForm'
                submitBtnLabel="Sign up"
                submitHandler={this.handleSubmit}
                errorMessage={this.state.errorMessage}>

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