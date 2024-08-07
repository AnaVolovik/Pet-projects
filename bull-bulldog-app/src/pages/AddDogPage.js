import React from 'react';
import AddDogForm from '../components/AddDogForm';
import classNames from 'classnames';
import styles from '../styles/AddDogPage.module.scss';

const AddDogPage = ( {user, onProfileChange}) => {
  return (
    <section className={styles.addDog}>
      <div className={classNames(styles.addDog__container, '_container')}>
        <div className={styles.addDog__content}>
          <h2 className={classNames(styles.addDog__title, 'h2')}>Добавить анкету собаки</h2>
          {user ? (
            <AddDogForm user={user} onProfileChange={onProfileChange} />
          ) : (
            <p className={styles.addDog__message}>Необходимо авторизоваться, чтобы добавить анкету собаки</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AddDogPage;