import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/Topbar.module.scss';

const Topbar = () => {
  return (
    <div className={styles.topbar}>
      <div className={classNames(styles.topbar__container, '_container')}>
        <div className={styles.topbar__content}>
          <nav className={styles.topbar__menu}>
            <Link to="/login" className={styles.topbar__item}>Вход</Link>
            <Link to="/register" className={styles.topbar__item}>Регистрация</Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Topbar;