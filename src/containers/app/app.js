import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import HomePage from '../homepage/homepage';
import ShopPage from '../shopPage/shopPage';
import AuthPage from '../authPage/authPage';
import Header from '../../components/header/header';

import routerHistory from '../../utils/routerHistory';
import { firebaseAuth, createUserDocument, fetchUser } from '../../utils/firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        this.unsubscribeFromAuth = firebaseAuth.onAuthStateChanged((userAuth) => {
            // only execute this code incase of google signin
            if (userAuth && userAuth.displayName) {
                const currentUser = {
                    id: userAuth.uid,
                    name: userAuth.displayName,
                    email: userAuth.email
                };

                this.setCurrentUser(currentUser);
                createUserDocument(currentUser);
            }
            // incase of email signin or signup
            else if (userAuth) {
                // fetch current user and set the currentUser in state
                fetchUser(userAuth.uid)
                    .then(user => this.setCurrentUser(user))
                    .catch(error => console.log(error.message));
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

    setCurrentUser = (user) => {
        this.setState({ currentUser: user });
    }

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
