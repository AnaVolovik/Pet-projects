import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Topbar from './components/Topbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  const [user, setUser] = useState(null);

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="wrapper">
        <Topbar user={user} onLogout={handleLogout} />
        <Header />
        <div className="main">
          <Main onRegister={handleRegister} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
