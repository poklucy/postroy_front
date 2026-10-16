import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import styles from './CookieBanner.module.css';

const STORAGE_KEY = 'postroy_cookies_accepted';

const readAccepted = () => {
    try {
        return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
        return false;
    }
};

export const CookieBanner: React.FC = () => {
    const [accepted, setAccepted] = useState(readAccepted);

    if (accepted) return null;

    const handleAccept = () => {
        try {
            localStorage.setItem(STORAGE_KEY, '1');
        } catch {
            /* storage unavailable — hide for this visit only */
        }
        setAccepted(true);
    };

    return (
        <div className={styles.banner} role="region" aria-label="Уведомление о cookies">
            <p className={styles.text}>
                Мы используем файлы cookies, чтобы посещение сайта было как можно более комфортным.
            </p>
            <Button size="sm" onClick={handleAccept} className={styles.button}>
                Принять
            </Button>
        </div>
    );
};
