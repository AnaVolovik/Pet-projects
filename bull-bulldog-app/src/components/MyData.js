import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/MyData.module.scss';

const MyData = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/data/${userId}`);
        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  if (!userData) {
    return <p>Данные не найдены</p>;
  }

  return (
    <div className={styles.myData}>
      <div className={styles.myData__name}>
        <p className={styles.myData__title}>Имя:</p>
        <p className={styles.myData__value}>{userData.name}</p>
      </div>
      <div className={styles.myData__email}>
        <p className={styles.myData__title}>E-mail:</p>
        <p className={styles.myData__value}>{userData.email}</p>
      </div>
      <div className={styles.myData__city}>
        <p className={styles.myData__title}>Город:</p>
        <p className={styles.myData__value}>{userData.city}</p>
      </div>
      <div className={styles.myData__phone}>
        <p className={styles.myData__title}>Номер телефона:</p>
        <p className={styles.myData__value}>{userData.phone}</p>
      </div>
      <div className={styles.myData__actions}>
        <Link to="/edit" className={styles.myData__link}>Изменить данные</Link>
        <Link to="/delete" className={styles.myData__link}>Удалить аккаунт</Link>
      </div>
    </div>
  );
};

export default MyData;