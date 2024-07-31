import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Card.module.scss';

const Card = ({ dog, user, onDelete }) => {
  const navigate = useNavigate();

  const { id_dog, name_dog, age, breed, gender, photo1, date_add } = dog;
  const photoUrl = photo1 ? photo1 : 'https://via.placeholder.com/150/EEEEEE/000000?text=Нет+фото';
  const formattedDate = new Date(date_add).toLocaleDateString();

  const getYearString = (age) => {
    if (age % 10 === 1 && age % 100 !== 11) {
      return 'год';
    }
    if ((age % 10 >= 2 && age % 10 <= 4) && (age % 100 < 10 || age % 100 >= 20)) {
      return 'года';
    }
    return 'лет';
  };

  const handleClick = () => {
    navigate(`/dog/${id_dog}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(id_dog);
  };

  const showDeleteIcon = window.location.pathname.startsWith(`/account/${user?.userId}/`);

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.card__photo}>
        <img src={photoUrl} alt={name_dog} />
      </div>
      <h3 className={styles.card__name}>{name_dog}</h3>
      <div className={styles.card__info}>
        <p className={styles.card__detail}>{breed}</p>
        <p className={styles.card__detail}>{age} {getYearString(age)}</p>
        <p className={styles.card__detail}>{gender}</p>
        <p className={styles.card__detail}>{user?.city}</p>
      </div>
      <div className={styles.card__date}>{formattedDate}</div>
      {showDeleteIcon && (
        <div className={styles.card__deleteIcon} onClick={handleDeleteClick}>
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.75 8.25V15.75H10.25V8.25H11.75Z" fill="red"/>
            <path d="M7.75 15.75V8.25H6.25L6.25 15.75H7.75Z" fill="red"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M13.75 0.25H4.25V4.25H0V5.75H2.25V19.75H15.75V5.75H18V4.25H13.75V0.25ZM12.25 4.25V1.75H5.75V4.25H12.25ZM3.75 5.75V18.25H14.25V5.75H3.75Z" fill="red"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Card;
