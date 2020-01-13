import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from '../homepage/homepage';
import ShopPage from '../shopPage/shopPage';
import AuthPage from '../authPage/authPage';
import Header from '../../components/header/header';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Route path="/" exact component={HomePage}/>
      <Route path="/shop" exact component={ShopPage}/>
      <Route path="/auth" exact component={AuthPage}/>
    </BrowserRouter>
  );
}

export default App;
