import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/RegistrationForm.module.scss';

const RegistrationForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cities');
        const data = await response.json();
        setCities(data.cities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, city, phone, password }),
        });
        const data = await response.json();
        if (response.ok) {
          onRegister(data);
          setName('');
          setEmail('');
          setCity('');
          setPhone('');
          setPassword('');
          setConfirmPassword('');
          navigate('/');
        } else {
          setErrors({ server: data.message });
        }
      } catch (error) {
        setErrors({ server: 'Ошибка сервера. Попробуйте позже.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[А-Яа-яЁё\s-]+$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
    const phoneRegex = /^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$/;

    if (!name) errors.name = 'Имя обязательно';
    else if (!nameRegex.test(name)) errors.name = 'Имя может содержать только кириллицу, пробелы и дефисы';
    if (!email) errors.email = 'E-mail обязателен';
    else if (!emailRegex.test(email)) errors.email = 'Неверный формат E-mail';
    if (!city) errors.city = 'Выберите город';
    if (!phone) errors.phone = 'Номер телефона обязателен';
    else if (!phoneRegex.test(phone)) errors.phone = 'Неверный формат номера телефона';
    if (!password) errors.password = 'Пароль обязателен';
    if (!confirmPassword) errors.confirmPassword = 'Повторите пароль';
    else if (password !== confirmPassword) errors.confirmPassword = 'Пароли не совпадают';

    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registrationForm}>
      <div className={styles.registrationForm__group}>
        <label className={styles.registrationForm__label} htmlFor="name">Имя*</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? styles.errorInput : ''}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.registrationForm__group}>
        <label className={styles.registrationForm__label} htmlFor="email">E-mail*</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? styles.errorInput : ''}
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>

      <div className={styles.registrationForm__group}>
        <label className={styles.registrationForm__label} htmlFor="city">Город*</label>
        <select
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={errors.city ? styles.errorInput : ''}
        >
          <option value="">Выберите город</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <span className={styles.errorText}>{errors.city}</span>}
      </div>

      <div className={styles.registrationForm__group}>
        <label className={styles.registrationForm__label} htmlFor="phone">Номер телефона* (формат ввода +375(00)000-00-00)</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={errors.phone ? styles.errorInput : ''}
        />
        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
      </div>

      <div className={styles.registrationForm__group}>
        <label className={styles.registrationForm__label} htmlFor="password">Пароль*</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? styles.errorInput : ''}
        />
        {errors.password && <span className={styles.errorText}>{errors.password}</span>}
      </div>

      <div className={styles.registrationForm__group}>
        <label className={styles.registrationForm__label} htmlFor="confirmPassword">Повторите пароль*</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={errors.confirmPassword ? styles.errorInput : ''}
        />
        {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
      </div>

      <button type="submit" className={styles.registrationForm__button}>Зарегистрироваться</button>
      <Link to="/login" className={styles.registrationForm__registerLink}>Вход</Link>
      {errors.server && <div className={styles.errorText}>{errors.server}</div>}
    </form>
  );
};

export default RegistrationForm;