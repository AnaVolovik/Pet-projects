import React, { useState } from 'react';
import styles from '../styles/SearchDogForm.module.scss';

const SearchForm = () => {
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Кобель');
  const [color, setColor] = useState('');
  const [city, setCity] = useState('');
  const [pedigree, setPedigree] = useState(true);
  const [withPhoto, setWithPhoto] = useState(true);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Форма поиска собак отправлена:', { breed, age, gender, color, city, pedigree, withPhoto });
      setBreed('');
      setAge('');
      setGender('Кобель');
      setColor('');
      setCity('');
      setPedigree(true);
      setWithPhoto(true);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (isNaN(age) || age < 0) errors.age = 'Введите корректный возраст';
    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchDogForm}>
      <div className={styles.searchDogForm__group}>
        <label className={styles.searchDogForm__label} htmlFor="breed">Порода</label>
        <input
          type="text"
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className={errors.breed ? styles.errorInput : ''}
        />
        {errors.breed && <span className={styles.errorText}>{errors.breed}</span>}
      </div>

      <div className={styles.searchDogForm__group}>
        <label className={styles.searchDogForm__label} htmlFor="age">Возраст</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="1"
          max="20"
          className={errors.age ? styles.errorInput : ''}
        />
        {errors.age && <span className={styles.errorText}>{errors.age}</span>}
      </div>

      <div className={styles.searchDogForm__group}>
        <label className={styles.searchDogForm__label} htmlFor="gender">Пол</label>
        <div className={styles.searchDogForm__radioBtns}>
          <label className={styles.searchDogForm__radioLabel}>
            <input
              type="radio"
              value="Кобель"
              checked={gender === 'Кобель'}
              onChange={(e) => setGender(e.target.value)}
            />
            Кобель
          </label>
          <label className={styles.searchDogForm__radioLabel}>
            <input
              type="radio"
              value="Сука"
              checked={gender === 'Сука'}
              onChange={(e) => setGender(e.target.value)}
            />
            Сука
          </label>
        </div>
        {errors.gender && <span className={styles.errorText}>{errors.gender}</span>}
      </div>

      <div className={styles.searchDogForm__group}>
        <label className={styles.searchDogForm__label} htmlFor="color">Окрас</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={errors.color ? styles.errorInput : ''}
        />
        {errors.color && <span className={styles.errorText}>{errors.color}</span>}
      </div>

      <div className={styles.searchDogForm__group}>
        <label className={styles.searchDogForm__label} htmlFor="city">Город</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={errors.city ? styles.errorInput : ''}
        />
        {errors.city && <span className={styles.errorText}>{errors.city}</span>}
      </div>

      <div className={styles.searchDogForm__group}>
        <label className={styles.searchDogForm__label}>Наличие родословной</label>
        <div className={styles.searchDogForm__radioBtns}>
          <label className={styles.searchDogForm__radioLabel}>
            <input
              type="radio"
              value="true"
              checked={pedigree === true}
              onChange={() => setPedigree(true)}
            />
            Да
          </label>
          <label className={styles.searchDogForm__radioLabel}>
            <input
              type="radio"
              value="false"
              checked={pedigree === false}
              onChange={() => setPedigree(false)}
            />
            Нет
          </label>
        </div>
      </div>

      <div className={styles.searchDogForm__group}>
        <label className={styles.searchDogForm__checkboxLabel}>
          <input
            type="checkbox"
            checked={withPhoto}
            onChange={() => setWithPhoto(!withPhoto)}
          />
          С фото
        </label>
      </div>

      <button type="submit" className={styles.searchDogForm__button}>Найти</button>
    </form>
  );
};

export default SearchForm;
