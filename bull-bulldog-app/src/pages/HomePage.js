import React from 'react';
import MainBanner from '../components/MainBanner';
import SearchForm from '../components/SearchForm';
import DogList from '../components/DogList';
import classNames from 'classnames';
import styles from '../styles/HomePage.module.scss';

const HomePage = () => {
  return (
    <div>
      <MainBanner />
      <section className={styles.homePage}>
        <div className={classNames(styles.homePage__container, '_container')}>
          <div id="search-form" className={styles.homePage__content}>
            <h2 className={classNames(styles.homePage__title, 'h2')}>Найти собаку для вязки</h2>
            <div className={styles.homePage__body}>
              <SearchForm />
              <DogList />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;