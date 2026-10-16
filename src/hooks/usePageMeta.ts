import { useEffect } from 'react';

const SITE_NAME = 'Построй';

interface PageMeta {
    title: string;
    noindex?: boolean;
}

export const usePageMeta = ({ title, noindex = false }: PageMeta) => {
    useEffect(() => {
        const previousTitle = document.title;
        document.title = `${title} — ${SITE_NAME}`;

        let robots: HTMLMetaElement | null = null;
        if (noindex) {
            robots = document.createElement('meta');
            robots.name = 'robots';
            robots.content = 'noindex, nofollow';
            document.head.appendChild(robots);
        }

        return () => {
            document.title = previousTitle;
            robots?.remove();
        };
    }, [title, noindex]);
};
