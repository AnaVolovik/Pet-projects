import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Topbar from './components/Topbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Topbar />
        <Header />
        <div className="main">
          <Main />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;