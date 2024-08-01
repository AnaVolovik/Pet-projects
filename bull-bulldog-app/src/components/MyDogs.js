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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'User-ID': user.userId
        }
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении');
      }
      const data = await response.json();
      // Обновляем состояние с новыми данными
      setDogs(data.remainingDogs);
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      setError(error.message);
    }
  };

  return (
    <div className={styles.myDogs}>
      {error && <p className={styles.error}>{error}</p>}
      {Array.isArray(dogs) && dogs.length > 0 ? (
        dogs.map(dog => (
          <Card key={dog.id_dog} dog={dog} user={user} onDelete={handleDelete} />
        ))
      ) : (
        <p className={styles.myDogs__message}>У вас пока нет добавленных анкет</p>
      )}
    </div>
  );
};

export default MyDogs;
