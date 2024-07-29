import React from 'react';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/AccountPage.module.scss';

const AccountMenu = ({ user }) => (
  <nav className={styles.account__menu}>
    <Link to={`/account/${user?.userId}/my-data`} className={styles.account__item}>Мои данные</Link>
    <Link to={`/account/${user?.userId}/my-dogs`} className={styles.account__item}>Мои анкеты</Link>
    <Link to={`/account/${user?.userId}/favourites`} className={styles.account__item}>Избранное</Link>
  </nav>
);

const AccountPage = ({ user }) => {
  return (
    <section className={styles.account}>
      <div className={classNames(styles.account__container, '_container')}>
        <div className={styles.account__content}>
          <h2 className={classNames(styles.account__title, 'h2')}>Личный кабинет</h2>
          <div className={styles.account__body}>
            <AccountMenu user={user} />
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;