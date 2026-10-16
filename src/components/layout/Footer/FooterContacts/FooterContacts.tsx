import React from 'react';
import { CONTACTS } from '@/config/contacts.config';
import styles from './FooterContacts.module.css';

const FooterContacts: React.FC<{ className?: string }> = ({ className }) => (
    <div className={[styles.contactsSection, className].filter(Boolean).join(' ')}>
        <div className={styles.title}>Контакты</div>
        <div className={styles.contactItem}>
            <a href={CONTACTS.phone.href} className={styles.telephone}>
                {CONTACTS.phone.display}
            </a>
            <a href={`mailto:${CONTACTS.email}`} className={styles.email}>
                {CONTACTS.email}
            </a>
        </div>

        <div className={`${styles.contactItem} ${styles.legal}`}>
            <div className={styles.label}>Юридический адрес</div>
            <div className={styles.value}>{CONTACTS.legalAddress}</div>
        </div>
    </div>
);

export default FooterContacts;
