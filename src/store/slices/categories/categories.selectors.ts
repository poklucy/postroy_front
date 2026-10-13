import { RootState } from '@/store';

export const selectAllCategoriesWithHierarchy = (state: RootState) => state.categories.itemsWithHierarchy;
export const selectCurrentHierarchy = (state: RootState) => state.categories.currentHierarchy;
export const selectCategoriesListLoading = (state: RootState) => state.categories.isLoadingList;
export const selectHierarchyLoading = (state: RootState) => state.categories.isLoadingHierarchy;
