import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
const baseURL = process.env.REACT_APP_SERVER_API;

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/` }),
    keepUnusedDataFor: 300,
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({ pageNum, limitNum }) =>
                `products?page=${pageNum}&limit=${limitNum}`,
        }),
        postProduct: builder.mutation({
            query: (result) => ({
                url: `products`,
                method: 'POST',
                body: result,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
export const { useGetAllProductsQuery, usePostProductMutation } = productsApi;

const productsSlice = createSlice({
    name: 'products', // ten cua action
    initialState: {
        products: null,
        total: 0,
        hasMore: false,
        loading: true,
        count: 0,
    }, // gia tri ban dau cua state
    reducers: {
        handleSetLoadingSkeleton(state, action) {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            productsApi.endpoints.getAllProducts.matchFulfilled,
            (state, action) => {
                state.products = action.payload.products;
                state.count = action.payload.count;
                state.hasMore = action.payload.products.length > 0;
                state.loading = false;
            },
        );
        
        builder.addMatcher(
            productsApi.endpoints.postProduct.matchFulfilled,
            (state, action) => {
                const product = action.payload;
                if (state.products) {
                    state.products.push(product);
                } else {
                    const productArr = [];
                    productArr.push(product);
                    state.products = productArr;
                }
            },
        );
    },
});

const productsReducer = productsSlice.reducer;

export const productsSelector = (state) => state.productsReducer;
export const { handleSetLoadingSkeleton } = productsSlice.actions;
export default productsReducer;
