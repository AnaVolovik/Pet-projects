import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/AccountPage.module.scss';

const AccountMenu = ({ user }) => (
  <nav className={styles.account__menu}>
    <NavLink
      to={`/account/${user?.userId}/my-data`}
      className={({ isActive }) => isActive ? classNames(styles.account__item, styles.active) : styles.account__item}
    >
      Мои данные
    </NavLink>
    <NavLink
      to={`/account/${user?.userId}/my-dogs`}
      className={({ isActive }) => isActive ? classNames(styles.account__item, styles.active) : styles.account__item}
    >
      Мои анкеты
    </NavLink>
    <NavLink
      to={`/account/${user?.userId}/favourites`}
      className={({ isActive }) => isActive ? classNames(styles.account__item, styles.active) : styles.account__item}
    >
      Избранное
    </NavLink>
  </nav>
);

const AccountPage = ({ user }) => {
  return (
    <section className={styles.account}>
      <div className={classNames(styles.account__container, '_container')}>
        <div className={styles.account__content}>
          <h2 className={classNames(styles.account__title, 'h2')}>Личный кабинет</h2>
          <div className={styles.account__body}>
            {user ? (
              <>
                <AccountMenu user={user} />
                <Outlet />
              </>
            ) : (
              <p className={styles.account__message}>Необходимо авторизоваться, чтобы получить доступ к личному кабинету.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
