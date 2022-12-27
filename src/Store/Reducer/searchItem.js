import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { findIndex } from '../../utils';

const url = process.env.REACT_APP_SERVER_API;

export const getSearchItemUserApi = createAsyncThunk(
    'searchItem/searchItemFetch',
    async () => {
        try {
            const response = await axios.get(`${url}/search`);
            return response.data;
        } catch (err) {
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

export const addSearchItemUserApi = createAsyncThunk(
    'addSearchItem/searchItemAdd',
    async (content) => {
        try {
            const res = await axios.post(`${url}/search`, {
                content,
            });
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

export const deleteSearchItemUserApi = createAsyncThunk(
    'searchItem/searchItemDelete',
    async (searchId) => {
        try {
            await axios.delete(`${url}/search/${searchId}`);
            return searchId;
        } catch (err) {
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

const searchItemSlice = createSlice({
    name: 'searchItem',
    initialState: {
        searchItem: null,
    },
    reducers: {},
    extraReducers: {
        // get cmts
        [getSearchItemUserApi.pending]: (state, action) => {},
        [getSearchItemUserApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.searchItem = action.payload;
            }
        },
        [getSearchItemUserApi.rejected]: (state, action) => {},

        // insert cmt
        [addSearchItemUserApi.pending]: (state, action) => {},
        [addSearchItemUserApi.fulfilled]: (state, action) => {
            const searchItem = action.payload;
            const indexSearch = findIndex(state.searchItem, searchItem._id);
            if (indexSearch === -1) {
                if (state.searchItem) {
                    state.searchItem.unshift(searchItem);
                } else {
                    const searchesItem = [];
                    searchesItem.unshift(searchItem);
                    state.searchItem = searchesItem;
                }
            } else {
                const tmp = state.searchItem[0];
                state.searchItem[0] = state.searchItem[indexSearch];
                state.searchItem[indexSearch] = tmp;
            }
        },
        [addSearchItemUserApi.rejected]: (state, action) => {},

        //delete search item
        [deleteSearchItemUserApi.pending]: (state, action) => {},
        [deleteSearchItemUserApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.searchItem = state.searchItem.filter(
                    (item) => item._id !== action.payload,
                );
            }
        },
        [deleteSearchItemUserApi.rejected]: (state, action) => {},
    },
});

const searchItemReducer = searchItemSlice.reducer;

export const searchItemSelector = (state) => state.searchItemReducer.searchItem;

export default searchItemReducer;
