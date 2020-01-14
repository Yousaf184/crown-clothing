import React, { Component } from 'react';

import Form from '../form/form';
import Spinner from '../spinner/spinner';

import { signInWithGoogle, firebaseAuth } from '../../utils/firebase';
import routerHistory from '../../utils/routerHistory';

class LoginForm extends Component {
    LOGIN_IN_PROGRESS_KEY = 'loginInProgress';

    constructor(props) {
        super(props);
        this.state = {
            loginInProgress: false,
            errorMessage: '',
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

    componentDidMount() {
        if (localStorage.getItem(this.LOGIN_IN_PROGRESS_KEY)) {
            this.setState({ loginInProgress: true });
            localStorage.removeItem(this.LOGIN_IN_PROGRESS_KEY);
        }

        firebaseAuth.getRedirectResult()
            .then(result => {
                if (result.user) {
                    // redirect user to home page after google sign in
                    routerHistory.replace('/');
                }
            })
            .catch(error => console.log(error.message));
    }

    googleSignIn = () => {
        localStorage.setItem(this.LOGIN_IN_PROGRESS_KEY, true);
        this.setState({ loginInProgress: true });
        signInWithGoogle();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loginInProgress: true });
        console.log('log in form');
    };

    render() {
        if (this.state.loginInProgress) {
            return <Spinner/>;
        }

        return (
            <Form
                formTitle="I already have an account"
                formSubtitle="Sign in with your email and password"
                formObj={this.state.loginForm}
                thisObj={this}
                formKey='loginForm'
                submitBtnLabel="Login"
                submitHandler={this.handleSubmit}
                errorMessage={this.state.errorMessage}>

                <button
                    className="googleSignInBtn"
                    onClick={this.googleSignIn}>
                    Sign in with Google
                </button>
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