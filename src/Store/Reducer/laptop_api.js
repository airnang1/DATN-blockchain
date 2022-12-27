import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLaptopsApi = createAsyncThunk(
    'laptops/laptopsFetch',
    async () => {
        const response = await axios.get(`http://localhost:3000/laptop_api`);
        return response.data;
    },
);

export const handleInsertProductToLaptop = createAsyncThunk(
    'laptops/laptopsInsert',
    async (obj) => {
        const newProduct = {
            id: nanoid(),
            ...obj,
        };
        await axios.post('http://localhost:3000/laptop_api', newProduct);
        return newProduct;
    },
);

export const handleRemoveLaptopItemApi = createAsyncThunk(
    'laptops/laptopsRemove',
    async (obj) => {
        await axios.delete(`http://localhost:3000/laptop_api/${obj.id}`);
        return obj;
    },
);

export const handleUpdateLaptopItemApi = createAsyncThunk(
    'laptops/laptopsUpdate',
    async (obj) => {
        const newLaptops = {
            ...obj,
        };
        await axios.put(
            `http://localhost:3000/laptop_api/${obj.id}`,
            newLaptops,
        );
        return newLaptops;
    },
);

const laptopsSlice = createSlice({
    name: 'laptops', // ten cua action
    initialState: {
        laptops: [],
    }, // gia tri ban dau cua state
    reducers: {},
    extraReducers: {
        [getLaptopsApi.pending]: (state, action) => {},
        [getLaptopsApi.fulfilled]: (state, action) => {
            state.laptops = action.payload;
        },
        [getLaptopsApi.rejected]: (state, action) => {},
        // insert cart product
        [handleInsertProductToLaptop.pending]: (state, action) => {},
        [handleInsertProductToLaptop.fulfilled]: (state, action) => {
            state.laptops.push(action.payload);
        },
        [handleInsertProductToLaptop.rejected]: (state, action) => {},
        //delete coins product all
        [handleRemoveLaptopItemApi.pending]: (state, action) => {},
        [handleRemoveLaptopItemApi.fulfilled]: (state, action) => {
            state.laptops = state.laptops.filter(
                (ar) => ar.id !== action.payload.id,
            );
        },
        [handleRemoveLaptopItemApi.rejected]: (state, action) => {},
        // update cart product
        [handleUpdateLaptopItemApi.pending]: (state, action) => {},
        [handleUpdateLaptopItemApi.fulfilled]: (state, action) => {
            state.laptops = state.laptops.map(function (item) {
                return item.id === action.payload.id ? action.payload : item;
            });
        },
        [handleUpdateLaptopItemApi.rejected]: (state, action) => {},
    },
});

const laptopsReducer = laptopsSlice.reducer;

export const laptopsSelector = (state) => state.laptopsReducer.laptops;

export default laptopsReducer;
