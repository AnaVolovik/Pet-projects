import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/Topbar.module.scss';

const Topbar = ({ user, onLogout }) => {
  return (
    <div className={styles.topbar}>
      <div className={classNames(styles.topbar__container, '_container')}>
        <div className={styles.topbar__content}>
          <nav className={styles.topbar__menu}>
            {user ? (
              <>
                <span className={styles.topbar__item}>Привет, {user.name}!</span>
                <button className={styles.topbar__item} onClick={onLogout}>Выйти</button>
              </>
            ) : (
              <>
                <Link to="/register" className={styles.topbar__item}>Регистрация</Link>
                <Link to="/login" className={styles.topbar__item}>Вход</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Topbar;