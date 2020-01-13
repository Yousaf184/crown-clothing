import React, { Component } from 'react';

import Form from '../form/form';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginForm: {
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
                }
            }
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('log in form');
    };

    render() {
        return (
            <Form
                formTitle="I already have an account"
                formSubtitle="Sign in with your email and password"
                formObj={this.state.loginForm}
                thisObj={this}
                formKey='loginForm'
                submitBtnLabel="Login"
                submitHandler={this.handleSubmit}
            >
                <span>Don't have an account?</span>
                <button
                    className="authFormToggleBtn"
                    onClick={this.props.showRegisterForm}>
                    Register
                </button>
            </Form>
        );
    }
}

export default LoginForm;