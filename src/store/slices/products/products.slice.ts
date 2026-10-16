import { createSlice } from '@reduxjs/toolkit';
import { Product, ProductFilters } from '@/types/product.types';
import { IDLE_REQUEST, RequestError, RequestState } from '@/types/request.types';
import { productsApi } from '@/api/products.api';
import { createApiThunk, getRejectedError } from '@/store/createApiThunk';

interface ProductRequest extends RequestState {
    slug: string | null;
}

interface SearchRequest extends RequestState {
    query: string;
}

interface ProductsState {
    byGroup: Record<string, Product[]>;
    byCategory: Record<string, Product[]>;
    listRequests: Record<string, RequestState>;
    currentProduct: Product | null;
    productRequest: ProductRequest;
    relatedProducts: Product[];
    relatedRequest: RequestState;
    searchResults: Product[];
    searchRequest: SearchRequest;
}

const initialState: ProductsState = {
    byGroup: {},
    byCategory: {},
    listRequests: {},
    currentProduct: null,
    productRequest: { ...IDLE_REQUEST, slug: null },
    relatedProducts: [],
    relatedRequest: IDLE_REQUEST,
    searchResults: [],
    searchRequest: { ...IDLE_REQUEST, query: '' },
};

export const groupListKey = (groupId: string) => `group:${groupId}`;
export const categoryListKey = (categoryId: string) => `category:${categoryId}`;

export const fetchProductsByGroup = createApiThunk(
    'products/fetchByGroup',
    async ({ groupId, filters }: { groupId: string; filters?: ProductFilters }) => ({
        groupId,
        products: await productsApi.getByGroup(groupId, filters),
    })
);

export const fetchProductsByCategory = createApiThunk(
    'products/fetchByCategory',
    async ({ categoryId, filters }: { categoryId: string; filters?: ProductFilters }) => ({
        categoryId,
        products: await productsApi.getByCategory(categoryId, filters),
    })
);

export const fetchProductBySlug = createApiThunk(
    'products/fetchBySlug',
    (slug: string) => productsApi.getBySlug(slug)
);

export const fetchRelatedProducts = createApiThunk(
    'products/fetchRelated',
    ({ productId, limit }: { productId: string; limit?: number }) => productsApi.getRelated(productId, limit)
);

export const searchProducts = createApiThunk(
    'products/search',
    (query: string) => productsApi.search(query)
);

const loading = (): RequestState => ({ status: 'loading', error: null });
const succeeded = (): RequestState => ({ status: 'succeeded', error: null });
const failed = (error: RequestError): RequestState => ({ status: 'failed', error });

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByGroup.pending, (state, action) => {
                state.listRequests[groupListKey(action.meta.arg.groupId)] = loading();
            })
            .addCase(fetchProductsByGroup.fulfilled, (state, action) => {
                const { groupId, products } = action.payload;
                state.byGroup[groupId] = products;
                state.listRequests[groupListKey(groupId)] = succeeded();
            })
            .addCase(fetchProductsByGroup.rejected, (state, action) => {
                state.listRequests[groupListKey(action.meta.arg.groupId)] = failed(getRejectedError(action));
            })

            .addCase(fetchProductsByCategory.pending, (state, action) => {
                state.listRequests[categoryListKey(action.meta.arg.categoryId)] = loading();
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                const { categoryId, products } = action.payload;
                state.byCategory[categoryId] = products;
                state.listRequests[categoryListKey(categoryId)] = succeeded();
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.listRequests[categoryListKey(action.meta.arg.categoryId)] = failed(getRejectedError(action));
            })

            .addCase(fetchProductBySlug.pending, (state, action) => {
                state.productRequest = { ...loading(), slug: action.meta.arg };
            })
            .addCase(fetchProductBySlug.fulfilled, (state, action) => {
                if (state.productRequest.slug !== action.meta.arg) return;
                state.currentProduct = action.payload;
                state.productRequest = { ...succeeded(), slug: action.meta.arg };
            })
            .addCase(fetchProductBySlug.rejected, (state, action) => {
                if (state.productRequest.slug !== action.meta.arg) return;
                state.productRequest = { ...failed(getRejectedError(action)), slug: action.meta.arg };
            })

            .addCase(fetchRelatedProducts.pending, (state) => {
                state.relatedRequest = loading();
            })
            .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
                state.relatedProducts = action.payload;
                state.relatedRequest = succeeded();
            })
            .addCase(fetchRelatedProducts.rejected, (state, action) => {
                state.relatedRequest = failed(getRejectedError(action));
            })

            .addCase(searchProducts.pending, (state, action) => {
                state.searchRequest = { ...loading(), query: action.meta.arg };
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                if (state.searchRequest.query !== action.meta.arg) return;
                state.searchResults = action.payload;
                state.searchRequest = { ...succeeded(), query: action.meta.arg };
            })
            .addCase(searchProducts.rejected, (state, action) => {
                if (state.searchRequest.query !== action.meta.arg) return;
                state.searchRequest = { ...failed(getRejectedError(action)), query: action.meta.arg };
            });
    },
});

export default productsSlice.reducer;
