import { useCallback, useMemo, useState } from 'react';
import { DEFAULT_CHECKED, DEFAULT_PRICE_RANGE, FILTER_GROUPS } from './filters.config';

export interface FilterChip {
    group: string;
    value: string;
    label: string;
}

export const useCatalogFilters = () => {
    const [checked, setChecked] = useState<Record<string, string[]>>(DEFAULT_CHECKED);
    const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_PRICE_RANGE);

    const toggle = useCallback((groupId: string, value: string, next: boolean) => {
        setChecked(prev => {
            const list = prev[groupId] ?? [];
            const updated = next ? [...list, value] : list.filter(v => v !== value);
            return { ...prev, [groupId]: updated };
        });
    }, []);

    const reset = useCallback(() => {
        setChecked({});
        setPriceRange(DEFAULT_PRICE_RANGE);
    }, []);

    const chips = useMemo<FilterChip[]>(
        () =>
            FILTER_GROUPS.flatMap(group =>
                (checked[group.id] ?? []).flatMap(value => {
                    const option = group.options?.find(o => o.value === value);
                    return option ? [{ group: group.id, value, label: option.label }] : [];
                })
            ),
        [checked]
    );

    const isChecked = useCallback(
        (groupId: string, value: string) => (checked[groupId] ?? []).includes(value),
        [checked]
    );

    return { checked, isChecked, toggle, priceRange, setPriceRange, reset, chips };
};

export type CatalogFilters = ReturnType<typeof useCatalogFilters>;
