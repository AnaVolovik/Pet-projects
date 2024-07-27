import React, { useState } from 'react';
import styles from '../styles/ContactForm.module.scss';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        });
        
        if (!response.ok) {
          throw new Error('Ошибка при отправке сообщения');
        }

        const result = await response.json();
        console.log('Форма отправлена:', result);
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
        setSuccessMessage('Сообщение отправлено');
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        setErrors({ form: 'Ошибка при отправке формы, попробуйте еще раз' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[А-Яа-яЁё\s]+$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
    const messageRegex = /^[А-Яа-яЁё\s.,!?'"()-]*$/;

    if (!name) errors.name = 'Имя обязательно';
    else if (!nameRegex.test(name)) errors.name = 'Имя должно содержать только русские буквы и пробелы';

    if (!email) errors.email = 'E-mail обязателен';
    else if (!emailRegex.test(email)) errors.email = 'Неверный формат E-mail';

    if (!message) errors.message = 'Сообщение обязательно';
    else if (!messageRegex.test(message)) errors.message = 'Сообщение должно содержать только русские буквы и допустимые символы';

    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      {errors.form && <p className={styles.errorMessage}>{errors.form}</p>}

      <div className={styles.contactForm__group}>
        <label className={styles.contactForm__label} htmlFor="name">Имя*</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? styles.errorInput : ''}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.contactForm__group}>
        <label className={styles.contactForm__label} htmlFor="email">E-mail для ответа*</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? styles.errorInput : ''}
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>

      <div className={styles.contactForm__group}>
        <label className={styles.contactForm__label} htmlFor="message">Текст сообщения*</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={errors.message ? styles.errorInput : ''}
        />
        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
      </div>

      <button type="submit" className={styles.contactForm__button}>Отправить</button>
    </form>
  );
};

export default ContactForm;
