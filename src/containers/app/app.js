import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import firebase from 'firebase/app';

import HomePage from '../homepage/homepage';
import ShopPage from '../shopPage/shopPage';
import AuthPage from '../authPage/authPage';
import Header from '../../components/header/header';

import routerHistory from '../../utils/routerHistory';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        this.unsubscribeFromAuth = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const currentUser = {
                    name: user.displayName,
                    email: user.email
                };

                this.setState({ currentUser });
                routerHistory.replace('/');
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    signOut = () => {
        this.setState({ currentUser: null });
        firebase.auth().signOut();
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
