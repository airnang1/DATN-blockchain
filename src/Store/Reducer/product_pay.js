import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPayProduct = createAsyncThunk(
    'payProducts/payProductFetch',
    async () => {
        const response = await axios.get(`http://localhost:3000/orders_pay`);
        return response.data;
    },
);

export const insertPayProduct = createAsyncThunk(
    'payProduct/payProductInsert',
    async (obj) => {
        const newOrderPay = {
            id: nanoid(),
            ...obj,
        };
        await axios.post('http://localhost:3000/orders_pay', newOrderPay);
        return newOrderPay;
    },
);

export const updatePayProduct = createAsyncThunk(
    'payProducts/payProductUpdate',
    async (obj) => {
        const newPayProduct = {
            ...obj,
        };
        await axios.put(
            `http://localhost:3000/orders_pay/${obj.id}`,
            newPayProduct,
        );
        return newPayProduct;
    },
);

export const deletePayProductAllApi = createAsyncThunk(
    'payProducts/payProductAllRemove',
    async (obj) => {
        let arrProduct = [];
        setTimeout(async () => {
            await axios.delete(`http://localhost:3000/orders_pay/${obj.id}`);
        }, 100);
        arrProduct.push(obj);
        return arrProduct;
    },
);

const payProductsSlice = createSlice({
    name: 'payProducts',
    initialState: {
        payProducts: [],
    },
    reducers: {},
    extraReducers: {
        // get Pay product
        [getPayProduct.pending]: (state, action) => {},
        [getPayProduct.fulfilled]: (state, action) => {
            state.payProducts = action.payload.reverse();
        },
        [getPayProduct.rejected]: (state, action) => {},

        // insert Pay product
        [insertPayProduct.pending]: (state, action) => {},
        [insertPayProduct.fulfilled]: (state, action) => {
            state.payProducts.unshift(action.payload);
        },
        [insertPayProduct.rejected]: (state, action) => {},

        // update Pay product
        [updatePayProduct.pending]: (state, action) => {},
        [updatePayProduct.fulfilled]: (state, action) => {
            state.payProducts = state.payProducts.map(function (item) {
                return item.id === action.payload.id ? action.payload : item;
            });
        },
        [updatePayProduct.rejected]: (state, action) => {},

        //delete coins product all
        [deletePayProductAllApi.pending]: (state, action) => {},
        [deletePayProductAllApi.fulfilled]: (state, action) => {
            state.payProducts = state.payProducts.filter(
                (ar) => !action.payload.find((rm) => rm.id === ar.id),
            );
        },
        [deletePayProductAllApi.rejected]: (state, action) => {},
    },
});

const payProductsReducer = payProductsSlice.reducer;

export const payProductsSelector = (state) =>
    state.payProductsReducer.payProducts;

export default payProductsReducer;
