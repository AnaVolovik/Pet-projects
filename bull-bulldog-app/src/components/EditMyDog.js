import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/EditMyDog.module.scss';

const EditMyDog = ({ onProfileChange }) => {
  const { dogId } = useParams();
  const navigate = useNavigate();
  const { user } = useOutletContext();

  const [breeds, setBreeds] = useState([]);
  const [colors, setColors] = useState([]);
  const [genders, setGenders] = useState([]);
  const [formData, setFormData] = useState({
    petName: '',
    age: '',
    breed: '',
    color: '',
    gender: '',
    pedigree: '',
  });
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  const cleanBase64String = (base64String) => {
    if (typeof base64String !== 'string') {
      throw new Error('Ожидалась строка Base64');
    }
    return base64String.replace(/^data:[a-zA-Z]+\/[a-zA-Z]+;base64,/, '');
  };

  const base64ToFile = (base64String, filename, mimeType) => {
    try {
      const cleanedBase64String = cleanBase64String(base64String);
      const byteCharacters = atob(cleanedBase64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new File([byteArray], filename, { type: mimeType });
    } catch (error) {
      console.error('Ошибка при преобразовании Base64 в File:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [breedsRes, colorsRes, gendersRes] = await Promise.all([
          fetch('http://localhost:5000/api/breeds'),
          fetch('http://localhost:5000/api/colors'),
          fetch('http://localhost:5000/api/genders'),
        ]);
        if (!breedsRes.ok || !colorsRes.ok || !gendersRes.ok) {
          throw new Error('Ошибка при загрузке данных для выпадающих списков');
        }
        const breedsData = await breedsRes.json();
        const colorsData = await colorsRes.json();
        const gendersData = await gendersRes.json();
        setBreeds(breedsData.breeds);
        setColors(colorsData.colors);
        setGenders(gendersData.genders);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchDogData = async () => {
      try {
        if (user && user.userId) {
          const response = await fetch(`http://localhost:5000/api/users/${user.userId}/dogs/${dogId}`);
          if (!response.ok) {
            throw new Error('Ошибка при загрузке данных собаки');
          }
          const dogData = await response.json();

          setFormData({
            petName: dogData.name_dog || '',
            age: dogData.age || '',
            breed: dogData.breed || '',
            color: dogData.color || '',
            gender: dogData.gender || '',
            pedigree: dogData.pedigree === 1 ? 'true' : 'false',
          });

          // Инициализация состояния photos с учетом null значений
          setPhotos([
            { src: dogData.photo1 || null, id: 'photo1', existing: !!dogData.photo1 },
            { src: dogData.photo2 || null, id: 'photo2', existing: !!dogData.photo2 },
            { src: dogData.photo3 || null, id: 'photo3', existing: !!dogData.photo3 },
          ]);

          // Преобразование старых фотографий в File объекты
          setPhotos([
            { src: dogData.photo1 ? base64ToFile(dogData.photo1, 'photo1', dogData.photo_format1) : null, id: 'photo1', existing: !!dogData.photo1 },
            { src: dogData.photo2 ? base64ToFile(dogData.photo2, 'photo2', dogData.photo_format2) : null, id: 'photo2', existing: !!dogData.photo2 },
            { src: dogData.photo3 ? base64ToFile(dogData.photo3, 'photo3', dogData.photo_format3) : null, id: 'photo3', existing: !!dogData.photo3 },
          ]);
        } else {
          setError('Нет доступа к редактированию этой анкеты');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDropdownData();
    fetchDogData();
  }, [dogId, user]);

  useEffect(() => {
    return () => {
      photos.forEach(photo => {
        if (photo.src instanceof File) {
          URL.revokeObjectURL(photo.src);
        }
      });
    };
  }, [photos]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const newPhotos = Array.from(e.target.files).map(file => ({ src: file, new: true }));
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos(prevPhotos => {
      const updatedPhotos = prevPhotos.filter((_, i) => i !== index);
      return updatedPhotos;
    });
  };

  const handlePedigreeChange = (value) => {
    setFormData({ ...formData, pedigree: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user || !user.userId) {
      setError('Не удается отправить данные. Пользователь не авторизован.');
      return;
    }
  
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('petName', formData.petName || '');
      formDataToSubmit.append('age', formData.age || '');
      formDataToSubmit.append('breed', formData.breed || '');
      formDataToSubmit.append('color', formData.color || '');
      formDataToSubmit.append('gender', formData.gender || '');
      formDataToSubmit.append('pedigree', formData.pedigree === 'true' ? 1 : 0);
  
      // Обработка удаления фото
      const photoIdsToRemove = photos
        .filter(photo => photo.toDelete)
        .map(photo => photo.id);

      // Добавление новых фото
      const newPhotos = photos
        .filter(photo => photo.new && photo.src instanceof File);

      newPhotos.forEach(photo => {
        formDataToSubmit.append('photos', photo.src);
      });

      photos
        .filter(photo => photo.existing && !photo.new)
        .forEach(photo => {
          if (photo.src instanceof File) {
            formDataToSubmit.append('photos', photo.src);
          } else if (typeof photo.src === 'string' && photo.id) {
            const { src, id } = photo;
            const mimeType = photo.mimeType || 'image/jpeg';
            const fileName = `${id}.jpg`;
            try {
              const file = base64ToFile(src, fileName, mimeType);
              formDataToSubmit.append('photos', file, id);
            } catch (error) {
              console.error('Ошибка при преобразовании Base64 в File:', error);
            }
          } else {
            console.error('Неподдерживаемый формат фотографии:', photo);
          }
        });
  
      // Добавляем информацию о фотографиях, которые нужно удалить
      if (photoIdsToRemove.length > 0) {
        formDataToSubmit.append('deleteNewPhotoIds', JSON.stringify(photoIdsToRemove));
      }

      const response = await fetch(`http://localhost:5000/api/users/${user.userId}/dogs/${dogId}`, {
        method: 'PUT',
        body: formDataToSubmit,
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Response Error:', errorData);
        throw new Error('Ошибка при обновлении данных собаки');
      }

      const updatedData = {
        petName: formData.petName,
        age: formData.age,
        breed: formData.breed,
        color: formData.color,
        gender: formData.gender,
        pedigree: formData.pedigree,
        photos: photos.map(photo => ({
          src: photo.src instanceof File ? URL.createObjectURL(photo.src) : photo.src
        }))
      };

      if (onProfileChange) {
        onProfileChange(updatedData);
      }
  
      navigate(`/account/${user.userId}/my-dogs`);
    } catch (err) {
      console.error('Error during submit:', err);
      setError(err.message);
    }
  };

  return (
    <div className={styles.editMyDog}>
      <h3 className={styles.editMyDog__title}>Редактирование анкеты собаки</h3>
      {error && <p className={styles.error}>Ошибка: {error}</p>}
      <form onSubmit={handleSubmit} className={styles.editMyDog__form}>
        <div className={styles.editMyDog__group}>
          <label className={styles.editMyDog__label} htmlFor="petName">Имя собаки:</label>
          <input
            className={styles.editMyDog__input}
            type="text"
            id="petName"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.editMyDog__group}>
          <label className={styles.editMyDog__label} htmlFor="age">Возраст:</label>
          <input
            className={styles.editMyDog__input}
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className={styles.editMyDog__group}>
          <label className={styles.editMyDog__label} htmlFor="breed">Порода:</label>
          <select
            className={styles.editMyDog__select}
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
          >
            <option value="">Выберите породу</option>
            {breeds.map((breed, index) => (
              <option key={index} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.editMyDog__group}>
          <label className={styles.editMyDog__label} htmlFor="color">Окрас:</label>
          <select
            className={styles.editMyDog__select}
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          >
            <option value="">Выберите окрас</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.editMyDog__group}>
          <label className={styles.editMyDog__label} htmlFor="gender">Пол:</label>
          <select
            className={styles.editMyDog__select}
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Выберите пол</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.editMyDog__group}>
          <label className={styles.editMyDog__label}>Наличие родословной:</label>
          <div className={styles.editMyDog__radioBtns}>
            <label>
              <input
                type="radio"
                name="pedigree"
                value="true"
                checked={formData.pedigree === 'true'}
                onChange={() => handlePedigreeChange('true')}
              />
              Да
            </label>
            <label>
              <input
                type="radio"
                name="pedigree"
                value="false"
                checked={formData.pedigree === 'false'}
                onChange={() => handlePedigreeChange('false')}
              />
              Нет
            </label>
          </div>
        </div>
        <div className={styles.editMyDog__group}>
          <label className={styles.editMyDog__label}>Фотографии:</label>
          <input
            className={styles.editMyDog__input}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
          />
          <div className={styles.editMyDog__photoPreviews}>
            {photos
              .filter(photo => photo.src) // Фильтруем null фотографии
              .map((photo, index) => (
                <div key={index} className={styles.editMyDog__photoPreview}>
                  {photo.src instanceof File ? (
                    <img src={URL.createObjectURL(photo.src)} alt={`Фотография ${index + 1}`} />
                  ) : (
                    <img src={photo.src} alt={`Фотография ${index + 1}`} />
                  )}
                  <button
                    type="button"
                    className={styles.editMyDog__removePhoto}
                    onClick={() => handleRemovePhoto(index)}
                  >
                    Удалить
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.editMyDog__buttons}>
          <button type="submit" className={styles.editMyDog__button}>
            Сохранить
          </button>
          <button
            type="button"
            className={classNames(styles.editMyDog__button, styles.editMyDog__cancel)}
            onClick={() => navigate(`/account/${user.userId}/my-dogs`)}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMyDog;
