import React, { useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import HomePage from "../homepage/homepage";
import ShopPage from "../shopPage/shopPage";
import AuthPage from "../authPage/authPage";
import Header from "../../components/header/header";
import CheckoutPage from "../checkoutPage/checkoutPage";

import { checkUserSession } from "../../redux/actions/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/auth" component={AuthPage} />
      <Route exact path="/checkout" component={CheckoutPage} />
      <Route path="/shop" component={ShopPage} />
    </BrowserRouter>
  );
}

export default App;
