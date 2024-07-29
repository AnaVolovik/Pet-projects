import React, { useEffect, useState } from 'react';
import Card from './Card';
import styles from '../styles/MyDogs.module.scss';

const MyDogs = ({ user }) => {
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/dogs/${user.userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          setDogs(data);
        } else {
          setError('Unexpected data format');
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        setError(error.message);
      }
    };

    fetchDogs();
  }, [user.userId]);

  return (
    <div className={styles.myDogs}>
      {error && <p className={styles.error}>{error}</p>}
      {Array.isArray(dogs) && dogs.length > 0 ? (
        dogs.map(dog => (
          <Card key={dog.id_dog} dog={dog} user={user} />
        ))
      ) : (
        <p>Нет данных для отображения.</p>
      )}
    </div>
  );
};

export default MyDogs;
