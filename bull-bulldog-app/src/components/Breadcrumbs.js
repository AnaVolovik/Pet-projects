import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import breadcrumbTitles from '../utils/breadcrumbTitles';
import classNames from 'classnames';
import styles from '../styles/Breadcrumbs.module.scss';

const Breadcrumbs = () => {
  const location = useLocation();
  let pathnames = location.pathname.split('/').filter(x => x);

  pathnames = pathnames.filter(pathname => isNaN(pathname));

  return (
    <div className={styles.breadcrumbs}>
      <div className={classNames(styles.homePage__container, '_container')}>
        <nav className={styles.breadcrumbs__content}>
          <ul>
            {pathnames.length > 0 && (
              <li>
                <Link to="/">Главная</Link>
              </li>
            )}
            {pathnames.map((pathname, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              const title = breadcrumbTitles[to] || breadcrumbTitles[pathname] || decodeURIComponent(pathname);

              return last ? (
                <li key={to} aria-current="page">
                  {title}
                </li>
              ) : (
                <li key={to}>
                  <Link to={to}>{title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
