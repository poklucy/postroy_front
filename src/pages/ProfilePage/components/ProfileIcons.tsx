const iconProps = {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    'aria-hidden': true,
} as const;

export const EditIcon = () => (
    <svg {...iconProps} width={18} height={18}>
        <path d="M9 3H4C3.4 3 3 3.4 3 4V16C3 16.6 3.4 17 4 17H16C16.6 17 17 16.6 17 16V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M14.5 2.5L17.5 5.5L10 13H7V10L14.5 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
);

export const CoinIcon = () => (
    <svg {...iconProps} width={16} height={16} viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="7.4" stroke="currentColor" strokeWidth="1.2" />
        <path d="M10 4.8H6.6V11.2H8.6C9.7 11.2 10.4 10.6 10.4 9.6C10.4 8.6 9.7 8 8.6 8H6.6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
);

export const CartIcon = () => (
    <svg {...iconProps}>
        <path d="M1 2H3.5L5.5 13H16L18 5H4.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="7" cy="16.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="14.5" cy="16.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
);

export const BoxIcon = () => (
    <svg {...iconProps}>
        <rect x="2" y="9" width="16" height="9" stroke="currentColor" strokeWidth="1.2" />
        <rect x="5" y="2" width="10" height="7" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 12H12M8 5H12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
);

export const ReturnIcon = () => (
    <svg {...iconProps}>
        <path d="M6 3L2 7L6 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.5 7H12C15 7 17.5 9.5 17.5 12.5C17.5 15.5 15 18 12 18H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

export const ClockIcon = () => (
    <svg {...iconProps}>
        <circle cx="10" cy="10" r="8.4" stroke="currentColor" strokeWidth="1.2" />
        <path d="M10 5V10L13 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);
