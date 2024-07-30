import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AddDogForm.module.scss';

const AddDogForm = ({ user, onProfileChange }) => {
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [color, setColor] = useState('');
  const [pedigree, setPedigree] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [breeds, setBreeds] = useState([]);
  const [genders, setGenders] = useState([]);
  const [colors, setColors] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/breeds');
        const data = await response.json();
        setBreeds(data.breeds);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    const fetchGenders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/genders');
        const data = await response.json();
        setGenders(data.genders);
      } catch (error) {
        console.error('Error fetching genders:', error);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/colors');
        const data = await response.json();
        setColors(data.colors);
      } catch (error) {
        console.error('Error fetching colors:', error);
      }
    };

    fetchBreeds();
    fetchGenders();
    fetchColors();
  }, []);

  useEffect(() => {
    const newPhotoPreviews = photos.map(photo => URL.createObjectURL(photo));
    setPhotoPreviews(newPhotoPreviews);
    return () => {
      newPhotoPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [photos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      await submitForm();
    } else {
      setErrors(validationErrors);
    }
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append('fk_reg_data', user.userId);
    formData.append('petName', petName);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('color', color);
    formData.append('pedigree', pedigree);
    photos.forEach(photo => formData.append('photos', photo));

    try {
      const response = await fetch('http://localhost:5000/api/add-dog', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Форма отправлена:', result);
        onProfileChange(result);
        setPetName('');
        setBreed('');
        setAge('');
        setGender('');
        setColor('');
        setPedigree(1);
        setPhotos([]);
        setPhotoPreviews([]);
        setErrors({});
        navigate(`/dog/${result.id_dog}`);
      } else {
        console.error('Server Error:', result);
        setErrors(result.errors || {});
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
        <select
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className={errors.breed ? styles.errorInput : ''}
        >
          <option value="">Выберите породу</option>
          {breeds.map((b, index) => (
            <option key={index} value={b}>{b}</option>
          ))}
        </select>
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
        <label className={styles.addDogForm__label} htmlFor="gender">Пол*</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className={errors.gender ? styles.errorInput : ''}
        >
          <option value="">Выберите пол</option>
          {genders.map((g, index) => (
            <option key={index} value={g}>{g}</option>
          ))}
        </select>
        {errors.gender && <span className={styles.errorText}>{errors.gender}</span>}
      </div>

      <div className={styles.addDogForm__group}>
        <label className={styles.addDogForm__label} htmlFor="color">Окрас*</label>
        <select
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={errors.color ? styles.errorInput : ''}
        >
          <option value="">Выберите окрас</option>
          {colors.map((c, index) => (
            <option key={index} value={c}>{c}</option>
          ))}
        </select>
        {errors.color && <span className={styles.errorText}>{errors.color}</span>}
      </div>

      <div className={styles.addDogForm__group}>
        <label className={styles.addDogForm__label}>Наличие родословной*</label>
        <div className={styles.addDogForm__radioBtns}>
          <label className={styles.addDogForm__radioLabel}>
            <input
              type="radio"
              value="true"
              checked={pedigree === 1}
              onChange={() => setPedigree(1)}
            />
            Да
          </label>
          <label className={styles.addDogForm__radioLabel}>
            <input
              type="radio"
              value="false"
              checked={pedigree === 0}
              onChange={() => setPedigree(0)}
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
        {photoPreviews.map((photo, index) => (
          <div key={index} className={styles.addDogForm__photoPreview}>
            <img src={photo} alt={`Фото ${index + 1}`} />
            {errors[`photo${index}`] && <span className={styles.errorText}>{errors[`photo${index}`]}</span>}
          </div>
        ))}
      </div>

      <button type="submit" className={styles.addDogForm__button}>Добавить</button>
    </form>
  );
};

export default AddDogForm;
