import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCompareItems, clearCompare } from '@/store/slices/compare';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyState } from '@/components/common/EmptyState';
import { Switch } from '@/components/common/Switch';
import { CompareColumn } from './components/CompareColumn';
import {
    ALL_TAB,
    AVAILABILITY_KEY,
    buildRows,
    buildTabs,
    filterByTab,
    pluralizeProducts,
} from './compare.utils';
import styles from './ComparePage.module.css';

const VISIBLE_COLUMNS = 2;

const shiftSlot = (slots: number[], slotIndex: number, step: number, total: number) => {
    const occupied = slots.filter((_, i) => i !== slotIndex);
    let next = slots[slotIndex];
    do {
        next = (next + step + total) % total;
    } while (occupied.includes(next));
    return slots.map((value, i) => (i === slotIndex ? next : value));
};

export const ComparePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectCompareItems);

    const tabs = useMemo(() => buildTabs(items), [items]);
    const [selectedTab, setSelectedTab] = useState(() => tabs[1]?.id ?? ALL_TAB);
    const activeTab = tabs.some(t => t.id === selectedTab) ? selectedTab : ALL_TAB;
    const [onlyDiff, setOnlyDiff] = useState(false);

    const visibleItems = useMemo(() => filterByTab(items, activeTab), [items, activeTab]);
    const visibleKey = visibleItems.map(item => item.id).join('|');
    const [slots, setSlots] = useState<number[]>([0, 1]);

    useEffect(() => {
        setSlots([0, 1]);
    }, [visibleKey]);

    const columnsCount = Math.min(VISIBLE_COLUMNS, visibleItems.length);
    const displayed = useMemo(
        () => slots.slice(0, columnsCount).map(index => visibleItems[index]).filter(Boolean),
        [slots, columnsCount, visibleItems]
    );
    const rows = useMemo(() => buildRows(displayed, activeTab, onlyDiff), [displayed, activeTab, onlyDiff]);
    const canNavigate = visibleItems.length > columnsCount;

    const handleClear = () => {
        if (window.confirm('Очистить список сравнения?')) {
            dispatch(clearCompare());
        }
    };

    if (items.length === 0) {
        return (
            <EmptyState
                icon={
                    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8.5" cy="7.5" r="6" stroke="#FF6900" />
                        <circle cx="14.5" cy="14.5" r="6" stroke="#FF6900" />
                    </svg>
                }
                title="Нет товаров для сравнения."
                description="Добавьте товары для сравнения из каталога."
            />
        );
    }

    return (
        <div className={`page ${styles.comparePage}`}>
            <Breadcrumbs />

            <div className={styles.header}>
                <h1>В сравнении {items.length} {pluralizeProducts(items.length)}</h1>
                <button type="button" className={styles.clearButton} onClick={handleClear}>
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
                        <path d="M1 4H15M5.5 4V1.5H10.5V4M3 4L3.8 16.5H12.2L13 4M6.5 7V13.5M9.5 7V13.5" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
                    </svg>
                    <span>Очистить список</span>
                </button>
            </div>

            <div className={styles.toolbar}>
                <div className={styles.tabs} role="tablist">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={tab.id === activeTab}
                            className={`${styles.tab} ${tab.id === activeTab ? styles.tabActive : ''}`}
                            onClick={() => setSelectedTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <Switch checked={onlyDiff} onChange={setOnlyDiff}>Показать только различия</Switch>
            </div>

            <div className={styles.columns}>
                {displayed.map((item, slotIndex) => (
                    <CompareColumn
                        key={`${slotIndex}-${item.id}`}
                        item={item}
                        position={slots[slotIndex] + 1}
                        total={visibleItems.length}
                        canNavigate={canNavigate}
                        onPrev={() => setSlots(prev => shiftSlot(prev.slice(0, columnsCount), slotIndex, -1, visibleItems.length))}
                        onNext={() => setSlots(prev => shiftSlot(prev.slice(0, columnsCount), slotIndex, 1, visibleItems.length))}
                    />
                ))}
            </div>

            <div className={styles.specs}>
                {rows.map(row => (
                    <div key={row.key} className={styles.specRow}>
                        <span className={styles.specLabel}>{row.label}</span>
                        <div className={styles.columns}>
                            {row.values.map((value, index) => (
                                <span key={index} className={styles.specValue}>
                                    {row.key === AVAILABILITY_KEY && displayed[index]?.inStock && (
                                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                                            <circle cx="6.5" cy="6.5" r="5.9" stroke="#1BB21B" strokeWidth="1.2" />
                                            <path d="M4 6.6L5.8 8.3L9 5" stroke="#1BB21B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    {value}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                {rows.length === 0 && <p className={styles.noDiff}>Различий между товарами нет</p>}
            </div>
        </div>
    );
};
