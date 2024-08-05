import React from 'react';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__rights}>
        &copy; {new Date().getFullYear()} Буль-бульдог. Developed by Anastasia Volovik. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;