import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import AccountPage from '../pages/AccountPage';
import AddDogPage from '../pages/AddDogPage';
import ContactPage from '../pages/ContactPage';
import MyData from '../components/MyData';
import MyDogs from '../components/MyDogs';
import Favourites from '../components/Favourites';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/account/*" element={<AccountPage />}>
          <Route index element={<MyData />} />
          <Route path="my-data" element={<MyData />} />
          <Route path="my-dogs" element={<MyDogs />} />
          <Route path="favourites" element={<Favourites />} />
        </Route>
        <Route path="/add-dog" element={<AddDogPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </main>
  );
};

export default Main;