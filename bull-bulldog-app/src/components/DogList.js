import React from 'react';
import Card from './Card';
import styles from '../styles/DogList.module.scss';

const DogList = ({ dogs = [] }) => {
  return (
    <div className={styles.dogList}>
      {dogs.length > 0 ? (
        dogs.map(dog => {
          const owner = {
            city: dog.owner_city,
            email: dog.owner_email,
            name: dog.owner_name,
            phone: dog.owner_phone,
          };
          return (
            <Card
              key={dog.id_dog}
              dog={dog}
              user={owner}
            />
          );
        })
      ) : (
        <p>Нет данных для отображения.</p>
      )}
    </div>
  );
};

export default DogList;
