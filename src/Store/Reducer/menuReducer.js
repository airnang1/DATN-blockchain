import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
const baseURL = process.env.REACT_APP_SERVER_API;

// Define a service using a base URL and expected endpoints
export const menuSidebarApi = createApi({
    reducerPath: 'menuSidebarApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseURL}/` }),
    keepUnusedDataFor: 200,
    endpoints: (builder) => ({
        getMenuCategory: builder.query({
            query: () => `category`,
        }),
    }),
});

export const { useGetMenuCategoryQuery } = menuSidebarApi;

const menuSidebarSlice = createSlice({
    name: 'menu', // ten cua action
    initialState: {
        menu: [],
        loading: false,
    }, // gia tri ban dau cua state
    reducers: {
        handleSetLoadingMenu(state, action) {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            menuSidebarApi.endpoints.getMenuCategory.matchFulfilled,
            (state, action) => {
                state.menu = action.payload.categoryMenu;
                state.loading = false;
            },
        );
    },
});

const menuSidebarReducer = menuSidebarSlice.reducer;

export const menuSidebarSelector = (state) => {
    return state.menuSidebarReducer;
};
export const { handleSetLoadingMenu } = menuSidebarSlice.actions;
export default menuSidebarReducer;
