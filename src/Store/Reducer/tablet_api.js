import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTabletsApi = createAsyncThunk(
    'tablets/tabletsFetch',
    async () => {
        const response = await axios.get(`http://localhost:3000/tablet_api`);
        return response.data;
    },
);

export const handleInsertProductToTablet = createAsyncThunk(
    'Tablets/TabletsInsert',
    async (obj) => {
        const newProduct = {
            id: nanoid(),
            ...obj,
        };
        await axios.post('http://localhost:3000/tablet_api', newProduct);
        return newProduct;
    },
);

export const handleRemoveTabletItemApi = createAsyncThunk(
    'tablet/tabletsRemove',
    async (obj) => {
        await axios.delete(`http://localhost:3000/tablet_api/${obj.id}`);
        return obj;
    },
);

export const handleUpdateTabletItemApi = createAsyncThunk(
    'tablets/tabletsUpdate',
    async (obj) => {
        const newTablets = {
            ...obj,
        };
        await axios.put(
            `http://localhost:3000/tablet_api/${obj.id}`,
            newTablets,
        );
        return newTablets;
    },
);

const tabletsSlice = createSlice({
    name: 'tablets', // ten cua action
    initialState: {
        tablets: [],
    }, // gia tri ban dau cua state
    reducers: {},
    extraReducers: {
        [getTabletsApi.pending]: (state, action) => {},
        [getTabletsApi.fulfilled]: (state, action) => {
            state.tablets = action.payload;
        },
        [getTabletsApi.rejected]: (state, action) => {},
        // insert cart product
        [handleInsertProductToTablet.pending]: (state, action) => {},
        [handleInsertProductToTablet.fulfilled]: (state, action) => {
            state.tablets.push(action.payload);
        },
        [handleInsertProductToTablet.rejected]: (state, action) => {},
        //delete coins product all
        [handleRemoveTabletItemApi.pending]: (state, action) => {},
        [handleRemoveTabletItemApi.fulfilled]: (state, action) => {
            state.tablets = state.tablets.filter(
                (ar) => ar.id !== action.payload.id,
            );
        },
        [handleRemoveTabletItemApi.rejected]: (state, action) => {},
        // update cart product
        [handleUpdateTabletItemApi.pending]: (state, action) => {},
        [handleUpdateTabletItemApi.fulfilled]: (state, action) => {
            state.tablets = state.tablets.map(function (item) {
                return item.id === action.payload.id ? action.payload : item;
            });
        },
        [handleUpdateTabletItemApi.rejected]: (state, action) => {},
    },
});

const tabletsReducer = tabletsSlice.reducer;

export const tabletsSelector = (state) => state.tabletsReducer.tablets;

export default tabletsReducer;
