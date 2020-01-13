import React, { Component } from 'react';

import LoginForm from '../../components/login-form/login-form';
import SignupForm from '../../components/signup-form/sign-form';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRegisterForm: false
        };
    }

    toggleAuthForm = () => {
        this.setState(prevState => ({ showRegisterForm: !prevState.showRegisterForm }));
    };

    render() {
        if (this.state.showRegisterForm) {
            return <SignupForm showLoginForm={this.toggleAuthForm}/>;
        }

        return (
            <div>
                <LoginForm showRegisterForm={this.toggleAuthForm}/>
            </div>
        );
    }
}

export default AuthPage;