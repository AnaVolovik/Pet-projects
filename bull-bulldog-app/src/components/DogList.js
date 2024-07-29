import React from 'react';
import Card from './Card';
import styles from '../styles/DogList.module.scss';

const DogList = ({ dogs = [] }) => {
  return (
    <div className={styles.dogList}>
      {dogs.length > 0 ? (
        dogs.map(dog => (
          <Card
            key={dog.id_dog}
            dog={dog}
            user={{
              city: dog.owner_city,
            }}
          />
        ))
      ) : (
        <p>Нет данных для отображения.</p>
      )}
    </div>
  );
};

export default DogList;
