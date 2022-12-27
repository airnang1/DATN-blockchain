import { createSlice } from "@reduxjs/toolkit";

const ethSlice = createSlice({
  name: "ether", // ten cua action
  initialState: {
    loaded: false,
    artifact: null,
    web3: null,
    accounts: null,
    networkID: null,
    contracts: null,
  }, // gia tri ban dau cua state
  reducers: {
    initCallAbi(state, action) {
      const { data } = action.payload;
      return { ...state, ...data };
    },
  },
  extraReducers: {},
});

const ethReducer = ethSlice.reducer;

export const ethSelector = (state) => state.ethReducer;

export const { initCallAbi } = ethSlice.actions;

export default ethReducer;
