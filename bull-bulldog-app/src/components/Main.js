import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import AccountPage from '../pages/AccountPage';
import AddDogPage from '../pages/AddDogPage';
import ContactPage from '../pages/ContactPage';
import MyData from '../components/MyData';
import MyDogs from '../components/MyDogs';
import Favourites from '../components/Favourites';

const Main = ({ onRegister, user, onLogin }) => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
        <Route path="/register" element={<RegistrationPage onRegister={onRegister} />} />
        <Route path="/account/" element={<AccountPage user={user} />}>
          {user?.userId && <Route index element={<Navigate to={`/account/${user.userId}/my-data`} />} />}
          <Route path=":userId/my-data" element={<MyData />} />
          <Route path=":userId/my-dogs" element={<MyDogs />} />
          <Route path=":userId/favourites" element={<Favourites />} />
        </Route>
        <Route path="/add-dog" element={<AddDogPage user={user} />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </main>
  );
};

export default Main;