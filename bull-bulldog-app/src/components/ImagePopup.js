import React from 'react';
import styles from '../styles/ImagePopup.module.scss';

const ImagePopup = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.imagePopup}>
      <div className={styles.imagePopup__overlay} onClick={onClose}>
        <div className={styles.imagePopup__content} onClick={(e) => e.stopPropagation()}>
          <img src={imageUrl} alt="Enlarged" />
          <button className={styles.imagePopup__closeButton} onClick={onClose}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M21 7L7 21" 
                stroke="#727171" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M7 7L21 21" 
                stroke="#727171" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;