import React, { useState, useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import HomePage from "../homepage/homepage";
import ShopPage from "../shopPage/shopPage";
import AuthPage from "../authPage/authPage";
import Header from "../../components/header/header";

import {
  firebaseAuth,
  createUserDocument,
  fetchUser
} from "../../utils/firebase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = firebaseAuth.onAuthStateChanged((userAuth) => {
      // only execute this code incase of google signin
      if (userAuth && userAuth.displayName) {
        const currentUser = {
          id: userAuth.uid,
          name: userAuth.displayName,
          email: userAuth.email
        };

        setCurrentUser(currentUser);
        createUserDocument(currentUser);
      }
      // incase of email signin or signup
      else if (userAuth) {
        // fetch current user and set the currentUser in state
        fetchUser(userAuth.uid)
          .then((user) => {
            if (user) {
              setCurrentUser(user);
            }
          })
          .catch((error) => console.log(error.message));
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  const signOut = () => {
    firebaseAuth.signOut();
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Header currentUser={currentUser} signOut={signOut} />
      <Route path="/" exact component={HomePage} />
      <Route path="/shop" exact component={ShopPage} />
      <Route path="/auth" exact component={AuthPage} />
    </BrowserRouter>
  );
}

export default App;
