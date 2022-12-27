import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        loading: false,
    },
    reducers: {
        setLoadingAction(state, action) {
            state.loading = action.payload;
        },
    },
    extraReducers: {},
});

const loadingReducer = loadingSlice.reducer;

export const loadingSelector = (state) => state.loadingReducer.loading;

export const { setLoadingAction } = loadingSlice.actions;

export default loadingReducer;
