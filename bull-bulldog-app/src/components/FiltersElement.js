import React, { useEffect, useRef } from 'react';
import styles from '../styles/FiltersElement.module.scss';

const FiltersElement = ({ onOpenForm }) => {
  const filtersElementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = filtersElementRef.current;
        if (!element) return;

        const container = element.parentElement;
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        const triggerOffset = 20;

        if (window.scrollY + triggerOffset < containerRect.bottom - elementRect.height) {
          element.style.position = 'absolute';
          element.style.top = `180px`;
      } else {
          element.style.position = 'fixed';
          element.style.top = `${triggerOffset}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.filters} ref={filtersElementRef} onClick={onOpenForm}>
      <p className={styles.filters__text}>Фильтры</p>
      <svg
        className={styles.filters__icon}
        fill="#000000"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5,3V17M12,7V21m7-7v7m0-11V3"
          style={{
            fill: 'none',
            stroke: 'rgb(0, 0, 0)',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
          }}
          />
        <path
          d="M5,17a2,2,0,1,0,2,2A2,2,0,0,0,5,17ZM12,3a2,2,0,1,0,2,2A2,2,0,0,0,12,3Zm7,7a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z"
          style={{
            fill: 'none',
            stroke: '#F79007',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
          }}
        />
      </svg>
    </div>
  );
};

export default FiltersElement;
