import React from 'react';

interface ChevronIconProps {
    direction?: 'right' | 'left' | 'down' | 'up';
    className?: string;
}

const ROTATION = { right: 0, down: 90, left: 180, up: 270 };

export const ChevronIcon: React.FC<ChevronIconProps> = ({ direction = 'right', className }) => (
    <svg
        className={className}
        width="8"
        height="13"
        viewBox="0 0 8 13"
        fill="none"
        aria-hidden="true"
        style={ROTATION[direction] ? { transform: `rotate(${ROTATION[direction]}deg)` } : undefined}
    >
        <path d="M0.7 11.7L6.7 6.2L0.7 0.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
