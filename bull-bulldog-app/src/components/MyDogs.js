import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/MyDogs.module.scss';

const MyDogs = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    // Загрузка данных о собаках из API или базы данных
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    // Пример получения данных из API
    const response = await fetch('/api/dogs');
    const data = await response.json();
    setDogs(data);
  };

  const handleDelete = async (id) => {
    // Пример запроса на удаление данных из API
    await fetch(`/api/dogs/${id}`, {
      method: 'DELETE',
    });
    // Обновление списка после удаления
    setDogs(dogs.filter(dog => dog.id !== id));
  };

  return (
    <div className={styles.myDogs}>
      <h2 className={styles.myDogs__title}>Мои анкеты</h2>
      <div className={styles.myDogs__list}>
        {dogs.map(dog => (
          <div key={dog.id} className={styles.myDogs__card}>
            <h3 className={styles.myDogs__name}>{dog.name}</h3>
            <div className={styles.myDogs__actions}>
              <Link to={`/account/my-dogs/edit/${dog.id}`} className={styles.myDogs__edit}>Изменить</Link>
              <button onClick={() => handleDelete(dog.id)} className={styles.myDogs__delete}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDogs;
