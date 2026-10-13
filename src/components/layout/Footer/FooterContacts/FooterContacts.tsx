import React from 'react';
import styles from './FooterContacts.module.css';

const FooterContacts: React.FC = () => {
    return (
        <div className={styles.contactsSection}>
            <div className={`small-text ${styles.title}`}>Контакты</div>
            <div className={styles.contactItem}>
                <a href="tel:+74951234567" className={styles.telephone}>
                    +7 495 123 4567
                </a>
                <a href="mailto:info@postroi.online" className={`small-text ${styles.email}`}>
                    info@postroi.online
                </a>
            </div>

            <div className={styles.contactItem}>
                <div className={styles.label}>Юридический адрес</div>
                <div className={styles.value}>
                    Москва, ул. Строителей 15, офис 305
                </div>
            </div>
        </div>
    );
};

export default FooterContacts;
