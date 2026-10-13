import React from 'react';

interface QuestionIconProps {
    size?: number;
    className?: string;
}

export const QuestionIcon: React.FC<QuestionIconProps> = ({ size = 14, className }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="6.4" stroke="currentColor" strokeWidth="1.2" />
        <path
            d="M5.3 5.4C5.3 4.5 6 3.9 7 3.9C8 3.9 8.7 4.5 8.7 5.3C8.7 6.5 7 6.6 7 8V8.4"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
        />
        <circle cx="7" cy="10.3" r="0.65" fill="currentColor" />
    </svg>
);
