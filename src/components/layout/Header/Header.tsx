import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes.config';
import { CategoryMenu } from '@/components/navigation/CategoryMenu';
import { CartIcon } from './CartIcon';
import { CompareIcon } from './CompareIcon';
import { FavoritesIcon } from './FavoritesIcon';
import { ProfileIcon } from './ProfileIcon';
import { SearchBar } from './SearchBar';
import { LoginModal } from '@/components/auth/LoginModal';
import { Logo } from '@/components/common/Logo';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
      <>
        <header className={styles.header}>
          <div className={`${styles.headerContainer} container`}>
            <div className={styles.topRow}>
              <div className={styles.topRowContainer}>
                <div className={styles.topContainer}>
                  <Link to="/about#shop" className={styles.topLink}>
                    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M7 20C6.69061 20 6.40703 19.8755 6.21366 19.6389C5.58195 18.9042 -0.0128489 12.3548 2.21728e-05 6.93842C2.21728e-05 4.69719 0.683276 2.9415 2.01105 1.73374C3.9834 -0.0592398 6.67774 -0.00945415 7 0.00297767C7.32226 -0.00945415 10.0166 -0.0592982 11.989 1.73374C13.3168 2.94156 14 4.69719 14 6.93842C14.0128 12.3548 8.43092 18.9167 7.78634 19.6389C7.59304 19.8754 7.30939 20 7 20ZM6.85824 0.986667C5.33704 1.01159 3.80296 1.4847 2.7201 2.46839C1.61144 3.48937 1.04421 4.99602 1.03134 6.93842C1.01847 11.9937 6.39416 18.2942 7.00006 19.0039C7.61884 18.3066 12.9817 12.0062 12.9688 6.93842C12.9688 4.98353 12.4016 3.47694 11.28 2.4559C10.1197 1.40999 8.41805 0.961745 6.85824 0.986667Z"
                          fill="black"/>
                      <path
                          d="M7 10C5.34273 10 4 8.65727 4 7C4 5.34273 5.34273 4 7 4C8.65727 4 10 5.34273 10 7C10 8.65727 8.65727 10 7 10ZM7 4.96775C5.87501 4.96775 4.96775 5.87501 4.96775 7C4.96775 8.12499 5.87501 9.03225 7 9.03225C8.12499 9.03225 9.03225 8.12499 9.03225 7C9.03225 5.87501 8.12505 4.96775 7 4.96775Z"
                          fill="black"/>
                    </svg>
                    Адреса магазинов
                  </Link>
                  <Link to='/delivery' className={styles.topLink}>
                    Доставка и оплата
                  </Link>
                  <Link to='/person' className={styles.topLink}>
                    Для юр. лиц
                  </Link>
                </div>

                <div className={styles.topContainer}>
                  <Link to='' className={styles.telephone}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M1.84316 0H4.4841C4.59151 0 4.69636 0.0329839 4.78467 0.0945508C4.87298 0.156118 4.94055 0.24334 4.97835 0.34458L6.00347 3.08845C6.03726 3.17919 6.04578 3.27751 6.02811 3.37277L5.51415 6.14642C6.14569 7.64102 7.18841 8.64569 8.91689 9.54684L11.6381 9.01508C11.7348 8.99632 11.8348 9.00516 11.9268 9.04061L14.6599 10.0899C14.7599 10.1283 14.8459 10.1962 14.9066 10.2849C14.9673 10.3735 14.9999 10.4786 15 10.5863V13.1273C15 14.2802 13.9918 15.2154 12.8118 14.9566C10.6623 14.4858 6.67937 13.2883 3.88987 10.4792C1.21724 7.78849 0.321675 4.07185 0.02104 2.06322C-0.151456 0.916043 0.761715 0 1.84316 0Z"
                            fill="black"/>
                    </svg>
                    +7 (000) 000-00-00
                  </Link>
                </div>
              </div>

              <div className={styles.icons}>
                <ProfileIcon />
                <FavoritesIcon />
                <CompareIcon />
                <CartIcon />
              </div>
            </div>

            <div className={styles.bottomRow}>
              <Link to={ROUTES.HOME} className={styles.logo}>
                <Logo />
              </Link>

              <CategoryMenu />

              <SearchBar />
            </div>
          </div>
        </header>

        <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
        />
      </>
  );
};
