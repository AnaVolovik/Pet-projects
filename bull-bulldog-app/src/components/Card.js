import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Card.module.scss';

const Card = ({ dog, user }) => {
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

  return (
    <div key={dog.id_dog} className={styles.card} onClick={handleClick}>
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
    </div>
  );
};

export default Card;
