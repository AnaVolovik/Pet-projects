import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/MainBanner.module.scss';

const MainBanner = () => {
  return (
    <section className={styles.banner}>
      <div className={classNames(styles.bunner__container, '_container')}>
        <div className={styles.banner__content}>
          <h1 className={styles.banner__title}>
            Поиск собаки<br/>на раз–два–три!
          </h1>
          <div className={styles.banner__buttons}>
            <Link to="/search-dog" className={classNames(styles.banner__link, styles.orangeBtn)}>Найти собаку</Link>
            <Link to="/add-dog" className={classNames(styles.banner__link, styles.blackBtn)}>Добавить анкету</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBanner;