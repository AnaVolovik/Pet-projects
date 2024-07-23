import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import classNames from 'classnames';
import styles from '../styles/RegistrationPage.module.scss';

const RegistrationPage = () => {
  return (
    <section className={styles.registration}>
      <div className={classNames(styles.registration__container, '_container')}>
        <div className={styles.registration__content}>
          <h2 className={classNames(styles.registration__title, 'h2')}>Регистрация</h2>
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
};

export default RegistrationPage;