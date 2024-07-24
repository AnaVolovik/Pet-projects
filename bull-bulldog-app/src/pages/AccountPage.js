import React from 'react';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/AccountPage.module.scss';

const AccountMenu = () => (
  <nav className={styles.account__menu}>
    <Link to="my-data" className={styles.account__item}>Мои данные</Link>
    <Link to="my-dogs" className={styles.account__item}>Мои анкеты</Link>
    <Link to="favourites" className={styles.account__item}>Избранное</Link>
  </nav>
);

const AccountPage = () => {
  return (
    <section className={styles.account}>
      <div className={classNames(styles.account__container, '_container')}>
        <div className={styles.account__content}>
          <h2 className={classNames(styles.account__title, 'h2')}>Личный кабинет</h2>
          <div className={styles.account__body}>
            <AccountMenu />
            <div className={styles.account__dataDisplay}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;