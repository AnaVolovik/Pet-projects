import React, { useState, useEffect } from 'react';
import styles from '../styles/SearchDogForm.module.scss';

const SearchForm = ({ onSearch }) => {
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [color, setColor] = useState('');
  const [city, setCity] = useState('');
  const [pedigree, setPedigree] = useState(0);
  const [withPhoto, setWithPhoto] = useState(true);
  const [errors, setErrors] = useState({});
  const [breeds, setBreeds] = useState([]);
  const [genders, setGenders] = useState([]);
  const [colors, setColors] = useState([]);
  const [cities, setCities] = useState([]);

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

    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cities');
        const data = await response.json();
        setCities(data.cities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchBreeds();
    fetchGenders();
    fetchColors();
    fetchCities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const searchParams = {
        breed,
        age,
        gender,
        color,
        city,
        pedigree: pedigree === 1 ? 1 : 0,
        withPhoto,
      };

      const queryParams = new URLSearchParams(searchParams).toString();
  
      try {
        const response = await fetch(`http://localhost:5000/api/dogs?${queryParams}`);
        const data = await response.json();
        if (onSearch) {
          onSearch(data);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
  
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

      <div className={styles.searchDogForm__group}>
        <label className={styles.searchDogForm__label} htmlFor="color">Окрас</label>
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

      <div className={styles.searchDogForm__group}>
        <label className={styles.searchDogForm__label} htmlFor="city">Город</label>
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

      <div className={styles.searchDogForm__group}>
        <label className={styles.searchDogForm__label}>Наличие родословной</label>
        <div className={styles.searchDogForm__radioBtns}>
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
