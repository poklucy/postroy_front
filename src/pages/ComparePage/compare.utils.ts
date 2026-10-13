import { ProductCard } from '@/types/product.types';

export type SpecValue = string | number | boolean | undefined;

export interface CompareRow {
    key: string;
    label: string;
    order: number;
    values: SpecValue[];
}

export interface CompareTab {
    id: string;
    label: string;
}

export const ALL_TAB = 'all';
export const AVAILABILITY_KEY = 'availability';
const COMMON_GROUP = 'common';
const SERVICE_KEYS = [AVAILABILITY_KEY, 'delivery'];

const GROUP_LABELS: Record<string, string> = {
    waterheaters: 'Водонагреватели',
    tools: 'Ручной инструмент',
};

export const buildTabs = (items: ProductCard[]): CompareTab[] => {
    const groups = new Set<string>();
    items.forEach(item => {
        item.compareSpecs?.forEach(spec => {
            if (spec.group && spec.group !== COMMON_GROUP) groups.add(spec.group);
        });
    });

    return [
        { id: ALL_TAB, label: 'Все' },
        ...Array.from(groups).map(group => ({ id: group, label: GROUP_LABELS[group] ?? group })),
    ];
};

export const filterByTab = (items: ProductCard[], tab: string) =>
    tab === ALL_TAB ? items : items.filter(item => item.compareSpecs?.some(spec => spec.group === tab));

const formatValue = (value: SpecValue) => {
    if (typeof value === 'boolean') return value ? 'Да' : 'Нет';
    if (value === undefined || value === '') return '—';
    return String(value);
};

export const buildRows = (items: ProductCard[], tab: string, onlyDiff: boolean): CompareRow[] => {
    const rows = new Map<string, CompareRow>();

    rows.set(AVAILABILITY_KEY, {
        key: AVAILABILITY_KEY,
        label: 'Наличие',
        order: 0,
        values: items.map(item => (item.inStock ? 'в наличии' : 'нет в наличии')),
    });
    rows.set('delivery', {
        key: 'delivery',
        label: 'Доставка',
        order: 1,
        values: items.map(item => (item.inStock ? 'Сегодня' : 'Под заказ')),
    });

    items.forEach((item, index) => {
        item.compareSpecs?.forEach(spec => {
            if (SERVICE_KEYS.includes(spec.key)) return;
            if (tab !== ALL_TAB && spec.group !== tab && spec.group !== COMMON_GROUP) return;

            if (!rows.has(spec.key)) {
                rows.set(spec.key, {
                    key: spec.key,
                    label: spec.label,
                    order: spec.order ?? 999,
                    values: new Array(items.length).fill(undefined),
                });
            }
            rows.get(spec.key)!.values[index] = spec.unit ? `${spec.value} ${spec.unit}` : spec.value;
        });
    });

    let list = Array.from(rows.values()).map(row => ({ ...row, values: row.values.map(formatValue) }));

    if (onlyDiff && items.length > 1) {
        list = list.filter(row => new Set(row.values).size > 1);
    }

    return list.sort((a, b) => a.order - b.order);
};

export const pluralizeProducts = (count: number) => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return 'товар';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'товара';
    return 'товаров';
};
