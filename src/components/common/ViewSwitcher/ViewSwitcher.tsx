import React from 'react';
import styles from './ViewSwitcher.module.css';

export type ViewMode = 'grid' | 'list';

interface ViewSwitcherProps {
    value: ViewMode;
    onChange: (mode: ViewMode) => void;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ value, onChange }) => {
    return (
        <div className={styles.switcher}>
            <button
                type="button"
                className={`${styles.button} ${value === 'grid' ? styles.active : ''}`}
                onClick={() => onChange('grid')}
                aria-label="Сетка"
            >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.59961 0.0306245C11.4971 -0.0224042 13.4558 0.0286044 15.3609 0.013629C15.8177 0.0100384 17.6336 -0.0241196 17.9979 0.0316511L17.9973 7.80344L17.9966 8.42121L17.6013 8.42095C16.9838 8.47536 15.5875 8.43365 14.929 8.43361L9.60295 8.42393L9.602 7.80405L9.59961 0.0306245Z"
                        fill="#FF6900"/>
                    <path
                        d="M0 0.0306245C1.89751 -0.0224042 3.8562 0.0286044 5.76126 0.013629C6.21811 0.0100384 8.03404 -0.0241196 8.39831 0.0316511L8.39765 7.80344L8.39696 8.42121L8.00173 8.42095C7.38422 8.47536 5.98789 8.43365 5.32942 8.43361L0.00333951 8.42393L0.0023955 7.80405L0 0.0306245Z"
                        fill="#FF6900"/>
                    <path
                        d="M9.59961 9.60876L10.218 9.6088L17.9992 9.60945L17.997 10.2243V17.9988L10.2228 17.9966L9.60299 18L9.60142 10.2325L9.59961 9.60876Z"
                        fill="#FF6900"/>
                    <path
                        d="M7.79259 9.60987L8.41101 9.60406L8.40905 10.2264L8.40789 17.9983L7.78464 17.9983L0.0148056 17.9981L0.0140433 10.226L0.0117188 9.60932L7.79259 9.60987Z"
                        fill="#FF6900"/>
                </svg>
            </button>
            <button
                type="button"
                className={`${styles.button} ${value === 'list' ? styles.active : ''}`}
                onClick={() => onChange('list')}
                aria-label="Список"
            >
                <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="1.5" cy="1.5" r="1.5" fill="#A4AFB7"/>
                    <path
                        d="M16.5 0.25C17.0523 0.25 17.5 0.809644 17.5 1.5C17.5 2.19036 17.0523 2.75 16.5 2.75H5.5C4.94772 2.75 4.5 2.19036 4.5 1.5C4.5 0.809644 4.94772 0.25 5.5 0.25H16.5Z"
                        fill="#A4AFB7"/>
                    <circle cx="1.5" cy="7.5" r="1.5" fill="#A4AFB7"/>
                    <path
                        d="M16.5 6.25C17.0523 6.25 17.5 6.80964 17.5 7.5C17.5 8.19036 17.0523 8.75 16.5 8.75H5.5C4.94772 8.75 4.5 8.19036 4.5 7.5C4.5 6.80964 4.94772 6.25 5.5 6.25H16.5Z"
                        fill="#A4AFB7"/>
                    <circle cx="1.5" cy="13.5" r="1.5" fill="#A4AFB7"/>
                    <path
                        d="M16.5 12.25C17.0523 12.25 17.5 12.8096 17.5 13.5C17.5 14.1904 17.0523 14.75 16.5 14.75H5.5C4.94772 14.75 4.5 14.1904 4.5 13.5C4.5 12.8096 4.94772 12.25 5.5 12.25H16.5Z"
                        fill="#A4AFB7"/>
                </svg>

            </button>
        </div>
    );
};
