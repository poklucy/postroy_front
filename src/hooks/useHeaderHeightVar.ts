import { RefObject, useEffect } from 'react';

const VAR_NAME = '--header-height';

/** Publishes the header height as a CSS variable so sticky blocks can sit right below it. */
export const useHeaderHeightVar = (ref: RefObject<HTMLElement>) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const root = document.documentElement;
        const update = () => {
            const isSticky = getComputedStyle(element).position === 'sticky';
            root.style.setProperty(VAR_NAME, `${isSticky ? element.offsetHeight : 0}px`);
        };

        update();
        const observer = new ResizeObserver(update);
        observer.observe(element);
        window.addEventListener('resize', update);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', update);
            root.style.removeProperty(VAR_NAME);
        };
    }, [ref]);
};
