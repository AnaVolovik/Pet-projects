import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Topbar from './components/Topbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import ScrollToHashElement from './components/ScrollToHashElement';

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const handleRegister = (data) => {
    setUser({
      userId: data.userId,
      name: data.name,
      email: data.email,
      city: data.city,
      phone: data.phone
    });
  };

  const handleLogin = (data) => {
    setUser({
      userId: data.userId,
      name: data.name,
      email: data.email,
      city: data.city,
      phone: data.phone
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleProfile = (profileData) => {
    setProfile(profileData);
  };

  return (
    <Router>
      <ScrollToHashElement />
      <div className="wrapper">
        <Topbar user={user} onLogout={handleLogout} />
        <Header />
        <div className="main">
          <Main onRegister={handleRegister} onLogin={handleLogin} user={user} profile={profile} onProfileChange={handleProfile} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;