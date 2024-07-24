import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Favourites.module.scss';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    // Загрузка избранных данных из API или базы данных
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    // Пример получения данных из API
    const response = await fetch('/api/favourites');
    const data = await response.json();
    setFavourites(data);
  };

  const handleRemove = async (id) => {
    // Пример запроса на удаление из избранного в API
    await fetch(`/api/favourites/${id}`, {
      method: 'DELETE',
    });
    // Обновление списка после удаления
    setFavourites(favourites.filter(fav => fav.id !== id));
  };

  return (
    <div className={styles.favourites}>
      <h2 className={styles.favourites__title}>Избранное</h2>
      <div className={styles.favourites__list}>
        {favourites.map(dog => (
          <div key={dog.id} className={styles.favourites__card}>
            <h3 className={styles.favourites__name}>{dog.name}</h3>
            <div className={styles.favourites__actions}>
              <Link to={`/dogs/${dog.id}`} className={styles.favourites__view}>Посмотреть</Link>
              <button onClick={() => handleRemove(dog.id)} className={styles.favourites__remove}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;