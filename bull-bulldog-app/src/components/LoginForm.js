import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/LoginForm.module.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Форма логина отправлена:', { email, password });
      setEmail('');
      setPassword('');
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

    if (!email) errors.email = 'E-mail обязателен';
    else if (!emailRegex.test(email)) errors.email = 'Неверный формат E-mail';

    if (!password) errors.password = 'Пароль обязателен';
    else if (!passwordRegex.test(password)) errors.password = 'Пароль должен содержать латинские буквы и цифры, и быть длиной не менее 6 символов';
    
    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <div className={styles.loginForm__group}>
        <label className={styles.loginForm__label} htmlFor="email">E-mail*</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? styles.errorInput : ''}
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>

      <div className={styles.loginForm__group}>
        <label className={styles.loginForm__label} htmlFor="password">Пароль*</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={errors.password ? styles.errorInput : ''}
        />
        {errors.password && <span className={styles.errorText}>{errors.password}</span>}
      </div>

      <button type="submit" className={styles.loginForm__button}>Войти</button>
      <Link to="/register" className={styles.loginForm__registerLink}>Регистрация</Link>
    </form>
  );
};

export default LoginForm;