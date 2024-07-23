import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Logo.module.scss';
import logo from '../assets/images/logo.png';

const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>
      <div className={styles.logo__image}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.logo__text}>
        <p className={styles.logo__title}>Буль-бульдог</p>
        <p className={styles.logo__subtitle}>быстрый поиск собаки для вязки</p>
      </div>
    </Link>
  );
};

export default Logo;