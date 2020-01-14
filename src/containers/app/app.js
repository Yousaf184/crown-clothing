import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import HomePage from '../homepage/homepage';
import ShopPage from '../shopPage/shopPage';
import AuthPage from '../authPage/authPage';
import Header from '../../components/header/header';

import routerHistory from '../../utils/routerHistory';
import { firebaseAuth, createUserDocument } from '../../utils/firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        this.unsubscribeFromAuth = firebaseAuth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                const currentUser = {
                    id: userAuth.uid,
                    name: userAuth.displayName,
                    email: userAuth.email
                };

                this.setState({ currentUser });

                /**
                 * display name will be defined in case of google sign in
                 * only call createUserDocument function here in case of
                 * google sign in
                 */
                if (userAuth.displayName) {
                    createUserDocument(currentUser);
                }
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    signOut = () => {
        this.setState({ currentUser: null });
        firebaseAuth.signOut();
    };

    render() {
        return (
            <Router history={routerHistory}>
                <Header currentUser={this.state.currentUser} signOut={this.signOut}/>
                <Route path="/" exact component={HomePage}/>
                <Route path="/shop" exact component={ShopPage}/>
                <Route path="/auth" exact component={AuthPage}/>
            </Router>
        );
    }
}

export default App;
