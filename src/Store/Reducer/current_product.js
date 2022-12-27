import { createSlice } from '@reduxjs/toolkit';

const currentProductSlice = createSlice({
    name: 'currentProduct', // ten cua action
    initialState: {
        currentProduct: {},
    }, // gia tri ban dau cua state
    reducers: {
        handleProductStatus: (state, action) => {
            state.currentProduct = action.payload;
        },
    },
});

const currentProductReducer = currentProductSlice.reducer;

export const currentProductSelector = (state) =>
    state.currentProductReducer.currentProduct;

export const { handleProductStatus } = currentProductSlice.actions;

export default currentProductReducer;
