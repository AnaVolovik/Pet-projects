import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/MyData.module.scss';

const MyData = () => {
  // Эти данные будут браться из базы данных
  const userData = {
    name: 'Ваше имя',
    email: 'example@example.com',
    city: 'Ваш город',
    phone: '+375(00)000-00-00'
  };

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