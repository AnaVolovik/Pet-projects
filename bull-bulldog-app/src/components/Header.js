import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      {/* logo */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/account">Account</Link>
        <Link to="/add-dog">Add Dog</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;