import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/Header.module.scss';
import Logo from './Logo';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={classNames(styles.header__container, '_container')}>
        <div className={styles.header__content}>
          <Logo />
          <nav className={styles.header__menu}>
            <NavLink 
              to="/#search-form" 
              className={({ isActive }) => isActive ? classNames(styles.header__item, styles.active) : styles.header__item}
            >
              Найти собаку
            </NavLink>
            <NavLink 
              to="/add-dog" 
              className={({ isActive }) => isActive ? classNames(styles.header__item, styles.active) : styles.header__item}
            >
              Добавить анкету
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? classNames(styles.header__item, styles.active) : styles.header__item}
            >
              Контакты
            </NavLink>
            <NavLink 
              to="/account" 
              className={({ isActive }) => isActive ? classNames(styles.header__item, styles.active) : styles.header__item}
            >
              Личный кабинет
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;