import React, { useState, useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import AuthContextProvider from "../../contexts/authContext";

import HomePage from "../homepage/homepage";
import ShopPage from "../shopPage/shopPage";
import AuthPage from "../authPage/authPage";
import Header from "../../components/header/header";

import {
  firebaseAuth,
  saveUserIfNotExists,
  getUserByID
} from "../../utils/firebase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  // used to prevent fetching user data from database on signup
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (userAuth) => {
      try {
        if (
          userAuth &&
          userAuth.providerData[0].providerId.includes("google")
        ) {
          const user = {
            id: userAuth.uid,
            name: userAuth.displayName,
            email: userAuth.email
          };

          setCurrentUser(await saveUserIfNotExists(user));
        } else if (userAuth && !isSignUp) {
          // fetch user details from database
          // incase of user login with email/password
          setCurrentUser(await getUserByID(userAuth.uid));
        }
      } catch (error) {
        console.log(error.message);
      }
    });

    return () => unsubscribe();
  }, [isSignUp]);

  const signOut = () => {
    firebaseAuth.signOut();
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <AuthContextProvider
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        signOut={signOut}
        setIsSignUp={setIsSignUp}
      >
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/shop" exact component={ShopPage} />
        <Route path="/auth" exact component={AuthPage} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
