import { RootState } from '@/store';

export const selectAllCategoriesWithHierarchy = (state: RootState) => state.categories.itemsWithHierarchy;
export const selectCategoriesListRequest = (state: RootState) => state.categories.listRequest;
export const selectCurrentHierarchy = (state: RootState) => state.categories.currentHierarchy;
export const selectHierarchyRequest = (state: RootState) => state.categories.hierarchyRequest;
