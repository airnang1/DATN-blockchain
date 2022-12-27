import { createSlice } from '@reduxjs/toolkit';

const configInputFieldSlice = createSlice({
    name: 'configInputField', // ten cua action
    initialState: {
        configInputField: [],
    }, // gia tri ban dau cua state
    reducers: {
        getConfigInputField: (state, action) => {
            state.configInputField = action.payload;
        },
    },
});

const configInputFieldReducer = configInputFieldSlice.reducer;

export const configInputFieldSelector = (state) =>
    state.configInputFieldReducer.configInputField;

export const { getConfigInputField } = configInputFieldSlice.actions;

export default configInputFieldReducer;
