import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { messageInfoToast } from '../../utils';
const url = process.env.REACT_APP_SERVER_API;

export const getProductsInStore = createAsyncThunk(
    'getProductsInStore/getProductsInStoreFetch',
    async () => {
        try {
            const res = await axios.get(`${url}/products/all`);
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

export const updateDataProductToDB = createAsyncThunk(
    'updateDataProductToDB/updateDataProductToDBFetch',
    async ({ productID, data }) => {
        try {
            await axios.put(`${url}/products/update-data/${productID}`, data);
            messageInfoToast(true, 'Sản phẩm đã được cập nhật thành công');
            return data;
        } catch (err) {
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

export const getProductToPagination = createAsyncThunk(
    'getProductToPagination/getProductToPaginationFetch',
    async ({ search }) => {
        try {
            let limit = 8;
            let value = search ? search : `?page=${1}`;
            const res = await axios.get(
                `${url}/products/pagination${value}&limit=${limit}`,
            );

            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Lấy sản phẩm thất bại');
        }
    },
);

export const removeProductByID = createAsyncThunk(
    'removeProductByID/removeProductByIDFetch',
    async ({ productID }) => {
        try {
            const res = await axios.delete(`${url}/products/${productID}`);
            messageInfoToast(true, `Bạn đã xóa thành công sản phẩm`);
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Xóa sản phẩm thất bại');
        }
    },
);

const productsDBSlice = createSlice({
    name: 'productsDB', // ten cua action
    initialState: {
        productsDB: [],
        total: null,
        count: null,
    }, // gia tri ban dau cua state
    reducers: {},
    extraReducers: {
        [getProductsInStore.pending]: (state, action) => {},
        [getProductsInStore.fulfilled]: (state, action) => {
            state.productsDB = action.payload.products;
        },
        [getProductsInStore.rejected]: (state, action) => {},

        [updateDataProductToDB.pending]: (state, action) => {},
        [updateDataProductToDB.fulfilled]: (state, action) => {
            if (action.payload) {
                const products = state.productsDB.map((product) =>
                    product._id === action.payload._id
                        ? action.payload
                        : product,
                );
                state.productsDB = products;
            }
        },
        [updateDataProductToDB.rejected]: (state, action) => {},

        //get Product pagination
        [getProductToPagination.pending]: (state, action) => {},
        [getProductToPagination.fulfilled]: (state, action) => {
            if (action.payload) {
                state.productsDB = action.payload.products;
                state.total = action.payload.total;
                state.count = action.payload.count;
            }
        },
        [getProductToPagination.rejected]: (state, action) => {},

        //get Product pagination
        [removeProductByID.pending]: (state, action) => {},
        [removeProductByID.fulfilled]: (state, action) => {
            if (action.payload) {
                const productsDBStore = state.productsDB.filter(
                    (product) => product._id !== action.payload.productID,
                );
                state.productsDB = productsDBStore;
            }
        },
        [removeProductByID.rejected]: (state, action) => {},
    },
});

const productsDBReducer = productsDBSlice.reducer;

export const productsDBSelector = (state) => state.productsDBReducer;

export default productsDBReducer;
