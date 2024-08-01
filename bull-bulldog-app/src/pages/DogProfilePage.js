import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/DogProfilePage.module.scss';

const DogProfilePage = ({ dogs = [], user }) => {
  const { id } = useParams();
  const dog = dogs.find(d => d.id_dog === parseInt(id));

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const checkIfFavourite = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:5000/api/favourites/${user.userId}`);
          if (response.ok) {
            const favourites = await response.json();
            const isDogFavourite = favourites.some(fav => fav.id_dog === dog.id_dog);
            setIsFavourite(isDogFavourite);
          } else {
            console.error('Ошибка при получении избранных анкет');
          }
        } catch (error) {
          console.error('Ошибка при получении избранных анкет:', error);
        }
      }
    };

    if (dog) {
      checkIfFavourite();
    }
  }, [user, dog]);

  const getPhotoUrl = (photo) => {
    return photo ? photo : null;
  };

  const photoUrls = [
    getPhotoUrl(dog.photo1),
    getPhotoUrl(dog.photo2),
    getPhotoUrl(dog.photo3),
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

      if (response.ok) {
        setIsFavourite(true);
      } else {
        console.error('Ошибка при добавлении в избранное');
      }
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
    }
  };

  const removeFromFavourites = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/liked_adds/${dog.id_dog}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'user-id': user.userId,
        },
      });

      if (response.ok) {
        setIsFavourite(false);
      } else {
        console.error('Ошибка при удалении из избранного');
      }
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
    }
  };

  if (!dog) {
    return <p>Собака не найдена.</p>;
  }

  return (
    <section className={styles.dogProfile}>
      <div className={classNames(styles.dogProfile__container, '_container')}>
        <div className={styles.dogProfile__content}>
          <h2 className={classNames(styles.dogProfile__title, 'h2')}>Анкета {dog.name_dog}</h2>
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
                <p className={styles.dog__value}>{dog.name_dog}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Порода:</p>
                <p className={styles.dog__value}>{dog.breed}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Возраст (полных лет):</p>
                <p className={styles.dog__value}>{dog.age}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Пол:</p>
                <p className={styles.dog__value}>{dog.gender}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Окрас:</p>
                <p className={styles.dog__value}>{dog.color}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Наличие родословной:</p>
                <p className={styles.dog__value}>{dog.pedigree === 1 ? 'Да' : 'Нет'}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Город:</p>
                <p className={styles.dog__value}>{dog.owner_city}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Владелец собаки:</p>
                <p className={styles.dog__value}>{dog.owner_name}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Номер телефона:</p>
                <p className={styles.dog__value}>{dog.owner_phone}</p>
              </div>
              {user ? (
                <>
                  {isFavourite ? (
                    <button className={styles.dogProfile__button} onClick={removeFromFavourites}>Удалить из избранного</button>
                  ) : (
                    <button className={styles.dogProfile__button} onClick={addToFavourites}>В избранное</button>
                  )}
                </>
              ) : (
                <p className={styles.dogProfile__message}>Авторизуйтесь, чтобы добавить в избранное</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DogProfilePage;
