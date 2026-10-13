import React, { useState } from 'react';
import Slider from '@rc-component/slider';
import '@rc-component/slider/assets/index.css';
import { Checkbox } from '@/components/common/Checkbox';
import styles from './FilterPanel.module.css';

interface FilterOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface FilterGroup {
    id: string;
    title: string;
    type: 'checkbox' | 'price';
    options?: FilterOption[];
    min?: number;
    max?: number;
}

const FILTER_GROUPS: FilterGroup[] = [
    {
        id: 'brand',
        title: 'Бренд',
        type: 'checkbox',
        options: [
            { value: 'aquali', label: 'Aqualink' },
            { value: 'ballu', label: 'Ballu' },
            { value: 'edisson', label: 'Edisson' },
            { value: 'electrolux', label: 'Electrolux' },
            { value: 'thermex', label: 'Thermex' },
        ],
    },
    { id: 'price', title: 'Цена', type: 'price', min: 5000, max: 10000 },
    {
        id: 'color',
        title: 'Цвет',
        type: 'checkbox',
        options: [
            { value: 'white', label: 'Белый' },
            { value: 'graphite', label: 'Графит' },
            { value: 'grey', label: 'Серый', disabled: true },
        ],
    },
    {
        id: 'stock',
        title: 'Наличие в магазине',
        type: 'checkbox',
        options: [
            { value: 'taganka', label: 'На Таганке' },
            { value: 'vyatskaya', label: 'На Вятской', disabled: true },
        ],
    },
    {
        id: 'volume',
        title: 'Объем бака, л',
        type: 'checkbox',
        options: [
            { value: '10', label: '10' },
            { value: '20', label: '20' },
            { value: '30', label: '30' },
            { value: '50', label: '50' },
            { value: '75', label: '75' },
            { value: '100', label: '100', disabled: true },
        ],
    },
    {
        id: 'view',
        title: 'Вид',
        type: 'checkbox',
        options: [
            { value: 'nakopitelny', label: 'Накопительный' },
            { value: 'electric', label: 'Электрический' },
        ],
    },
    {
        id: 'mount',
        title: 'Тип монтажа',
        type: 'checkbox',
        options: [
            { value: 'vertical', label: 'Вертикальный' },
            { value: 'universal', label: 'Универсальный' },
            { value: 'horizontal', label: 'Горизонтальный' },
        ],
    },
    { id: 'tankMaterial', title: 'Материал бака', type: 'checkbox', options: [] },
    { id: 'power', title: 'Мощность, кВт', type: 'checkbox', options: [] },
    { id: 'supply', title: 'Тип подводки', type: 'checkbox', options: [] },
    { id: 'country', title: 'Страна производитель', type: 'checkbox', options: [] },
];

const TAGS = ['Экономичный', 'Большой', 'Компактный', 'Над раковиной'];

