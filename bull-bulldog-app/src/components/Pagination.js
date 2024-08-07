import React from 'react';
import styles from '../styles/Pagination.module.scss';

const Pagination = ({ dogsPerPage, totalDogs, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalDogs / dogsPerPage);
  const maxPageNumbersToShow = 5;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const getVisiblePages = () => {
    const visiblePages = [];
    const leftEllipsis = '...';
    const rightEllipsis = '...';

    if (totalPages <= maxPageNumbersToShow) {
      return pageNumbers;
    }

    if (currentPage <= maxPageNumbersToShow - 2) {
      // Показываем первые страницы и страницу в текущей
      for (let i = 1; i <= maxPageNumbersToShow - 1; i++) {
        visiblePages.push(i);
      }
      visiblePages.push(leftEllipsis, totalPages);
    } else if (currentPage >= totalPages - (maxPageNumbersToShow - 2)) {
      // Показываем последние страницы и страницу в текущей
      visiblePages.push(1, rightEllipsis);
      for (let i = totalPages - (maxPageNumbersToShow - 1); i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Показываем текущую страницу и несколько страниц с обеих сторон
      visiblePages.push(1, rightEllipsis);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        visiblePages.push(i);
      }
      visiblePages.push(leftEllipsis, totalPages);
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pagination__list}>
        {visiblePages.map((number, index) => (
          <li 
            key={index}
            className={`${styles.pagination__item} ${number === currentPage ? styles.active : ''}`}
          >
            {number === '...' ? (
              <div className={styles.pagination__ellipsis}>...</div>
            ) : (
              <button
                onClick={() => paginate(number)}
                className={styles.pagination__link}
              >
                {number}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
