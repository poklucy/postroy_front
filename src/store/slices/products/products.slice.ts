import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductFilters } from '@/types/product.types';
import { productsApi } from '@/api/products.api';

interface ProductsState {
    byGroup: Record<string, Product[]>;
    byCategory: Record<string, Product[]>;
    currentProduct: Product | null;
    relatedProducts: Product[];
    isLoading: boolean;
    error: string | null;
    searchResults: Product[];
}

const initialState: ProductsState = {
    byGroup: {},
    byCategory: {},
    currentProduct: null,
    relatedProducts: [],
    isLoading: false,
    error: null,
    searchResults: [],
};

export const fetchProductsByGroup = createAsyncThunk(
    'products/fetchByGroup',
    async ({ groupId, filters }: { groupId: string; filters?: ProductFilters }) => {
        const products = await productsApi.getByGroup(groupId, filters);
        return { groupId, products };
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async ({ categoryId, filters }: { categoryId: string; filters?: ProductFilters }) => {
        const products = await productsApi.getByCategory(categoryId, filters);
        return { categoryId, products };
    }
);

export const fetchProductBySlug = createAsyncThunk(
    'products/fetchBySlug',
    async (slug: string) => {
        const product = await productsApi.getBySlug(slug);
        return product;
    }
);

export const fetchRelatedProducts = createAsyncThunk(
    'products/fetchRelated',
    async ({ productId, limit }: { productId: string; limit?: number }) => {
        const products = await productsApi.getRelated(productId, limit);
        return products;
    }
);

export const searchProducts = createAsyncThunk(
    'products/search',
    async (query: string) => {
        const results = await productsApi.search(query);
        return results;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
            state.relatedProducts = [];
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
        },
        clearCategoryProducts: (state) => {
            state.byCategory = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByGroup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductsByGroup.fulfilled, (state, action) => {
                state.isLoading = false;
                const { groupId, products } = action.payload;
                state.byGroup[groupId] = products;
            })
            .addCase(fetchProductsByGroup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка загрузки товаров';
            })

            .addCase(fetchProductsByCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                const { categoryId, products } = action.payload;
                state.byCategory[categoryId] = products;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка загрузки товаров категории';
            })

            .addCase(fetchProductBySlug.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductBySlug.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductBySlug.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка загрузки товара';
            })

            .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
                state.relatedProducts = action.payload;
            })

            .addCase(searchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Ошибка поиска';
            });
    },
});

export const { clearCurrentProduct, clearSearchResults, clearCategoryProducts } = productsSlice.actions;
export default productsSlice.reducer;
