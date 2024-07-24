import React from 'react';
//import DogItem from './DogItem';
import styles from '../styles/DogList.module.scss';

const DogList = () => {
  const dogs = [
    { id: 1, name: 'Rex', breed: 'Labrador', age: 3 },
    { id: 2, name: 'Bella', breed: 'German Shepherd', age: 4 },
    // Сделать вывод данных из БД
  ];

  return (
    <div className={styles.dogList}>
      {/* {dogs.map((dog) => (
        <DogItem key={dog.id} dog={dog} />
      ))} */}
    </div>
  );
};

export default DogList;