import React from 'react';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__rights}>
        &copy; {new Date().getFullYear()} Буль-бульдог. All rights reserved.</p>
      <p className={styles.footer__rights}>Developed by Anastasia Volovik</p>
    </footer>
  );
};

export default Footer;