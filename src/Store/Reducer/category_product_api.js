import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategoryProductsAllApi = createAsyncThunk(
    'categoryProducts/categoryProductsAllFetch',
    async () => {
        const response = await axios.get(
            `http://localhost:3000/category_products`,
        );
        return response.data;
    },
);

export const insertCategory = createAsyncThunk(
    'categoryProducts/categoryProductsInsert',
    async (obj) => {
        const newCategoryProducts = {
            id: nanoid(),
            ...obj,
        };
        await axios.post(
            'http://localhost:3000/category_products',
            newCategoryProducts,
        );
        return newCategoryProducts;
    },
);

export const deleteCategoryProductAllApi = createAsyncThunk(
    'categoryProduct/categoryProductAllRemove',
    async (obj) => {
        await axios.delete(`http://localhost:3000/category_products/${obj.id}`);
        return obj;
    },
);

// export const updateCategory = createAsyncThunk(
//     'categoryProducts/categoryProductsUpdate',
//     async (obj) => {
//         const newCategoryProduct = {
//             ...obj,
//         };
//         await axios.put(
//             `http://localhost:3000/category_products/${obj.id}`,
//             newCategoryProduct,
//         );
//         return newCategoryProduct;
//     },
// );

const categoryProductsSlice = createSlice({
    name: 'categoryProducts',
    initialState: {
        categoryProducts: [],
    },
    reducers: {},
    extraReducers: {
        // get cmts all
        [getCategoryProductsAllApi.pending]: (state, action) => {},
        [getCategoryProductsAllApi.fulfilled]: (state, action) => {
            state.categoryProducts = action.payload;
        },
        [getCategoryProductsAllApi.rejected]: (state, action) => {},
        // insert cmt
        [insertCategory.pending]: (state, action) => {},
        [insertCategory.fulfilled]: (state, action) => {
            state.categoryProducts.push(action.payload);
        },
        [insertCategory.rejected]: (state, action) => {},

        [deleteCategoryProductAllApi.pending]: (state, action) => {},
        [deleteCategoryProductAllApi.fulfilled]: (state, action) => {
            state.categoryProducts = state.categoryProducts.filter(
                (item) => item.id !== action.payload.id,
            );
        },
        [deleteCategoryProductAllApi.rejected]: (state, action) => {},
        // update cmt
        // [updateCategory.pending]: (state, action) => {},
        // [updateCategory.fulfilled]: (state, action) => {
        //     state.categoryProducts = state.categoryProducts.map(function (
        //         item,
        //     ) {
        //         return item.id_ === action.payload.id_ &&
        //             item.id_product === action.payload.id_product
        //             ? action.payload
        //             : item;
        //     });
        // },
        // [updateCategory.rejected]: (state, action) => {},
    },
});

const categoryProductsReducer = categoryProductsSlice.reducer;

export const categoryProductsSelector = (state) =>
    state.categoryProductsReducer.categoryProducts;

export default categoryProductsReducer;
