import React from 'react';

export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3.5 10L12 3L20.5 10V20.5H14.5V14.5H9.5V20.5H3.5V10Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
);
