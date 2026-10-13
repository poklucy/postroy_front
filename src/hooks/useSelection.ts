import { useMemo, useState, useCallback } from 'react';

interface UseSelectionOptions {
    itemIds: string[];
}

export const useSelection = ({ itemIds }: UseSelectionOptions) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const selected = useMemo(
        () => selectedIds.filter((id) => itemIds.includes(id)),
        [selectedIds, itemIds]
    );

    const allSelected = itemIds.length > 0 && selected.length === itemIds.length;
    const someSelected = selected.length > 0 && !allSelected;

    const toggleAll = useCallback(() => {
        setSelectedIds(allSelected ? [] : itemIds);
    }, [allSelected, itemIds]);

    const toggleOne = useCallback((id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }, []);

    const clear = useCallback(() => setSelectedIds([]), []);

    return {
        selectedIds: selected,
        allSelected,
        someSelected,
        toggleAll,
        toggleOne,
        clear,
    };
};
