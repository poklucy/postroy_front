import React, { useEffect, useState } from 'react';
import Slider from '@rc-component/slider';
import '@rc-component/slider/assets/index.css';
import { Button } from '@/components/common/Button';
import { Checkbox } from '@/components/common/Checkbox';
import { pluralizeProducts } from '@/utils/helpers';
import { FILTER_GROUPS, FILTER_TAGS } from './filters.config';
import { CatalogFilters } from './useCatalogFilters';
import styles from './FilterPanel.module.css';

interface FilterProps {
    filters: CatalogFilters;
    totalCount?: number;
    className?: string;
}

const CloseSmallIcon: React.FC = () => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
        <path
            d="M4.7079 4.00205L7.8579 0.857046C7.95205 0.762894 8.00495 0.635197 8.00495 0.502046C8.00495 0.368895 7.95205 0.241198 7.8579 0.147046C7.76375 0.052894 7.63605 0 7.5029 0C7.36975 0 7.24205 0.052894 7.1479 0.147046L4.0029 3.29705L0.857899 0.147046C0.763747 0.052894 0.63605 1.18217e-07 0.502899 1.19209e-07C0.369748 1.20201e-07 0.242051 0.052894 0.147899 0.147046C0.0537473 0.241198 0.00085342 0.368895 0.000853419 0.502046C0.000853418 0.635197 0.0537473 0.762894 0.147899 0.857046L3.2979 4.00205L0.147899 7.14705C0.101035 7.19353 0.0638379 7.24883 0.0384536 7.30976C0.0130692 7.37069 0 7.43604 0 7.50204C0 7.56805 0.0130692 7.6334 0.0384536 7.69433C0.0638379 7.75526 0.101035 7.81056 0.147899 7.85704C0.194381 7.90391 0.249681 7.94111 0.310611 7.96649C0.37154 7.99188 0.436893 8.00494 0.502899 8.00494C0.568905 8.00494 0.634258 7.99188 0.695188 7.96649C0.756117 7.94111 0.811418 7.90391 0.857899 7.85704L4.0029 4.70705L7.1479 7.85704C7.19438 7.90391 7.24968 7.94111 7.31061 7.96649C7.37154 7.99188 7.43689 8.00494 7.5029 8.00494C7.56891 8.00494 7.63426 7.99188 7.69519 7.96649C7.75612 7.94111 7.81142 7.90391 7.8579 7.85704C7.90476 7.81056 7.94196 7.75526 7.96735 7.69433C7.99273 7.6334 8.0058 7.56805 8.0058 7.50204C8.0058 7.43604 7.99273 7.37069 7.96735 7.30976C7.94196 7.24883 7.90476 7.19353 7.8579 7.14705L4.7079 4.00205Z"
            fill="#A4AFB7"
        />
    </svg>
);

const FilterChips: React.FC<{ filters: CatalogFilters }> = ({ filters }) =>
    filters.chips.length > 0 ? (
        <div className={styles.chips}>
            {filters.chips.map(chip => (
                <button
                    key={`${chip.group}-${chip.value}`}
                    className={styles.chip}
                    onClick={() => filters.toggle(chip.group, chip.value, false)}
                    type="button"
                    aria-label={`Убрать фильтр «${chip.label}»`}
                >
                    {chip.label}{' '}
                    <span className={styles.chipX}><CloseSmallIcon /></span>
                </button>
            ))}
        </div>
    ) : null;

export const FilterSummary: React.FC<FilterProps> = ({ filters, totalCount = 0, className }) => (
    <div className={className}>
        <div className={styles.header}>
            <span className={styles.total}>
                Найдено товаров: <b>{totalCount.toLocaleString('ru-RU')}</b>
            </span>
            <button className={styles.reset} onClick={filters.reset} type="button">
                Сбросить все
            </button>
        </div>
        <FilterChips filters={filters} />
    </div>
);

const FilterGroups: React.FC<{ filters: CatalogFilters }> = ({ filters }) => {
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
        Object.fromEntries(FILTER_GROUPS.map(group => [group.id, Boolean(group.defaultOpen)]))
    );

    const toggleGroup = (id: string) => setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }));
    const [priceMin, priceMax] = filters.priceRange;

    return (
        <>
            {FILTER_GROUPS.map(group => {
                const isOpen = openGroups[group.id];
                return (
                    <div key={group.id} className={styles.group}>
                        <button
                            className={styles.groupHeader}
                            onClick={() => toggleGroup(group.id)}
                            type="button"
                            aria-expanded={isOpen}
                        >
                            <span>{group.title}</span>
                            <svg
                                className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {isOpen && (
                            <div className={styles.groupBody}>
                                {group.type === 'price' ? (
                                    <div className={styles.priceRangeWrapper}>
                                        <Slider
                                            range
                                            min={group.min!}
                                            max={group.max!}
                                            step={100}
                                            value={filters.priceRange}
                                            onChange={val => filters.setPriceRange(val as [number, number])}
                                            styles={{
                                                track: { backgroundColor: '#ea6a12' },
                                                handle: { borderColor: '#ea6a12', backgroundColor: '#ea6a12' },
                                                rail: { backgroundColor: '#eee' },
                                            }}
                                        />
                                        <div className={styles.priceLabels}>
                                            <span>{priceMin.toLocaleString('ru-RU')}</span>
                                            <span>{priceMax.toLocaleString('ru-RU')}</span>
                                        </div>
                                    </div>
                                ) : group.options?.length ? (
                                    <ul className={styles.options}>
                                        {group.options.map(opt => (
                                            <li key={opt.value}>
                                                <Checkbox
                                                    className={styles.option}
                                                    checked={filters.isChecked(group.id, opt.value)}
                                                    onChange={next => filters.toggle(group.id, opt.value, next)}
                                                    disabled={opt.disabled}
                                                    label={opt.label}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        )}
                    </div>
                );
            })}

            <div className={styles.group}>
                <div className={styles.groupHeaderStatic}>Часто ищут</div>
                <div className={styles.tags}>
                    {FILTER_TAGS.map(tag => (
                        <button key={tag} className={styles.tag} type="button">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export const FilterPanel: React.FC<FilterProps> = ({ filters, totalCount, className }) => (
    <aside className={[styles.panel, className].filter(Boolean).join(' ')}>
        <FilterSummary filters={filters} totalCount={totalCount} />
        <FilterGroups filters={filters} />
    </aside>
);

interface FilterDrawerProps extends FilterProps {
    open: boolean;
    onClose: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({ filters, totalCount = 0, open, onClose }) => {
    useEffect(() => {
        if (!open) return;
        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';
        const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = overflow;
            window.removeEventListener('keydown', handleKey);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Фильтры">
            <div className={styles.drawerHeader}>
                <span className={styles.drawerTitle}>Фильтры</span>
                <button className={styles.drawerReset} onClick={filters.reset} type="button">
                    Сбросить все
                </button>
                <button className={styles.drawerClose} onClick={onClose} type="button" aria-label="Закрыть фильтры">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            <div className={`${styles.panel} ${styles.drawerBody}`}>
                <FilterChips filters={filters} />
                <FilterGroups filters={filters} />
            </div>

            <div className={styles.drawerFooter}>
                <Button variant="outline" size="lg" fullWidth onClick={onClose}>
                    Посмотреть {totalCount.toLocaleString('ru-RU')} {pluralizeProducts(totalCount)}
                </Button>
            </div>
        </div>
    );
};
