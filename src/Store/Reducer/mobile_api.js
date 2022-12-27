import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_API;

export const getMobilesApi = createAsyncThunk(
    'mobiles/mobilesFetch',
    async () => {
        const response = await axios.get(`${baseURL}/mobile_api`);
        return response.data;
    },
);

export const handleInsertProductToMobile = createAsyncThunk(
    'mobiles/mobilesInsert',
    async (obj) => {
        const newProduct = {
            id: nanoid(),
            ...obj,
        };
        await axios.post(`${baseURL}/mobile_api`, newProduct);
        return newProduct;
    },
);

export const handleRemoveMobileItemApi = createAsyncThunk(
    'mobiles/mobilesRemove',
    async (obj) => {
        await axios.delete(`${baseURL}/mobile_api/${obj.id}`);
        return obj;
    },
);

export const handleUpdateMobileItemApi = createAsyncThunk(
    'mobiles/mobilesUpdate',
    async (obj) => {
        const newMobiles = {
            ...obj,
        };
        await axios.put(
            `${baseURL}/mobile_api/${obj.id}`,
            newMobiles,
        );
        return newMobiles;
    },
);

const mobilesSlice = createSlice({
    name: 'mobiles', // ten cua action
    initialState: {
        mobiles: [],
    }, // gia tri ban dau cua state
    reducers: {},
    extraReducers: {
        [getMobilesApi.pending]: (state, action) => {},
        [getMobilesApi.fulfilled]: (state, action) => {
            state.mobiles = action.payload;
        },
        [getMobilesApi.rejected]: (state, action) => {},
        // insert cart product
        [handleInsertProductToMobile.pending]: (state, action) => {},
        [handleInsertProductToMobile.fulfilled]: (state, action) => {
            state.mobiles.push(action.payload);
        },
        [handleInsertProductToMobile.rejected]: (state, action) => {},
        //delete coins product all
        [handleRemoveMobileItemApi.pending]: (state, action) => {},
        [handleRemoveMobileItemApi.fulfilled]: (state, action) => {
            state.mobiles = state.mobiles.filter(
                (ar) => ar.id !== action.payload.id,
            );
        },
        [handleRemoveMobileItemApi.rejected]: (state, action) => {},
        // update cart product
        [handleUpdateMobileItemApi.pending]: (state, action) => {},
        [handleUpdateMobileItemApi.fulfilled]: (state, action) => {
            state.mobiles = state.mobiles.map(function (item) {
                return item.id === action.payload.id ? action.payload : item;
            });
        },
        [handleUpdateMobileItemApi.rejected]: (state, action) => {},
    },
});

const mobilesReducer = mobilesSlice.reducer;

export const mobilesSelector = (state) => state.mobilesReducer.mobiles;

export default mobilesReducer;
