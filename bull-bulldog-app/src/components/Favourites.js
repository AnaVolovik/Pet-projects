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

  return (
    <div className={styles.favourites}>
      {error && <p className={styles.error}>{error}</p>}
      {Array.isArray(favouriteDogs) && favouriteDogs.length > 0 ? (
        favouriteDogs.map(dog => (
          <Card key={dog.id_dog} dog={dog} user={user} />
        ))
      ) : (
        <p>Нет данных для отображения.</p>
      )}
    </div>
  );
};

export default Favourites;
