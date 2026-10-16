import React, { useEffect, useRef, useState } from 'react';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import styles from './NetworkStatus.module.css';

const RESTORED_VISIBLE_MS = 3000;

export const NetworkStatus: React.FC = () => {
    const isOnline = useOnlineStatus();
    const [showRestored, setShowRestored] = useState(false);
    const wasOffline = useRef(false);

    useEffect(() => {
        if (!isOnline) {
            wasOffline.current = true;
            setShowRestored(false);
            return;
        }
        if (!wasOffline.current) return;

        wasOffline.current = false;
        setShowRestored(true);
        const timer = setTimeout(() => setShowRestored(false), RESTORED_VISIBLE_MS);
        return () => clearTimeout(timer);
    }, [isOnline]);

    if (isOnline && !showRestored) return null;

    return (
        <div className={`${styles.banner} ${isOnline ? styles.online : styles.offline}`} role="status" aria-live="polite">
            <span className={styles.dot} aria-hidden="true" />
            {isOnline ? STATUS_MESSAGES.network.online : STATUS_MESSAGES.network.offline}
        </div>
    );
};
