import React from 'react';
import ContactForm from '../components/ContactForm';
import classNames from 'classnames';
import styles from '../styles/ContactPage.module.scss';

const ContactPage = () => {
  return (
    <section className={styles.contact}>
      <div className={classNames(styles.contact__container, '_container')}>
        <div className={styles.contact__content}>
          <h2 className={classNames(styles.contact__title, 'h2')}>Контакты</h2>
          <p className={styles.contact__subtitle}>
            Заполните форму обратной связи, чтобы связаться с нами:
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;