import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const baseURL = process.env.REACT_APP_SERVER_API;

export const getInputField = createAsyncThunk(
    'InputField/InputFieldFetch',
    async () => {
        try {
            const res = await axios.get(`${baseURL}/input-field`);
            return res.data;
        } catch (err) {
            toast.error('Có lỗi !');
        }
    },
);

export const insertInputField = createAsyncThunk(
    'InputFieldInsert/InputFieldInsert',
    async (data) => {
        try {
            const res = await axios.post(`${baseURL}/input-field`, { value: data });
            return res.data;
        } catch (err) {
            toast.error('Có lỗi !');
        }
    },
);

export const updateInputField = createAsyncThunk(
    'InputFieldUpdate/InputFieldUpdate',
    async (obj) => {
        try {
            await axios.patch(`${baseURL}/input-field/${obj._id}`, {
                value: obj.value,
            });
            return obj;
        } catch (err) {
            toast.error('Có lỗi !');
        }
    },
);

export const deleteInputFieldApi = createAsyncThunk(
    'InputFieldRemove/InputFieldAllRemove',
    async (tagId) => {
        try {
            await axios.delete(`${baseURL}/input-field/${tagId}`);
            return tagId;
        } catch (err) {
            toast.error('Có lỗi !');
        }
    },
);

const InputFieldsSlice = createSlice({
    name: 'InputFields',
    initialState: {
        InputFields: [],
    },
    reducers: {},
    extraReducers: {
        // get cart product
        [getInputField.pending]: (state, action) => {},
        [getInputField.fulfilled]: (state, action) => {
            state.InputFields = action.payload;
        },
        [getInputField.rejected]: (state, action) => {},

        // insert cart product
        [insertInputField.pending]: (state, action) => {},
        [insertInputField.fulfilled]: (state, action) => {
            if (action.payload) {
                state.InputFields.push(action.payload);
            }
        },
        [insertInputField.rejected]: (state, action) => {},

        // update cart product
        [updateInputField.pending]: (state, action) => {},
        [updateInputField.fulfilled]: (state, action) => {
            state.InputFields = state.InputFields.map(function (item) {
                return item._id === action.payload._id ? action.payload : item;
            });
        },
        [updateInputField.rejected]: (state, action) => {},

        //delete coins product all
        [deleteInputFieldApi.pending]: (state, action) => {},
        [deleteInputFieldApi.fulfilled]: (state, action) => {
            state.InputFields = state.InputFields.filter(
                (ar) => ar._id !== action.payload,
            );
        },
        [deleteInputFieldApi.rejected]: (state, action) => {},
    },
});

const InputFieldsReducer = InputFieldsSlice.reducer;

export const InputFieldsSelector = (state) =>
    state.InputFieldsReducer.InputFields;

export const { handleAmountProduct } = InputFieldsSlice.actions;

export default InputFieldsReducer;
