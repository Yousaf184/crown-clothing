import React, { useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import HomePage from "../homepage/homepage";
import ShopPage from "../shopPage/shopPage";
import AuthPage from "../authPage/authPage";
import Header from "../../components/header/header";

import { firebaseAuth, saveUserIfNotExists } from "../../utils/firebase";

import { setUser } from "../../redux/actions/user";

let unsubscribeFromSnapshot;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (userAuth) => {
      try {
        if (userAuth) {
          // get the user document reference object
          const userDocRef = await saveUserIfNotExists({ id: userAuth.uid });
          // called whenever the document reference object (userDocRef) updates
          unsubscribeFromSnapshot = userDocRef.onSnapshot((userDocSnapshot) => {
            dispatch(setUser(userDocSnapshot.data()));
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const signOut = () => {
    unsubscribeFromSnapshot();
    firebaseAuth.signOut();
    dispatch(setUser(null));
  };

  return (
    <BrowserRouter>
      <Header signOut={signOut} />
      <Route path="/" exact component={HomePage} />
      <Route path="/shop" exact component={ShopPage} />
      <Route path="/auth" exact component={AuthPage} />
    </BrowserRouter>
  );
}

export default App;
