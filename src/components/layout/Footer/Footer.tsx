import React from 'react';
import FooterLogo from '@/components/layout/Footer/FooterLogo';
import FooterNav from '@/components/layout/Footer/FooterNav';
import FooterContacts from '@/components/layout/Footer/FooterContacts';
import FooterBottom from '@/components/layout/Footer/FooterBottom';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.content}>
            <FooterLogo />
            <FooterNav />
            <FooterContacts />
          </div>
        </div>
        <FooterBottom />
      </footer>
  );
};

export default Footer;
