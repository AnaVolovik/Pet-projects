import React from 'react';
import { Link } from 'react-router-dom';
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
            <a href="/#search-form" className={styles.header__item}>Найти собаку</a>
            <Link to="/add-dog" className={styles.header__item}>Добавить анкету</Link>
            <Link to="/contact" className={styles.header__item}>Контакты</Link>
            <Link to="/account" className={styles.header__item}>Личный кабинет</Link>
          </nav>
        </div>
      </div>
      
    </header>
  );
};

export default Header;