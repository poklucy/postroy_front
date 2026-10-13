import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/slices/auth';
import styles from './ProfileIcon.module.css';

export const ProfileIcon: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
      <Link
          to={isAuthenticated ? '/profile' : '/login'}
          className={styles.profileIcon}
          aria-label="Личный кабинет"
      >
        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M10.5 10C12.9663 10 15 6.9869 15 4.49782C15 2.00873 12.9663 0 10.5 0C8.03365 0 6 2.00873 6 4.54148C6 6.9869 8.03365 10 10.5 10ZM10.5 0.873362C12.4904 0.873362 14.1346 2.48908 14.1346 4.54148C14.1346 6.63755 12.4471 9.17031 10.5 9.17031C8.55288 9.17031 6.86538 6.63755 6.86538 4.54148C6.86538 2.48908 8.50962 0.873362 10.5 0.873362Z"
              fill="black"/>
          <path
              d="M12.8794 11.0168C12.6981 10.9702 12.5168 11.0633 12.3808 11.2029L10.4773 14.228L8.57385 11.2029C8.48321 11.0168 8.2566 10.9702 8.07532 11.0168C3.72448 12.0406 0.461345 15.8103 0.00813195 20.3711C-0.0825106 21.2554 0.597308 22 1.41309 22H19.5416C20.4027 22 21.0825 21.2554 20.9919 20.3711C20.4933 15.8103 17.2302 12.0406 12.8794 11.0168ZM19.5416 21.0692H1.41309C1.09584 21.0692 0.869236 20.79 0.869236 20.4642C1.27713 16.4153 4.13237 13.018 7.93935 11.9941L10.0695 15.3449C10.2507 15.6242 10.6586 15.6242 10.8399 15.3449L12.97 11.9941C16.8223 13.018 19.6322 16.4153 20.0401 20.4642C20.0855 20.79 19.8135 21.0692 19.5416 21.0692Z"
              fill="black"/>
        </svg>
      </Link>
  );
};
