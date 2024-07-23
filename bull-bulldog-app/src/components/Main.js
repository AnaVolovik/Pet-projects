import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
// import LoginPage from '../pages/LoginPage';
// import RegistrationPage from '../pages/RegistrationPage';
// import AccountPage from '../pages/AccountPage';
// import AddDogPage from '../pages/AddDogPage';
// import ContactPage from '../pages/ContactPage';

const Main = () => {
  return (
    <main>
      <HomePage />
      {/* <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/add-dog" component={AddDogPage} />
        <Route path="/contact" component={ContactPage} />
      </Switch> */}
    </main>
  );
};

export default Main;