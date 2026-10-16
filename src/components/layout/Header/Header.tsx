import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes.config';
import { CategoryMenu } from '@/components/navigation/CategoryMenu';
import { CartIcon } from './CartIcon';
import { CompareIcon } from './CompareIcon';
import { FavoritesIcon } from './FavoritesIcon';
import { ProfileIcon } from './ProfileIcon';
import { SearchBar } from './SearchBar';
import { Logo } from '@/components/common/Logo';
import { PhoneIcon, PinIcon } from '@/components/common/icons';
import { CONTACTS } from '@/config/contacts.config';
import { useHeaderHeightVar } from '@/hooks/useHeaderHeightVar';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  useHeaderHeightVar(headerRef);

  return (
        <header ref={headerRef} className={styles.header}>
          <div className={`${styles.mobileHeader} container`}>
            <Link to={ROUTES.HOME} className={styles.mobileLogo} aria-label="Построй — на главную">
              <Logo variant="light" width={190} />
            </Link>
            <SearchBar className={styles.mobileSearch} placeholder="Все для стройки и ремонта" />
            <a
                href={CONTACTS.phone.href}
                className={styles.phoneButton}
                aria-label={`Позвонить ${CONTACTS.phone.display}`}
            >
              <PhoneIcon size={14} />
            </a>
          </div>

          <div className={`${styles.headerContainer} container`}>
            <div className={styles.topRow}>
              <div className={styles.topRowContainer}>
                <div className={styles.topContainer}>
                  <Link to={CONTACTS.storesUrl} className={styles.topLink}>
                    <PinIcon />
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
                  <a href={CONTACTS.phone.href} className={styles.telephone}>
                    <PhoneIcon />
                    {CONTACTS.phone.display}
                  </a>
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
  );
};
