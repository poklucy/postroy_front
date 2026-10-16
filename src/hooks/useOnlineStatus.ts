import { useEffect, useState } from 'react';

const getOnline = () => (typeof navigator === 'undefined' ? true : navigator.onLine);

export const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(getOnline);

    useEffect(() => {
        const update = () => setIsOnline(getOnline());
        window.addEventListener('online', update);
        window.addEventListener('offline', update);
        return () => {
            window.removeEventListener('online', update);
            window.removeEventListener('offline', update);
        };
    }, []);

    return isOnline;
};

export const useRetryOnReconnect = (enabled: boolean, retry?: () => void) => {
    useEffect(() => {
        if (!enabled || !retry) return;
        window.addEventListener('online', retry);
        return () => window.removeEventListener('online', retry);
    }, [enabled, retry]);
};
