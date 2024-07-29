import React, { useState, useEffect } from 'react';
import MainBanner from '../components/MainBanner';
import SearchForm from '../components/SearchForm';
import DogList from '../components/DogList';
import classNames from 'classnames';
import styles from '../styles/HomePage.module.scss';

const HomePage = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dogs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDogs(data);
      } catch (error) {
        console.error('Error fetching dogs:', error);
      }
    };

    fetchDogs();
  }, []);

  return (
    <div>
      <MainBanner />
      <section className={styles.homePage}>
        <div className={classNames(styles.homePage__container, '_container')}>
          <div id="search-form" className={styles.homePage__content}>
            <h2 className={classNames(styles.homePage__title, 'h2')}>Найти собаку для вязки</h2>
            <div className={styles.homePage__body}>
              <SearchForm onSearch={setDogs} />
              <DogList dogs={dogs} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
