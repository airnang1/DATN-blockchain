import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import mobilesReducer from "./Reducer/mobile_api";
import laptopsReducer from "./Reducer/laptop_api";
import productItemReducer from "./Reducer/product";
import imgImportReducer from "./Reducer/handleImgPrd";
import commentsUserReducer from "./Reducer/comments_user";
// import currentProductReducer from './Reducer/current_product';
import tabletsReducer from "./Reducer/tablet_api";
import totalProductsReducer from "./Reducer/totalProduct";
import searchItemReducer from "./Reducer/searchItem";
import addressApiReducer from "./Reducer/apiAddress";
import searchSimilarReducer from "./Reducer/searchSimilar";
import payProductsReducer from "./Reducer/product_pay";
import InputFieldsReducer from "./Reducer/input_field";
import categoryReducer from "./Reducer/categoryReducer";
import ImageFieldsReducer from "./Reducer/config_input_image";
import SelectFieldsReducer from "./Reducer/select_field";
import productConfigReducer from "./Reducer/productConfig";
import authReducer from "./Reducer/authReducer";
import loadingReducer from "./Reducer/loadingReducer";
import productsReducer, { productsApi } from "./Reducer/productsReducer";
import cartReducer from "./Reducer/cartReducer";
import searchProductCategoryReducer from "./Reducer/searchProductCategory";
import userAddressReducer from "./Reducer/userAddressReducer";
import paymentReducer from "./Reducer/paymentReducer.js";
import orderReducer from "./Reducer/orderReducer.js";
import { menuSidebarApi } from "./Reducer/menuReducer";
import menuSidebarReducer from "./Reducer/menuReducer";
import usersReducer from "./Reducer/usersReducer";
import productsDBReducer from "./Reducer/productsDBReducer";
import ethReducer from "./Reducer/ethReducer";
import { categoryApi } from "./Reducer/categoryReducer";

export const store = configureStore({
  reducer: {
    mobilesReducer,
    laptopsReducer,
    tabletsReducer,
    productItemReducer,
    imgImportReducer,
    commentsUserReducer,
    totalProductsReducer,
    searchItemReducer,
    addressApiReducer,
    searchSimilarReducer,
    payProductsReducer,
    InputFieldsReducer,
    ImageFieldsReducer,
    SelectFieldsReducer,
    productConfigReducer,
    authReducer,
    loadingReducer,
    productsReducer,
    cartReducer,
    searchProductCategoryReducer,
    menuSidebarReducer,
    categoryReducer,
    userAddressReducer,
    paymentReducer,
    orderReducer,
    usersReducer,
    productsDBReducer,
    ethReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [menuSidebarApi.reducerPath]: menuSidebarApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(productsApi.middleware)
      .concat(menuSidebarApi.middleware),
});

setupListeners(store.dispatch);
