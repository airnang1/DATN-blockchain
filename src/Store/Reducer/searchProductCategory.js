import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const url = process.env.REACT_APP_SERVER_API;

export const getSearchProductCategoryApi = createAsyncThunk(
    'getSearchProductCategory/getSearchProductCategoryFetch',
    async ({ keyword, numPage }) => {
        let limit = 8;
        try {
            const res = await axios.get(
                `${url}/products/search?keyword=${keyword}`,
                {
                    params: {
                        limit,
                        page: numPage ? numPage : 1,
                    },
                },
            );
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Tìm kiếm thất bại!');
        }
    },
);

export const changeRateStar = createAsyncThunk(
    'changeRateStar/changeRateStarCategoryFetch',
    async ({ star, keyword }) => {
        try {
            const res = await axios.get(
                `${url}/products/star?star=${star}&keyword=${keyword}`,
            );

            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Tìm kiếm thất bại!');
        }
    },
);

export const onChangePriceProduct = createAsyncThunk(
    'onChangePriceProduct/onChangePriceProductFetch',
    async ({ price, keyword }) => {
        try {
            const res = await axios.get(
                `${url}/products/price?keyword=${keyword}`,
                { params: price },
            );
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Tìm kiếm thất bại!');
        }
    },
);

export const getProductsToCategory = createAsyncThunk(
    'getProductsToCategory/getProductsToCategoryFetch',
    async ({ productId, search }) => {
        try {
            let limit = 4;
            let value = search ? search : `?page=${1}`;
            const res = await axios.get(
                `${url}/products/${productId}${value}&limit=${limit}`,
            );
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Lấy sản phẩm thất bại');
        }
    },
);

const searchProductCategorySlice = createSlice({
    name: 'productsCategory', // ten cua action
    initialState: {
        products: null,
        total: 0,
        isload: false,
        count: 0,
    }, // gia tri ban dau cua state
    reducers: {
        handleSetIsLoad(state, action) {
            state.isload = action.payload;
        },
    },
    extraReducers: {
        [getSearchProductCategoryApi.pending]: (state, action) => {},
        [getSearchProductCategoryApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.count = action.payload.count;
                state.isload = false;
            }
            // state.total = action.payload.total;
            // state.totalCmt = action.payload.totalCmt;
        },
        [getSearchProductCategoryApi.rejected]: (state, action) => {},
        [changeRateStar.pending]: (state, action) => {},
        [changeRateStar.fulfilled]: (state, action) => {
            if (action.payload) {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.count = action.payload.products.length;
                state.isload = false;
            }
        },
        [changeRateStar.rejected]: (state, action) => {},

        [onChangePriceProduct.pending]: (state, action) => {},
        [onChangePriceProduct.fulfilled]: (state, action) => {
            if (action.payload) {
                state.products = action.payload.products;
                state.total = action.payload.total;
                state.count = action.payload.products.length;
                state.isload = false;
            }
        },
        [onChangePriceProduct.rejected]: (state, action) => {},

        // [sortProductByPrice.pending]: (state, action) => {},
        // [sortProductByPrice.fulfilled]: (state, action) => {
        //     if (action.payload) {
        //         state.products = action.payload.products;
        //         state.total = action.payload.total;
        //         state.count = action.payload.products.length;
        //         state.isload = false;
        //     }
        // },
        // [sortProductByPrice.rejected]: (state, action) => {},
    },
});

const searchProductCategoryReducer = searchProductCategorySlice.reducer;

export const searchProductCategorySelector = (state) =>
    state.searchProductCategoryReducer;

export const { handleSetIsLoad } = searchProductCategorySlice.actions;

export default searchProductCategoryReducer;
