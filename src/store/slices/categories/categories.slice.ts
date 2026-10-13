import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryWithHierarchy } from '@/types/category.types';
import { categoriesApi } from '@/api/categories.api';

interface CategoriesState {
  itemsWithHierarchy: CategoryWithHierarchy[];
  currentHierarchy: CategoryWithHierarchy | null;
  isLoadingList: boolean;
  isLoadingHierarchy: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  itemsWithHierarchy: [],
  currentHierarchy: null,
  isLoadingList: false,
  isLoadingHierarchy: false,
  error: null,
};

export const fetchAllCategoriesWithHierarchy = createAsyncThunk(
    'categories/fetchAllWithHierarchy',
    () => categoriesApi.getAllWithHierarchy()
);

export const fetchCategoryHierarchy = createAsyncThunk(
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
          state.isLoadingList = true;
          state.error = null;
        })
        .addCase(fetchAllCategoriesWithHierarchy.fulfilled, (state, action) => {
          state.isLoadingList = false;
          state.itemsWithHierarchy = action.payload;
        })
        .addCase(fetchAllCategoriesWithHierarchy.rejected, (state, action) => {
          state.isLoadingList = false;
          state.error = action.error.message || 'Ошибка загрузки иерархии';
        })

        .addCase(fetchCategoryHierarchy.pending, (state) => {
          state.isLoadingHierarchy = true;
          state.error = null;
        })
        .addCase(fetchCategoryHierarchy.fulfilled, (state, action) => {
          state.isLoadingHierarchy = false;
          state.currentHierarchy = action.payload;
        })
        .addCase(fetchCategoryHierarchy.rejected, (state, action) => {
          state.isLoadingHierarchy = false;
          state.error = action.error.message || 'Ошибка загрузки иерархии';
        });
  },
});

export default categoriesSlice.reducer;
