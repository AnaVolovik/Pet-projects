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

  const handleEditClick = (e) => {
    e.stopPropagation();
    navigate(`/account/${user.userId}/edit-my-dog/${id_dog}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(id_dog);
  };

  const showEditIcon = window.location.pathname.startsWith(`/account/${user?.userId}/`);
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
      {showEditIcon && (
        <div className={styles.card__editIcon} onClick={handleEditClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.75 3.02344C18.1758 3.02344 17.6133 3.24609 17.1797 3.67969L9.75 11.0859L9.58594 11.25L9.53906 11.4844L9.02344 14.1094L8.78906 15.2109L9.89062 14.9766L12.5156 14.4609L12.75 14.4141L12.9141 14.25L20.3203 6.82031C21.1846 5.95605 21.1846 4.54395 20.3203 3.67969C19.8867 3.24609 19.3242 3.02344 18.75 3.02344ZM18.75 4.47656C18.9258 4.47656 19.0986 4.56738 19.2656 4.73438C19.5996 5.06836 19.5996 5.43164 19.2656 5.76562L12 13.0312L10.7109 13.2891L10.9688 12L18.2344 4.73438C18.4014 4.56738 18.5742 4.47656 18.75 4.47656ZM3 6V21H18V11.1094L16.5 12.6094V19.5H4.5V7.5H11.3906L12.8906 6H3Z" fill="red"/>
          </svg>
        </div>
      )}
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
