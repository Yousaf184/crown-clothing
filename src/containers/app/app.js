import React, { useState, useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import AuthContextProvider from "../../contexts/authContext";

import HomePage from "../homepage/homepage";
import ShopPage from "../shopPage/shopPage";
import AuthPage from "../authPage/authPage";
import Header from "../../components/header/header";

import { firebaseAuth, saveUserIfNotExists } from "../../utils/firebase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = firebaseAuth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const user = {
          id: userAuth.uid,
          name: userAuth.displayName,
          email: userAuth.email
        };

        setCurrentUser(user);
        saveUserIfNotExists(user);
      }
    });

    return () => unsubscribeFromAuth();
  }, []);

  const signOut = () => {
    firebaseAuth.signOut();
    setCurrentUser(null);
  };

  return (
    <AuthContextProvider
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      signOut={signOut}
    >
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/shop" exact component={ShopPage} />
        <Route path="/auth" exact component={AuthPage} />
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
