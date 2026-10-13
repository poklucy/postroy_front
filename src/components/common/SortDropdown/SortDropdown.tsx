import React from 'react';
import { Dropdown, DropdownOption } from '@/components/common/Dropdown';

export type SortValue = 'popular' | 'price_asc' | 'price_desc' | 'newest';

const SORT_OPTIONS: DropdownOption<SortValue>[] = [
    { value: 'popular', label: 'По популярности' },
    { value: 'price_asc', label: 'По возрастанию цены' },
    { value: 'price_desc', label: 'По убыванию цены' },
    { value: 'newest', label: 'По новинкам' },
];

const SortIcon = () => (
    <svg aria-hidden="true" width="20" height="14" viewBox="0 0 20 14" fill="none">
        <g opacity="0.8">
            <path
                d="M3.84602 0C4.27086 2.27494e-08 4.61526 0.348223 4.61526 0.777778V12.1751C4.68254 12.1239 4.74623 12.0652 4.80456 11.9988L6.34804 10.2428C6.63025 9.92176 7.11626 9.8927 7.43379 10.178C7.75128 10.4633 7.78002 10.9547 7.49789 11.2758L5.95441 13.0318C5.42976 13.6286 4.71887 13.9462 3.99626 13.9848C3.94775 13.9945 3.89735 14 3.84602 14C3.79469 14 3.74429 13.9945 3.69578 13.9848C2.97317 13.9461 2.26228 13.6286 1.73763 13.0318L0.194147 11.2758C-0.0879743 10.9547 -0.0592339 10.4633 0.25825 10.178C0.57578 9.89269 1.06179 9.92175 1.344 10.2428L2.88748 11.9988C2.9458 12.0652 3.00951 12.1239 3.07678 12.1751V0.777778C3.07678 0.348223 3.42118 0 3.84602 0Z"
                fill="black"/>
            <path
                d="M19.2308 12.4444C19.6556 12.4444 20 12.7927 20 13.2222C20 13.6518 19.6556 14 19.2308 14H9.99992C9.57508 14 9.23068 13.6518 9.23068 13.2222C9.23068 12.7927 9.57508 12.4444 9.99992 12.4444H19.2308Z"
                fill="black"/>
            <path
                d="M16.1538 6.22222C16.5787 6.22222 16.9231 6.57045 16.9231 7C16.9231 7.42955 16.5787 7.77778 16.1538 7.77778H9.99992C9.57508 7.77778 9.23068 7.42955 9.23068 7C9.23068 6.57045 9.57508 6.22222 9.99992 6.22222H16.1538Z"
                fill="black"/>
            <path
                d="M13.0769 0C13.5017 0 13.8461 0.348223 13.8461 0.777778C13.8461 1.20733 13.5017 1.55556 13.0769 1.55556H9.99992C9.57508 1.55556 9.23068 1.20733 9.23068 0.777778C9.23068 0.348223 9.57508 0 9.99992 0H13.0769Z"
                fill="black"/>
        </g>
    </svg>
);

interface SortDropdownProps {
    value?: SortValue;
    onChange?: (value: SortValue) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value = 'popular', onChange }) => (
    <Dropdown
        options={SORT_OPTIONS}
        value={value}
        onChange={(next) => onChange?.(next)}
        icon={<SortIcon />}
        ariaLabel="Сортировка"
    />
);
