import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const baseURL = process.env.REACT_APP_SERVER_API;

export const getImageField = createAsyncThunk(
    'ImageFieldGet/ImageFieldGetFetch',
    async () => {
        try {
            const res = await axios.get(`${baseURL}/logo-field`);
            return res.data;
        } catch (err) {
            toast.error('Có lỗi');
        }
    },
);

export const insertImageField = createAsyncThunk(
    'ImageFieldPost/ImageFieldPostInsert',
    async (data) => {
        try {
            const res = await axios.post(`${baseURL}/logo-field`, { value: data });
            return res.data;
        } catch (err) {
            toast.error('Có lỗi');
        }
    },
);

export const deleteImageFieldApi = createAsyncThunk(
    'ImageField/ImageFieldAllRemove',
    async (tagId) => {
        try {
            await axios.delete(`${baseURL}/logo-field/${tagId}`);
            return tagId;
        } catch (err) {
            toast.error('Có lỗi');
        }
    },
);

const ImageFieldsSlice = createSlice({
    name: 'ImageFields',
    initialState: {
        ImageFields: [],
    },
    reducers: {},
    extraReducers: {
        // get cart product
        [getImageField.pending]: (state, action) => {},
        [getImageField.fulfilled]: (state, action) => {
            if (action.payload) {
                state.ImageFields = action.payload;
            }
        },
        [getImageField.rejected]: (state, action) => {},

        // insert cart product
        [insertImageField.pending]: (state, action) => {},
        [insertImageField.fulfilled]: (state, action) => {
            if (action.payload) {
                state.ImageFields.push(action.payload);
            }
        },
        [insertImageField.rejected]: (state, action) => {},

        //delete coins product all
        [deleteImageFieldApi.pending]: (state, action) => {},
        [deleteImageFieldApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.ImageFields = state.ImageFields.filter(
                    (ar) => ar._id !== action.payload,
                );
            }
        },
        [deleteImageFieldApi.rejected]: (state, action) => {},
    },
});

const ImageFieldsReducer = ImageFieldsSlice.reducer;

export const ImageFieldsSelector = (state) =>
    state.ImageFieldsReducer.ImageFields;

export const { handleAmountProduct } = ImageFieldsSlice.actions;

export default ImageFieldsReducer;
