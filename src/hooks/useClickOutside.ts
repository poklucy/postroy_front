import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(
    ref: RefObject<T>,
    onOutside: () => void,
    enabled = true
) => {
    const handlerRef = useRef(onOutside);
    handlerRef.current = onOutside;

    useEffect(() => {
        if (!enabled) return;

        const handleMouseDown = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handlerRef.current();
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handlerRef.current();
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [ref, enabled]);
};
