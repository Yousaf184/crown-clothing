import React, { useState, useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import AuthContextProvider from "../../contexts/authContext";

import HomePage from "../homepage/homepage";
import ShopPage from "../shopPage/shopPage";
import AuthPage from "../authPage/authPage";
import Header from "../../components/header/header";

import { firebaseAuth, saveUserIfNotExists } from "../../utils/firebase";

let unsubscribeFromSnapshot;

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (userAuth) => {
      try {
        if (userAuth) {
          // get the user document reference object
          const userDocRef = await saveUserIfNotExists({ id: userAuth.uid });
          // called whenever the document reference object (userDocRef) updates
          unsubscribeFromSnapshot = userDocRef.onSnapshot((userDocSnapshot) => {
            setCurrentUser(userDocSnapshot.data());
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = () => {
    unsubscribeFromSnapshot();
    firebaseAuth.signOut();
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <AuthContextProvider
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        signOut={signOut}
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