interface FilterPanelProps {
    totalCount?: number;
    onReset?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
                                                            totalCount = 1221212,
                                                            onReset,
                                                        }) => {
    const [checked, setChecked] = useState<Record<string, string[]>>({
        brand: ['aquali'],
        color: ['white'],
        stock: ['taganka'],
    });

    const [priceRange, setPriceRange] = useState<[number, number]>([5000, 10000]);

    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
        brand: true,
        price: true,
        color: true,
        stock: true,
        volume: true,
        view: true,
        mount: true,
        tankMaterial: false,
        power: false,
        supply: false,
        country: false,
    });

    const toggleGroup = (id: string) => {
        setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleCheckbox = (groupId: string, value: string, next: boolean) => {
        setChecked((prev) => {
            const list = prev[groupId] ?? [];
            const updated = next ? [...list, value] : list.filter((v) => v !== value);
            return { ...prev, [groupId]: updated };
        });
    };

    const resetAll = () => {
        setChecked({});
        setPriceRange([5000, 10000]);
        onReset?.();
    };

    const activeChips: { group: string; value: string; label: string }[] = [];
    FILTER_GROUPS.forEach((group) => {
        if (group.type === 'checkbox' && group.options) {
            (checked[group.id] ?? []).forEach((val) => {
                const opt = group.options!.find((o) => o.value === val);
                if (opt) activeChips.push({ group: group.id, value: val, label: opt.label });
            });
        }
    });

    const removeChip = (groupId: string, value: string) => {
        toggleCheckbox(groupId, value, false);
    };

    return (
        <aside className={styles.panel}>
            <div className={styles.header}>
        <span className={styles.total}>
          Найдено товаров: <b>{totalCount.toLocaleString('ru-RU')}</b>
        </span>
                <button className={styles.reset} onClick={resetAll} type="button">
                    Сбросить все
                </button>
            </div>

            {activeChips.length > 0 && (
                <div className={styles.chips}>
                    {activeChips.map((chip) => (
                        <button
                            key={`${chip.group}-${chip.value}`}
                            className={styles.chip}
                            onClick={() => removeChip(chip.group, chip.value)}
                            type="button"
                        >
                            {chip.label}{' '}
                            <span className={styles.chipX}>
                <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M4.7079 4.00205L7.8579 0.857046C7.95205 0.762894 8.00495 0.635197 8.00495 0.502046C8.00495 0.368895 7.95205 0.241198 7.8579 0.147046C7.76375 0.052894 7.63605 0 7.5029 0C7.36975 0 7.24205 0.052894 7.1479 0.147046L4.0029 3.29705L0.857899 0.147046C0.763747 0.052894 0.63605 1.18217e-07 0.502899 1.19209e-07C0.369748 1.20201e-07 0.242051 0.052894 0.147899 0.147046C0.0537473 0.241198 0.00085342 0.368895 0.000853419 0.502046C0.000853418 0.635197 0.0537473 0.762894 0.147899 0.857046L3.2979 4.00205L0.147899 7.14705C0.101035 7.19353 0.0638379 7.24883 0.0384536 7.30976C0.0130692 7.37069 0 7.43604 0 7.50204C0 7.56805 0.0130692 7.6334 0.0384536 7.69433C0.0638379 7.75526 0.101035 7.81056 0.147899 7.85704C0.194381 7.90391 0.249681 7.94111 0.310611 7.96649C0.37154 7.99188 0.436893 8.00494 0.502899 8.00494C0.568905 8.00494 0.634258 7.99188 0.695188 7.96649C0.756117 7.94111 0.811418 7.90391 0.857899 7.85704L4.0029 4.70705L7.1479 7.85704C7.19438 7.90391 7.24968 7.94111 7.31061 7.96649C7.37154 7.99188 7.43689 8.00494 7.5029 8.00494C7.56891 8.00494 7.63426 7.99188 7.69519 7.96649C7.75612 7.94111 7.81142 7.90391 7.8579 7.85704C7.90476 7.81056 7.94196 7.75526 7.96735 7.69433C7.99273 7.6334 8.0058 7.56805 8.0058 7.50204C8.0058 7.43604 7.99273 7.37069 7.96735 7.30976C7.94196 7.24883 7.90476 7.19353 7.8579 7.14705L4.7079 4.00205Z"
                      fill="#A4AFB7"
                  />
                </svg>
              </span>
                        </button>
                    ))}
                </div>
            )}

            {FILTER_GROUPS.map((group) => {
                const isOpen = openGroups[group.id];
                return (
                    <div key={group.id} className={styles.group}>
                        <button
                            className={styles.groupHeader}
                            onClick={() => toggleGroup(group.id)}
                            type="button"
                        >
                            <span>{group.title}</span>
                            <svg
                                className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                                width="12"
                                height="8"
                                viewBox="0 0 12 8"
                                fill="none"
                            >
                                <path
                                    d="M1 1L6 6L11 1"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
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
                                            value={priceRange}
                                            onChange={(val) => setPriceRange(val as [number, number])}
                                            styles={{
                                                track: { backgroundColor: '#ea6a12' },
                                                handle: {
                                                    borderColor: '#ea6a12',
                                                    backgroundColor: '#ea6a12',
                                                },
                                                rail: { backgroundColor: '#eee' },
                                            }}
                                        />
                                        <div className={styles.priceLabels}>
                                            <span>{priceRange[0].toLocaleString('ru-RU')}</span>
                                            <span>{priceRange[1].toLocaleString('ru-RU')}</span>
                                        </div>
                                    </div>
                                ) : group.options?.length ? (
                                    <ul className={styles.options}>
                                        {group.options.map((opt) => (
                                            <li key={opt.value}>
                                                <Checkbox
                                                    className={styles.option}
                                                    checked={(checked[group.id] ?? []).includes(opt.value)}
                                                    onChange={(next) => toggleCheckbox(group.id, opt.value, next)}
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
                    {TAGS.map((tag) => (
                        <button key={tag} className={styles.tag} type="button">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};
