import { createSlice } from '@reduxjs/toolkit';

const findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
        if (product._id === id) {
            result = index;
        }
    });
    return result;
};
const totalProductsSlice = createSlice({
    name: 'totalProducts', // ten cua action
    initialState: {
        totalProducts: [],
    }, // gia tri ban dau cua state
    reducers: {
        handleAddCoinsProduct: (state, action) => {
            if (state.totalProducts.length) {
                const index = findIndex(
                    state.totalProducts,
                    action.payload._id,
                );

                if (index === -1) {
                    state.totalProducts.push(action.payload);
                }
            } else {
                state.totalProducts.push(action.payload);
            }
        },
        handleRemoveCoinsProduct: (state, action) => {
            state.totalProducts = state.totalProducts.filter(
                (item) => item._id !== action.payload._id,
            );
        },
        handleUpdateCoinsProduct: (state, action) => {
            state.totalProducts = state.totalProducts.map((item) =>
                item._id === action.payload._id ? action.payload : item,
            );
        },
        resetProductCoints: (state, action) => {
            state.totalProducts = [];
        },
    },
});

const totalProductsReducer = totalProductsSlice.reducer;

export const totalProductsSelector = (state) =>
    state.totalProductsReducer.totalProducts;

export const {
    handleAddCoinsProduct,
    handleRemoveCoinsProduct,
    handleUpdateCoinsProduct,
    resetProductCoints,
} = totalProductsSlice.actions;

export default totalProductsReducer;
