import { createSlice } from '@reduxjs/toolkit';
import { CategoryWithHierarchy } from '@/types/category.types';
import { IDLE_REQUEST, RequestState } from '@/types/request.types';
import { categoriesApi } from '@/api/categories.api';
import { createApiThunk, getRejectedError } from '@/store/createApiThunk';

interface HierarchyRequest extends RequestState {
  slug: string | null;
}

interface CategoriesState {
  itemsWithHierarchy: CategoryWithHierarchy[];
  listRequest: RequestState;
  currentHierarchy: CategoryWithHierarchy | null;
  hierarchyRequest: HierarchyRequest;
}

const initialState: CategoriesState = {
  itemsWithHierarchy: [],
  listRequest: IDLE_REQUEST,
  currentHierarchy: null,
  hierarchyRequest: { ...IDLE_REQUEST, slug: null },
};

export const fetchAllCategoriesWithHierarchy = createApiThunk(
    'categories/fetchAllWithHierarchy',
    () => categoriesApi.getAllWithHierarchy(),
    {
      condition: (_, { getState }) =>
        (getState() as { categories: CategoriesState }).categories.listRequest.status !== 'loading',
    }
);

export const fetchCategoryHierarchy = createApiThunk(
    'categories/fetchHierarchy',
    (slug: string) => categoriesApi.getHierarchy(slug)
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchAllCategoriesWithHierarchy.pending, (state) => {
          state.listRequest = { status: 'loading', error: null };
        })
        .addCase(fetchAllCategoriesWithHierarchy.fulfilled, (state, action) => {
          state.itemsWithHierarchy = action.payload;
          state.listRequest = { status: 'succeeded', error: null };
        })
        .addCase(fetchAllCategoriesWithHierarchy.rejected, (state, action) => {
          state.listRequest = { status: 'failed', error: getRejectedError(action) };
        })

        .addCase(fetchCategoryHierarchy.pending, (state, action) => {
          state.hierarchyRequest = { status: 'loading', error: null, slug: action.meta.arg };
        })
        .addCase(fetchCategoryHierarchy.fulfilled, (state, action) => {
          if (state.hierarchyRequest.slug !== action.meta.arg) return;
          state.currentHierarchy = action.payload;
          state.hierarchyRequest = { status: 'succeeded', error: null, slug: action.meta.arg };
        })
        .addCase(fetchCategoryHierarchy.rejected, (state, action) => {
          if (state.hierarchyRequest.slug !== action.meta.arg) return;
          state.hierarchyRequest = { status: 'failed', error: getRejectedError(action), slug: action.meta.arg };
        });
  },
});

export default categoriesSlice.reducer;
