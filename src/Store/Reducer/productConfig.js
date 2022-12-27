import { createSlice } from '@reduxjs/toolkit';
import { newObjectId } from '../../utils';

const productConfigSlice = createSlice({
    name: 'productConfig',
    initialState: {
        productConfig: {
            varation: [],
            image: [],
        },
        isEdit: false,
    },
    reducers: {
        handleCreateProductConfig: (state, action) => {
            const dataImg = {
                _id: newObjectId(),
                image: [],
            };
            state.productConfig = {
                ...state.productConfig,
                varation: [...state.productConfig.varation, action.payload],
                image: [...state.productConfig.image, dataImg],
            };
            state.isEdit = true;
        },
        handleInsertProductConfig: (state, action) => {
            state.productConfig = {
                ...state.productConfig,
                ...action.payload,
            };
            state.isEdit = false;
        },
        handlePushImgProductConfig: (state, action) => {
            const result = state.productConfig.image.map((item) => {
                return item._id === action.payload._id ? action.payload : item;
            });

            state.productConfig = {
                ...state.productConfig,
                image: result,
            };
            state.isEdit = true;
        },
        handleInsertDataToProductConfig: (state, action) => {
            if (action.payload) {
                state.productConfig = {
                    ...state.productConfig,
                    ...action.payload,
                };
            }
        },
        handleResetProductConfigChange: (state, action) => {
            state.productConfig = {
                varation: [],
                image: [],
            };
            state.isEdit = false;
        },
        handleUpdateProductConfigChange: (state, action) => {
            const obj = {};
            const keyObj = action.payload.key;
            obj[keyObj] = action.payload.value;
            if (action.payload.des === 'description') {
                state.productConfig = {
                    ...state.productConfig,
                    description: { ...state.productConfig.description, ...obj },
                };
            } else {
                state.productConfig = {
                    ...state.productConfig,
                    ...obj,
                };
            }
            state.isEdit = true;
        },
        handleUpdateLogoToProduct: (state, action) => {
            state.productConfig.logo = action.payload;
            state.isEdit = true;
        },
        updateDetailToProduct: (state, action) => {
            state.productConfig.detail = action.payload;
            state.isEdit = true;
        },
        handleUpdateIsEdit: (state, action) => {
            state.isEdit = false;
        },
    },
});

const productConfigReducer = productConfigSlice.reducer;

export const productConfigSelector = (state) => state.productConfigReducer;

export const {
    handleCreateProductConfig,
    handleInsertProductConfig,
    handlePushImgProductConfig,
    handleInsertDataToProductConfig,
    handleResetProductConfigChange,
    handleUpdateProductConfigChange,
    handleUpdateLogoToProduct,
    updateDetailToProduct,
    handleUpdateIsEdit,
} = productConfigSlice.actions;

export default productConfigReducer;
