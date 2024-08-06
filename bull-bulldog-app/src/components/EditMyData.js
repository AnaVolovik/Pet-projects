import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/EditMyData.module.scss';

const EditMyData = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useOutletContext();
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    phone: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        city: user.city,
        phone: user.phone,
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cities');
        if (response.ok) {
          const data = await response.json();
          setCities(data.cities);
        } else {
          throw new Error('Ошибка при загрузке списка городов');
        }
      } catch (err) {
        console.error('Error fetching cities:', err);
      }
    };
    fetchCities();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/user/update/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при обновлении данных');
      }
  
      const updatedUser = await response.json();
  
      if (typeof setUser === 'function') {
        setUser(updatedUser);
      } else {
        console.error('setUser is not a function');
      }
  
      navigate(`/account/${updatedUser.userId}/my-data`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.editMyData}>
      <h3 className={styles.editMyData__title}>Редактирование данных</h3>
      {error && <p className={styles.error}>Ошибка: {error}</p>}
      <form onSubmit={handleSubmit} className={styles.editMyData__form}>
        <div className={styles.editMyData__group}>
          <label className={styles.editMyData__label} htmlFor="name">Имя:</label>
          <input
            className={styles.editMyData__input}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.editMyData__group}>
          <label className={styles.editMyData__label} htmlFor="email">E-mail:</label>
          <input
            className={styles.editMyData__input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.editMyData__group}>
          <label className={styles.editMyData__label} htmlFor="city">Город:</label>
          <select
            className={styles.editMyData__select}
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          >
            <option value="">Выберите город</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.editMyData__group}>
          <label className={styles.editMyData__label} htmlFor="phone">Номер телефона:</label>
          <input
            className={styles.editMyData__input}
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles.editMyData__buttons}>
          <button type="submit" className={styles.editMyData__button}>Сохранить</button>
          <button
            type="button"
            className={classNames(styles.editMyData__button, styles.editMyData__cancel)}
            onClick={() => navigate(`/account/${userId}/my-data`)}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMyData;
