import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const url = process.env.REACT_APP_SERVER_API;

export const getSelectField = createAsyncThunk(
    'selectField/SelectFieldFetch',
    async () => {
        try {
            const res = await axios.get(`${url}/select-field`);
            return res.data;
        } catch (err) {
            toast.error('error');
        }
    },
);

export const insertSelectField = createAsyncThunk(
    'selectFieldInsert/SelectFieldInsert',
    async (data) => {
        try {
            const res = await axios.post(`${url}/select-field`, data);
            return res.data;
        } catch (err) {
            toast.error('error');
        }
    },
);

export const updateSelectField = createAsyncThunk(
    'selectFieldUpdate/SelectFieldUpdate',
    async (obj) => {
        try {
            await axios.patch(`${url}/select-field/${obj._id}`, obj);
            return obj;
        } catch (err) {
            toast.error('error');
        }
    },
);

export const deleteSelectFieldApi = createAsyncThunk(
    'SelectField/SelectFieldAllRemove',
    async (tagId) => {
        try {
            await axios.delete(`${url}/select-field/${tagId}`);
            return tagId;
        } catch (err) {
            toast.error('error');
        }
    },
);

const SelectFieldsSlice = createSlice({
    name: 'SelectFields',
    initialState: {
        SelectFields: [],
    },
    reducers: {},
    extraReducers: {
        // get cart product
        [getSelectField.pending]: (state, action) => {},
        [getSelectField.fulfilled]: (state, action) => {
            if (action.payload) {
                state.SelectFields = action.payload;
            }
        },
        [getSelectField.rejected]: (state, action) => {},

        // insert cart product
        [insertSelectField.pending]: (state, action) => {},
        [insertSelectField.fulfilled]: (state, action) => {
            if (action.payload) {
                state.SelectFields.push(action.payload);
            }
        },
        [insertSelectField.rejected]: (state, action) => {},

        // update cart product
        [updateSelectField.pending]: (state, action) => {},
        [updateSelectField.fulfilled]: (state, action) => {
            if (action.payload) {
                state.SelectFields = state.SelectFields.map(function (item) {
                    return item._id === action.payload._id
                        ? action.payload
                        : item;
                });
            }
        },
        [updateSelectField.rejected]: (state, action) => {},

        //delete coins product all
        [deleteSelectFieldApi.pending]: (state, action) => {},
        [deleteSelectFieldApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.SelectFields = state.SelectFields.filter(
                    (ar) => ar._id !== action.payload,
                );
            }
        },
        [deleteSelectFieldApi.rejected]: (state, action) => {},
    },
});

const SelectFieldsReducer = SelectFieldsSlice.reducer;

export const SelectFieldsSelector = (state) =>
    state.SelectFieldsReducer.SelectFields;

export const { handleAmountProduct } = SelectFieldsSlice.actions;

export default SelectFieldsReducer;
