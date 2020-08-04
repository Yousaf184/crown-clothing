import React, { useEffect, Suspense } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import MyErrorBoundary from "../../components/error-boundary/errorBoundary";
import Header from "../../components/header/header";
import Spinner from "../../components/spinner/spinner";

import { checkUserSession } from "../../redux/actions/user";

const HomePage = React.lazy(() => import("../homepage/homepage"));
const ShopPage = React.lazy(() => import("../shopPage/shopPage"));
const AuthPage = React.lazy(() => import("../authPage/authPage"));
const CheckoutPage = React.lazy(() => import("../checkoutPage/checkoutPage"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <MyErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/auth" component={AuthPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route path="/shop" component={ShopPage} />
        </Suspense>
      </MyErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
