import React, { useState } from 'react';
import styles from '../styles/AddDogForm.module.scss';

const AddDogForm = () => {
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Кобель');
  const [color, setColor] = useState('');
  const [pedigree, setPedigree] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Форма добавления собаки отправлена:', { petName, breed, age, gender, color, pedigree, photos });
      setPetName('');
      setBreed('');
      setAge('');
      setGender('Кобель');
      setColor('');
      setPedigree(true);
      setPhotos([]);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    const photoTypes = ['image/png', 'image/jpeg', 'image/gif'];

    if (!petName) errors.petName = 'Кличка обязательна';
    if (!breed) errors.breed = 'Порода обязательна';
    if (!age) errors.age = 'Возраст обязателен';
    else if (isNaN(age) || age < 0) errors.age = 'Введите корректный возраст';
    if (!color) errors.color = 'Окрас обязателен';
    if (photos.length > 3) errors.photos = 'Максимум 3 фото';
    photos.forEach((photo, index) => {
      if (!photoTypes.includes(photo.type)) {
        errors[`photo${index}`] = 'Неверный формат файла';
      }
      if (photo.size > 10485760) {
        errors[`photo${index}`] = 'Размер файла не должен превышать 10 МБ';
      }
    });

    return errors;
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addDogForm}>
      <div className={styles.addDogForm__group}>
        <label className={styles.addDogForm__label} htmlFor="petName">Кличка*</label>
        <input
          type="text"
          id="petName"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          className={errors.petName ? styles.errorInput : ''}
        />
        {errors.petName && <span className={styles.errorText}>{errors.petName}</span>}
      </div>

      <div className={styles.addDogForm__group}>
        <label className={styles.addDogForm__label} htmlFor="breed">Порода*</label>
        <input
          type="text"
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className={errors.breed ? styles.errorInput : ''}
        />
        {errors.breed && <span className={styles.errorText}>{errors.breed}</span>}
      </div>

      <div className={styles.addDogForm__group}>
        <label className={styles.addDogForm__label} htmlFor="age">Возраст (полных лет)*</label>
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

      <div className={styles.addDogForm__group}>
        <label className={styles.addDogForm__label} htmlFor="gender">Пол</label>
        <div className={styles.addDogForm__radioBtns}>
          <label className={styles.addDogForm__radioLabel}>
            <input
              type="radio"
              value="Кобель"
              checked={gender === 'Кобель'}
              onChange={(e) => setGender(e.target.value)}
            />
            Кобель
          </label>
          <label className={styles.addDogForm__radioLabel}>
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

      <div className={styles.addDogForm__group}>
        <label className={styles.addDogForm__label} htmlFor="color">Окрас</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={errors.color ? styles.errorInput : ''}
        />
        {errors.color && <span className={styles.errorText}>{errors.color}</span>}
      </div>

      <div className={styles.addDogForm__group}>
        <label className={styles.addDogForm__label}>Наличие родословной*</label>
        <div className={styles.addDogForm__radioBtns}>
          <label className={styles.addDogForm__radioLabel}>
            <input
              type="radio"
              value="true"
              checked={pedigree === true}
              onChange={() => setPedigree(true)}
            />
            Да
          </label>
          <label className={styles.addDogForm__radioLabel}>
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

      <div className={styles.addDogForm__group}>
        <label className={styles.addDogForm__label} htmlFor="photos">Фото (до 3 шт., в формате png, jpg, gif не более 10 мб)</label>
        <input
          type="file"
          id="photos"
          multiple
          onChange={handlePhotoChange}
          className={errors.photos ? styles.errorInput : ''}
        />
        {errors.photos && <span className={styles.errorText}>{errors.photos}</span>}
        {photos.map((photo, index) => (
          <div key={index} className={styles.addDogForm__photoPreview}>
            <img src={URL.createObjectURL(photo)} alt={`Фото ${index + 1}`} />
            {errors[`photo${index}`] && <span className={styles.errorText}>{errors[`photo${index}`]}</span>}
          </div>
        ))}
      </div>

      <button type="submit" className={styles.addDogForm__button}>Добавить</button>
    </form>
  );
};

export default AddDogForm;