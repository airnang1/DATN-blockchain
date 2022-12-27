import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { handleUpdateProduct } from './product';
const baseURL = process.env.REACT_APP_SERVER_API;
axios.defaults.withCredentials = true;

export const getCommentsUserApi = createAsyncThunk(
    'commentsUser/commentsUserFetch',
    async (productId) => {
        const response = await axios.get(
            `http://localhost:3000/comments_user?id_product=${productId}`,
        );
        return response.data;
    },
);

export const getCommentsToStore = createAsyncThunk(
    'getCommentsToStore/getCommentsToStoreFetch',
    async () => {
        try {
            const res = await axios.get(`${baseURL}/comment/all`);
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Get Comments is failed!');
        }
    },
);

export const getCommentsAllApi = createAsyncThunk(
    'commentsUsers/commentsUserAllFetch',
    async () => {
        const response = await axios.get(`http://localhost:3000/comments_user`);
        return response.data;
    },
);

export const insertCmt = createAsyncThunk(
    'commentsUser/commentsUserInsert',
    async (obj) => {
        const {axiosJWT} = obj;
        try {
            const res = await axiosJWT.post(`${baseURL}/comment`, obj.newComment, {
                headers: { Authorization: obj.auth.tokenAuth },
            });
            
            const comment = { ...res.data, user: obj.auth.user };
            const newProductUpdateComment = {
                ...obj.product,
                comments: [comment, ...obj.product.comments],
            };
            obj.dispatch(handleUpdateProduct(newProductUpdateComment));
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Bình luận thất bại');
        }
    },
);

export const likeComment = createAsyncThunk(
    'likeComment/likeCommentFetch',
    async ({ comment, product, tokenAuth, user, dispatch, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                `${baseURL}/comment/${comment._id}`,
                null,
                {
                    headers: { Authorization: tokenAuth },
                },
            );
            const newComment = { ...comment, likes: [...comment.likes, user] };
            const newComments = product.comments.map((cmt) =>
                cmt._id === newComment._id ? newComment : cmt,
            );
            const newProductUpdateComment = {
                ...product,
                comments: newComments,
            };
            dispatch(handleUpdateProduct(newProductUpdateComment));
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Like thất bại');
        }
    },
);

export const unLikeComment = createAsyncThunk(
    'likeComment/likeCommentFetch',
    async ({ comment, product, tokenAuth, user, dispatch, axiosJWT }) => {
        try {
            const res = await axiosJWT.post(
                `${baseURL}/comment/${comment._id}`,
                null,
                {
                    headers: { Authorization: tokenAuth },
                },
            );
            const newLikes = comment.likes.filter(
                (like) => like._id !== user._id,
            );
            const newComment = { ...comment, likes: newLikes };
            const newComments = product.comments.map((cmt) =>
                cmt._id === newComment._id ? newComment : cmt,
            );
            const newProductUpdateComment = {
                ...product,
                comments: newComments,
            };
            dispatch(handleUpdateProduct(newProductUpdateComment));
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Like thất bại');
        }
    },
);

export const updateCmtItem = createAsyncThunk(
    'commentsUser/commentsUserUpdate',
    async (obj) => {
        const newCommentsUser = {
            ...obj,
        };
        await axios.put(
            `http://localhost:3000/comments_user/${obj.id}`,
            newCommentsUser,
        );
        return newCommentsUser;
    },
);

const commentsUserSlice = createSlice({
    name: 'commentsUser',
    initialState: {
        comments: [],
    },
    reducers: {},
    extraReducers: {
        // get cmts
        [getCommentsToStore.pending]: (state, action) => {},
        [getCommentsToStore.fulfilled]: (state, action) => {
            if (action.payload) {
                state.comments = action.payload.comments;
            }
        },
        [getCommentsToStore.rejected]: (state, action) => {},
        // get cmts
        [getCommentsUserApi.pending]: (state, action) => {},
        [getCommentsUserApi.fulfilled]: (state, action) => {
            state.comments = action.payload;
        },
        [getCommentsUserApi.rejected]: (state, action) => {},

        // get cmts all
        [getCommentsAllApi.pending]: (state, action) => {},
        [getCommentsAllApi.fulfilled]: (state, action) => {
            state.comments = action.payload;
        },
        [getCommentsAllApi.rejected]: (state, action) => {},
        // insert cmt
        [insertCmt.pending]: (state, action) => {},
        [insertCmt.fulfilled]: (state, action) => {
            state.comments.push(action.payload);
        },
        [insertCmt.rejected]: (state, action) => {},
        // update cmt
        [updateCmtItem.pending]: (state, action) => {},
        [updateCmtItem.fulfilled]: (state, action) => {
            state.comments = state.comments.map(function (item) {
                return item.id_user === action.payload.id_user &&
                    item.id_product === action.payload.id_product
                    ? action.payload
                    : item;
            });
        },
        [updateCmtItem.rejected]: (state, action) => {},
    },
});

const commentsUserReducer = commentsUserSlice.reducer;

export const commentsUserSelector = (state) =>
    state.commentsUserReducer.comments;

// export const { handleInsertCmt } = commentsUserSlice.actions;

export default commentsUserReducer;
