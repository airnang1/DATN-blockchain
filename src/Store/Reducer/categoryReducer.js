import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
const baseURL = process.env.REACT_APP_SERVER_API;

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}/category/`,
    }),
    keepUnusedDataFor: 60,
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: ({ category, keyword, numPage }) => {
                let limit = 8;
                return `get-products?category=${category}&keyword=${keyword}&limit=${limit}&page=${
                    numPage ? numPage : 1
                }`;
            },
        }),
        getProductsToStar: builder.mutation({
            query: ({ star, keyword, category }) => ({
                url: `star`,
                method: 'POST',
                body: { star, keyword, category },
            }),
        }),
        getProductsToPrice: builder.mutation({
            query: ({ price, keyword, category }) => ({
                url: `price`,
                method: 'POST',
                body: { price, keyword, category },
            }),
        }),
        getProductsToTrademark: builder.query({
            query: ({ trademarkName, category, numPage }) => {
                let limit = 8;
                return `trademark?trademarkName=${trademarkName}&category=${category}&limit=${limit}&page=${
                    numPage ? numPage : 1
                }`;
            },
        }),
    }),
});

export const {
    useGetAllCategoryQuery,
    useGetProductsToStarMutation,
    useGetProductsToPriceMutation,
    useGetProductsToTrademarkQuery,
} = categoryApi;

const categorySlice = createSlice({
    name: 'category', // ten cua action
    initialState: {
        products: null,
        total: 0,
        isload: false,
        count: 0,
        trademark: null,
    }, // gia tri ban dau cua state
    reducers: {
        handleSetLoadingCategory(state, action) {
            state.isload = action.payload;
        },
        handleSetProducts(state, action) {
            if (action.payload) {
                const { products, total, count, trademark } = action.payload;
                state.products = products;
                state.total = total;
                state.count = count;
                if (trademark) {
                    state.trademark = trademark;
                }
                state.isload = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            categoryApi.endpoints.getAllCategory.matchFulfilled,
            (state, action) => {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.count = action.payload.count;
                state.trademark = action.payload.trademark;
                state.isload = false;
            },
        );
        builder.addMatcher(
            categoryApi.endpoints.getProductsToStar.matchFulfilled,
            (state, action) => {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.count = action.payload.products.length;
                state.isload = false;
            },
        );
        builder.addMatcher(
            categoryApi.endpoints.getProductsToPrice.matchFulfilled,
            (state, action) => {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.count = action.payload.products.length;
                state.isload = false;
            },
        );
        builder.addMatcher(
            categoryApi.endpoints.getProductsToTrademark.matchFulfilled,
            (state, action) => {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.count = action.payload.products.length;
                state.isload = false;
            },
        );
    },
});

const categoryReducer = categorySlice.reducer;

export const categorySelector = (state) => state.categoryReducer;
export const { handleSetLoadingCategory, handleSetProducts } =
    categorySlice.actions;
export default categoryReducer;
