import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/DogProfilePage.module.scss';

const DogProfilePage = ({ dogs = [], user }) => {
  const { id } = useParams();
  const dog = dogs.find(d => d.id_dog === parseInt(id));

  if (!dog) {
    return <p>Собака не найдена.</p>;
  }

  const { 
    name_dog, age, breed, gender, color, pedigree, 
    photo1, photo2, photo3,
    owner_name, owner_city, owner_phone
  } = dog;

  const getPhotoUrl = (photo) => {
    return photo ? photo : null;
  };

  const photoUrls = [
    getPhotoUrl(photo1),
    getPhotoUrl(photo2),
    getPhotoUrl(photo3),
  ].filter(url => url !== null);

  const placeholderUrl = 'https://via.placeholder.com/150/EEEEEE/000000?text=Нет+фото';

  const addToFavourites = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/liked_adds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fk_id_reg: user.userId,
          fk_id_dog: dog.id_dog,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
    }
  };

  return (
    <section className={styles.dogProfile}>
      <div className={classNames(styles.dogProfile__container, '_container')}>
        <div className={styles.dogProfile__content}>
          <h2 className={classNames(styles.dogProfile__title, 'h2')}>Анкета {name_dog}</h2>
          <div className={styles.dogProfile__body}>
            <div className={styles.dogProfile__photos}>
              {photoUrls.length > 0 ? (
                photoUrls.map((url, index) => (
                  <div key={index} className={styles.dogProfile__item}>
                    <img src={url} alt={`Фото ${index + 1}`} />
                  </div>
                ))
              ) : (
                <div className={styles.dogProfile__item}>
                  <img src={placeholderUrl} alt="Placeholder" />
                </div>
              )}
            </div>
            <div className={styles.dogProfile__dataDisplay}>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Кличка собаки:</p>
                <p className={styles.dog__value}>{name_dog}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Порода:</p>
                <p className={styles.dog__value}>{breed}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Возраст (полных лет):</p>
                <p className={styles.dog__value}>{age}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Пол:</p>
                <p className={styles.dog__value}>{gender}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Окрас:</p>
                <p className={styles.dog__value}>{color}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Наличие родословной:</p>
                <p className={styles.dog__value}>{pedigree === 1 ? 'Да' : 'Нет'}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Город:</p>
                <p className={styles.dog__value}>{owner_city}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Владелец собаки:</p>
                <p className={styles.dog__value}>{owner_name}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Номер телефона:</p>
                <p className={styles.dog__value}>{owner_phone}</p>
              </div>
              {user ?
              <button className={styles.dogProfile__button} onClick={addToFavourites} disabled={!user}>В избранное</button>
              :
              <p className={styles.dogProfile__message} >Авторизуйтесь, чтобы добавить в избранное</p>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DogProfilePage;
