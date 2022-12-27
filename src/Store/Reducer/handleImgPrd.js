import { createSlice } from '@reduxjs/toolkit';

const imgImportSlice = createSlice({
    name: 'product',
    initialState: {
        product: {},
    },
    reducers: {
        handleProduct: (state, action) => {
            state.product = action.payload;
        },
    },
});

const imgImportReducer = imgImportSlice.reducer;

export const imgImportSelector = (state) => state.imgImportReducer.product;

export const { handleProduct } = imgImportSlice.actions;

export default imgImportReducer;
