import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const url = process.env.REACT_APP_SERVER_API;

export const handleSearchSimilar = createAsyncThunk(
    'handleSearchSimilar/handleSearchSimilarFetch',
    async ({ dataSearchToObj }) => {
        try {
            const res = await axios.post(
                `${url}/cart/search-similar`,
                dataSearchToObj,
            );

            return res.data;
        } catch (err) {
            console.log(err);
            toast.error(`${err.message} 😓`);
        }
    },
);

export const searchProductToDB = createAsyncThunk(
    'searchProductToDB/searchProductToDBFetch',
    async ({ keys }) => {
        try {
            const res = await axios.get(
                `${url}/products/search-productDB?keys=${keys}`,
            );
            return res.data;
        } catch (err) {
            console.log(err);
            toast.error('Lấy sản phẩm thất bại');
        }
    },
);

const searchSimilarSlice = createSlice({
    name: 'searchSimilar', // ten cua action
    initialState: {
        searchSimilar: [],
        loadingSimilar: false,
    }, // gia tri ban dau cua state
    reducers: {
        handleSearchProductToDashboard: (state, action) => {
            const { dataSearch, dataSearchToObj } = action.payload;
            const keyWord = dataSearchToObj.name;
            state.searchSimilar = dataSearch.filter((item) => {
                return (
                    item.name.toLowerCase().indexOf(keyWord.toLowerCase()) !==
                        -1 ||
                    item.description.trademark
                        .toLowerCase()
                        .indexOf(keyWord.toLowerCase()) !== -1 ||
                    item.category
                        .toLowerCase()
                        .indexOf(keyWord.toLowerCase()) !== -1 ||
                    item.category
                        .toLowerCase()
                        .indexOf(keyWord.toLowerCase()) !== -1
                );
            });
        },
        resetProductSimilar: (state, action) => {
            state.searchSimilar = [];
        },
        setLoadingSimilar: (state, action) => {
            state.loadingSimilar = action.payload;
        },
    },
    extraReducers: {
        [handleSearchSimilar.pending]: (state, action) => {},
        [handleSearchSimilar.fulfilled]: (state, action) => {
            state.searchSimilar = action.payload;
            state.loadingSimilar = false;
        },
        [handleSearchSimilar.rejected]: (state, action) => {},

        // search similar
        [searchProductToDB.pending]: (state, action) => {},
        [searchProductToDB.fulfilled]: (state, action) => {
            if (action.payload) {
                state.searchSimilar = action.payload.products;
                state.loadingSimilar = false;
            }
        },
        [searchProductToDB.rejected]: (state, action) => {},
    },
});

const searchSimilarReducer = searchSimilarSlice.reducer;

export const searchSimilarSelector = (state) => state.searchSimilarReducer;

export const {
    resetProductSimilar,
    setLoadingSimilar,
    handleSearchProductToDashboard,
} = searchSimilarSlice.actions;

export default searchSimilarReducer;
