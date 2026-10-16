import { useEffect, useState } from 'react';

const getMatch = (query: string) =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(query).matches;

export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(() => getMatch(query));

    useEffect(() => {
        const media = window.matchMedia(query);
        const update = () => setMatches(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, [query]);

    return matches;
};
