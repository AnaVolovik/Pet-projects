import React from 'react';
import classNames from 'classnames';
import styles from '../styles/DogProfilePage.module.scss';

const DogProfilePage = ({ user, profile }) => {
  return (
    <section className={styles.dogProfile}>
      <div className={classNames(styles.dogProfile__container, '_container')}>
        <div className={styles.dogProfile__content}>
          <h2 className={classNames(styles.dogProfile__title, 'h2')}>Анкета {`${profile.name_dog}`}</h2>
          <div className={styles.dogProfile__body}>
            <div className={styles.dogProfile__photos}>
              {profile.photos && profile.photos.map((photo, index) => (
                <div key={index} className={styles.dogProfile__item}>
                  <img src={photo} alt={`Фото ${index + 1}`} />
                </div>
              ))}
            </div>
            <div className={styles.dogProfile__dataDisplay}>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Кличка собаки:</p>
                <p className={styles.dog__value}>{profile.name_dog}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Порода:</p>
                <p className={styles.dog__value}>{profile.breed}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Возраст (полных лет): </p>
                <p className={styles.dog__value}>{profile.age}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Пол: </p>
                <p className={styles.dog__value}>{profile.gender}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Окрас: </p>
                <p className={styles.dog__value}>{profile.color}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Наличие родословной:</p>
                <p className={styles.dog__value}>{profile.pedigree === 1 ? 'Да' : 'Нет'}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Город:</p>
                <p className={styles.dog__value}>{user.city}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Владелец собаки:</p>
                <p className={styles.dog__value}>{user.name}</p>
              </div>
              <div className={styles.dog__head}>
                <p className={styles.dog__title}>Номер телефона:</p>
                <p className={styles.dog__value}>{user.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DogProfilePage;