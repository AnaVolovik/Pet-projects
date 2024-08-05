import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from '../styles/NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <section className={styles.notFound}>
      <div className={classNames(styles.notFound__container, '_container')}>
        <div className={styles.notFound__content}>
          <h1 className={styles.notFound__title}>
            Ошибка 404:<br/>страница не найдена
          </h1>
          <Link to="/" className={styles.notFound__link}>Вернуться на главную страницу</Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
