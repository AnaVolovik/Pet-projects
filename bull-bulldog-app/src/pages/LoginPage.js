import React from 'react';
import LoginForm from '../components/LoginForm';
import classNames from 'classnames';
import styles from '../styles/LoginPage.module.scss';

const LoginPage = () => {
  return (
    <section className={styles.login}>
      <div className={classNames(styles.login__container, '_container')}>
        <div className={styles.login__content}>
          <h2 className={classNames(styles.login__title, 'h2')}>Вход</h2>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;