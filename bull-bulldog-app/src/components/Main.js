import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import AccountPage from '../pages/AccountPage';
import AddDogPage from '../pages/AddDogPage';
import ContactPage from '../pages/ContactPage';
import DogProfilePage from '../pages/DogProfilePage';
import MyData from '../components/MyData';
import MyDogs from '../components/MyDogs';
import Favourites from '../components/Favourites';
import EditMyData from '../components/EditMyData';
import EditMyDog from '../components/EditMyDog';
import NotFoundPage from '../pages/NotFoundPage';
import Breadcrumbs from './Breadcrumbs';

const Main = ({ onRegister, user, onLogin, onProfileChange, setUser }) => {
  const [dogs, setDogs] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const handleProfileChange = (newDog) => {
    setDogs(prevDogs => {
      const updatedDogs = [...prevDogs, newDog];
      return updatedDogs;
    });
  };

  return (
    <main>
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<HomePage key="home" setDogs={setDogs} />} />
        <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
        <Route path="/register" element={<RegistrationPage onRegister={onRegister} />} />
        <Route path="/account/" element={<AccountPage user={user} setUser={setUser} onProfileChange={handleProfileChange}/>}>
          {user?.userId && <Route index element={<Navigate to={`/account/${user.userId}/my-data`} />} />}
          <Route path=":userId/my-data" element={<MyData user={user} />} />
          <Route path=":userId/my-dogs" element={<MyDogs user={user} onProfileChange={handleProfileChange}/>} />
          <Route path=":userId/favourites" element={<Favourites user={user} setFavourites={setFavourites} />} />
          <Route path=":userId/edit-my-data" element={<EditMyData user={user} setUser={setUser} />} />
          <Route path=":userId/edit-my-dog/:dogId" element={<EditMyDog user={user} onProfileChange={handleProfileChange}/>} />
        </Route>
        <Route path="/add-dog" element={<AddDogPage user={user} onProfileChange={handleProfileChange} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/dog/:id" element={<DogProfilePage dogs={dogs} user={user} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
};

export default Main;
