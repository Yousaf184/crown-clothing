import React, { Component } from 'react';

import Form from '../form/form';
import Spinner from '../spinner/spinner';

import {
    signInWithGoogle,
    firebaseAuth,
    signInWithEmail
} from '../../utils/firebase';
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
                        required: { message: 'email required' }
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
                        required: { message: 'password required' }
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
        // after redirect from google sign in page, this value
        // in localStorage will be used to determine whether to show spinner
        localStorage.setItem(this.LOGIN_IN_PROGRESS_KEY, true);
        this.setState({ loginInProgress: true });
        signInWithGoogle();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loginInProgress: true });

        const email = this.state.loginForm.email.value;
        const password = this.state.loginForm.password.value;

        signInWithEmail(email, password)
            .then(result => {
                if (result.user) {
                    routerHistory.replace('/');
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: error.message,
                    loginInProgress: false
                });
            });
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