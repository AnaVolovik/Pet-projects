import React, { useState, useEffect } from 'react';
import MainBanner from '../components/MainBanner';
import FiltersElement from '../components/FiltersElement';
import SearchForm from '../components/SearchForm';
import DogList from '../components/DogList';
import Pagination from '../components/Pagination';
import classNames from 'classnames';
import styles from '../styles/HomePage.module.scss';

const HomePage = ({ setDogs }) => {
  const [dogsData, setDogsData] = useState([]);
  const [formActive, setFormActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(12);

  const toggleFormActive = () => {
    setFormActive(!formActive);
  };

  const closeForm = () => {
    setFormActive(false);
  };

  const fetchDogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dogs');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDogsData(data);
      setDogs(data);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, [setDogs]);

  const handleSearch = async (data) => {
    if (Array.isArray(data)) {
      setDogsData(data);
      setDogs(data);
    } else {
      console.error('Invalid search data:', data);
    }
  };

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = dogsData.slice(indexOfFirstDog, indexOfLastDog);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <MainBanner />
      <section className={styles.homePage}>
        <SearchForm 
          onSearch={handleSearch} 
          active={formActive} 
          onClose={closeForm} 
          onReset={fetchDogs}
        />
        <div className={classNames(styles.homePage__container, '_container')}>
          <FiltersElement onOpenForm={toggleFormActive} />
          <div id="search-form" className={styles.homePage__content}>
            <h2 className={classNames(styles.homePage__title, 'h2')}>Найти собаку для вязки</h2>
            <div className={styles.homePage__body}>
              <DogList dogs={currentDogs} />
              <Pagination 
                dogsPerPage={dogsPerPage} 
                totalDogs={dogsData.length} 
                paginate={paginate} 
                currentPage={currentPage} 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
