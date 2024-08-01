import React, { useEffect, useState } from 'react';
import Card from './Card';
import styles from '../styles/Favourites.module.scss';

const Favourites = ({ user, setFavourites }) => {
  const [favouriteDogs, setFavouriteDogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/favourites/${user.userId}`);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке избранных анкет');
        }
        const data = await response.json();
        setFavouriteDogs(data);
        setFavourites(data);
      } catch (error) {
        console.error('Ошибка при загрузке избранных анкет:', error);
        setError(error.message);
      }
    };

    if (user) {
      fetchFavourites();
    }
  }, [user, setFavourites]);

  const handleDelete = async (id_dog) => {
    try {
      const response = await fetch(`http://localhost:5000/api/liked_adds/${id_dog}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'User-ID': user.userId
        }
      });
      if (!response.ok) {
        throw new Error('Ошибка при удалении из избранного');
      }
      // Убираем удаленную собаку из состояния
      setFavouriteDogs(prevDogs => prevDogs.filter(dog => dog.id_dog !== id_dog));
      setFavourites(prevDogs => prevDogs.filter(dog => dog.id_dog !== id_dog));
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
      setError(error.message);
    }
  };

  return (
    <div className={styles.favourites}>
      {error && <p className={styles.error}>{error}</p>}
      {Array.isArray(favouriteDogs) && favouriteDogs.length > 0 ? (
        favouriteDogs.map(dog => (
          <Card key={dog.id_dog} dog={dog} user={user} onDelete={() => handleDelete(dog.id_dog)} />
        ))
      ) : (
        <p className={styles.favourites__message}>Нет избранных анкет</p>
      )}
    </div>
  );
};

export default Favourites;
