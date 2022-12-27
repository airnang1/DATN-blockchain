import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const baseURL = process.env.REACT_APP_SERVER_API;

const url = baseURL;
axios.defaults.withCredentials = true;
export const getProductApi = createAsyncThunk(
    'product/productFetch',
    async ({ limit, id, search, skip }) => {
        try {
            let value1 = limit ? limit : 4;
            let value2 = search ? search : `?page=${1}`;
            let value3 = skip === 0 ? `skip=${skip}` : '';
            const res = await axios.get(
                `${url}/products/${id}${value2}&limit=${value1}&${value3}`,
            );
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
);

export const putUpdateLikeProduct = createAsyncThunk(
    'updateProduct/updateProductFetch',
    async ({ auth, productId, axiosJWT }) => {
        try {
            await axiosJWT.put(`${url}/products/${productId}`, null, {
                headers: { Authorization: auth.tokenAuth },
            });
            return auth.user._id;
        } catch (err) {
            console.log(err);
        }
    },
);

export const getCommentsToProduct = createAsyncThunk(
    'getCommentsToProduct/getCommentsToProductFetch',
    async ({ productId, search }) => {
        try {
            let limit = 4;
            let value = search ? search : `?page=${1}`;
            const res = await axios.get(
                `${url}/products/${productId}${value}&limit=${limit}`,
            );
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Lấy sản phẩm thất bại');
        }
    },
);

const productItemSlice = createSlice({
    name: 'product', // ten cua action
    initialState: {
        product: {},
        total: 0,
        totalCmt: 0,
        isLoading: false,
    }, // gia tri ban dau cua state
    reducers: {
        handleUpdateProduct(state, action) {
            state.product = action.payload;
        },
        handleUpdateIsLoading(state, action) {
            state.isLoading = true;
        },
    },
    extraReducers: {
        [getProductApi.pending]: (state, action) => {},
        [getProductApi.fulfilled]: (state, action) => {
            if (action.payload) {
                state.product = action.payload.product;
                state.total = action.payload.total;
                state.totalCmt = action.payload.totalCmt;
                state.isLoading = false;
            }
        },
        [getProductApi.rejected]: (state, action) => {},

        [getCommentsToProduct.pending]: (state, action) => {},
        [getCommentsToProduct.fulfilled]: (state, action) => {
            state.product = action.payload.product;
            state.total = action.payload.total;
        },
        [getCommentsToProduct.rejected]: (state, action) => {},
        // handle update like product
        [putUpdateLikeProduct.pending]: (state, action) => {},
        [putUpdateLikeProduct.fulfilled]: (state, action) => {
            if (action.payload) {
                if (state.product.likes.includes(action.payload)) {
                    state.product.likes = state.product.likes.filter(
                        (like) => like !== action.payload,
                    );
                } else {
                    state.product.likes.push(action.payload);
                }
            }
        },
        [putUpdateLikeProduct.rejected]: (state, action) => {},
    },
});

const productItemReducer = productItemSlice.reducer;

export const productItemSelector = (state) => state.productItemReducer;
export const { handleUpdateProduct, handleUpdateIsLoading } =
    productItemSlice.actions;

export default productItemReducer;
