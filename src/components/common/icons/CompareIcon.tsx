import React from 'react';

interface CompareIconProps {
    filled?: boolean;
    className?: string;
}

export const CompareIcon: React.FC<CompareIconProps> = ({ filled = false, className }) => (
    <svg className={className} width="19" height="20" viewBox="0 0 19 20" fill="none" aria-hidden="true">
        <circle cx="6.5" cy="6.5" r="6" stroke="currentColor" fill={filled ? 'currentColor' : 'none'} />
        <circle
            cx="12.5"
            cy="13.5"
            r="6"
            stroke={filled ? 'white' : 'currentColor'}
            fill={filled ? 'currentColor' : 'none'}
        />
    </svg>
);
