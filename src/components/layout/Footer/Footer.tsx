import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { PinIcon } from '@/components/common/icons';
import { CONTACTS } from '@/config/contacts.config';
import { ROUTES } from '@/config/routes.config';
import FooterNav from './FooterNav';
import FooterContacts from './FooterContacts';
import { FooterSocials } from './FooterSocials';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
    <footer className={styles.footer}>
        <div className={`container ${styles.grid}`}>
            <Link to={ROUTES.HOME} className={styles.logo} aria-label="Построй — на главную">
                <Logo variant="light" width={245} />
            </Link>

            <Link to={CONTACTS.storesUrl} className={styles.address}>
                <PinIcon />
                Адреса магазинов
            </Link>

            <FooterSocials className={styles.socials} />
            <FooterContacts className={styles.contacts} />
            <FooterNav className={styles.nav} />

            <p className={styles.copyright}>
                © 2026 Построй.<br /> Все права защищены.
            </p>

            <p className={styles.policy}>
                Вы принимаете условия политики в отношении <a href="#">обработки персональных данных</a> и{' '}
                <a href="#">пользовательского соглашения</a> каждый раз, когда оставляете свои данные в любой
                форме обратной связи на сайте
            </p>

            <div className={styles.legalLinks}>
                <Link to="/terms">Пользовательское соглашение</Link>
                <Link to="/offer">Оферта</Link>
            </div>
        </div>
    </footer>
);

export default Footer;
