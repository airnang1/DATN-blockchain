import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
const baseURL = process.env.REACT_APP_SERVER_API;

axios.defaults.withCredentials = true;

const messageToCart = (status) => {
  if (status) {
    message.success({
      content: "Sản phẩm đã được thêm vào giỏ hàng !",
      className: "custom-class",
      style: {
        marginTop: "0vh",
      },
    });
  } else {
    message.warning({
      content: "Sản Phẩm đã có trong giỏ hàng!",
      className: "custom-class",
      style: {
        marginTop: "0vh",
      },
    });
  }
};

export const getOrCreateCartToUserApi = createAsyncThunk(
  "getOrCreateCartToUserApi/getOrCreateCartToUserApiFetch",
  async ({ token, axiosJWT }) => {
    try {
      const res = await axiosJWT.post(`${baseURL}/cart`, null, {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteProductsInCart = createAsyncThunk(
  "deleteProductsInCart/deleteProductsInCartApiFetch",
  async ({ productsId, cartId }) => {
    try {
      const res = await axios.delete(
        `${baseURL}/cart/delete-product/${cartId}`,
        {
          data: {
            productsId,
            cartId,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const handleAddProductToCart = createAsyncThunk(
  "handleAddProductToCart/handleAddProductToCartFetch",
  async (data) => {
    const { axiosJWT } = data;
    try {
      const res = await axiosJWT.post(
        `${baseURL}/cart/${data.cart._id}`,
        {
          productId: data.obj._id,
          qty: data.amout,
          indexProduct: data.obj.count,
          name: data.obj.name,
          price: data.obj.price,
          priceOld: data.obj.priceOld,
          category: data.obj.category,
          image: data.obj.image[0].data,
          capacity: data.obj.capacity,
          sizeInformation: data.obj.sizeInformation,
          tokenEth: data.obj.tokenEth,
        },
        {
          headers: { Authorization: data.user.tokenAuth },
        }
      );
      messageToCart(true);
      return res.data;
    } catch (err) {
      toast.warning(`Thêm sản phẩm thất bại`);
      console.log(err);
    }
  }
);

export const handleAddProductToCartBuyAction = createAsyncThunk(
  "handleAddProductToCartBuyAction/handleAddProductToCartBuyActionFetch",
  async (data) => {
    const { isChecked } = data;
    const { axiosJWT } = data;
    try {
      const res = await axiosJWT.post(
        `${baseURL}/cart/${data.cart._id}`,
        {
          productId: data.obj._id,
          qty: data.amout,
          indexProduct: data.obj.count,
          name: data.obj.name,
          price: data.obj.price,
          priceOld: data.obj.priceOld,
          category: data.obj.category,
          image: data.obj.image[0].data,
          capacity: data.obj.capacity,
          sizeInformation: data.obj.sizeInformation,
        },
        {
          headers: { Authorization: data.user.tokenAuth },
        }
      );
      messageToCart(true);
      return {
        itemsChecked: {
          isChecked,
          image: data.obj.image[0].data,
        },
        data: res.data,
      };
    } catch (err) {
      toast.warning(`Thêm sản phẩm thất bại`);
      console.log(err);
      toast.error(`${err.message} 😓`);
    }
  }
);

export const handleRemoveProductToCart = createAsyncThunk(
  "handleRemoveProductToCart/handleRemoveProductToCartFetch",
  async (data) => {
    try {
      const res = await axios.delete(`${baseURL}/cart/${data.cart._id}`, {
        data: {
          productId: data.product._id,
          price: data.product.price,
        },
      });
      toast.success(`Removed ${data.product.name} `);
      return res.data;
    } catch (err) {
      toast.warning(`remove failure`);
      console.log(err);
      toast.error(`${err.message} 😓`);
    }
  }
);

export const handleUpdateAmountProductToCart = createAsyncThunk(
  "handleUpdateAmountProductToCart/handleUpdateAmountProductToCartFetch",
  async (data) => {
    try {
      const res = await axios.put(`${baseURL}/cart/${data.cartId}`, {
        productId: data.productId,
        indexProduct: data.indexProduct,
        qty: data.qty,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      toast.error(`${err.message} 😓`);
    }
  }
);

export const handleResetCart = createAsyncThunk(
  "handleResetCart/handleResetCartFetch",
  async (cart) => {
    try {
      const res = await axios.put(`${baseURL}/cart/reset/${cart._id}`, null);
      return res.data;
    } catch (err) {
      toast.warning(`update amount failure`);
      console.log(err);
      toast.error(`${err.message} 😓`);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || null,
  },
  reducers: {
    handleResetCartUser(state, action) {
      localStorage.removeItem("cart");
      state.cart = null;
    },
  },
  extraReducers: {
    //fetch activation email
    [getOrCreateCartToUserApi.pending]: (state, action) => {},
    [getOrCreateCartToUserApi.fulfilled]: (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
        localStorage.setItem("cart", JSON.stringify(action.payload));
      }
    },
    [getOrCreateCartToUserApi.rejected]: (state, action) => {},

    //fetch activation email
    [handleAddProductToCartBuyAction.pending]: (state, action) => {},
    [handleAddProductToCartBuyAction.fulfilled]: (state, action) => {
      if (action.payload) {
        state.cart.cart.items = action.payload.data.cart.items.map((item) => {
          if (item.image === action.payload.itemsChecked.image) {
            return { ...item, isChecked: true };
          } else {
            return item;
          }
        });

        localStorage.setItem("cart", JSON.stringify(action.payload.data));
      }
    },
    [handleAddProductToCartBuyAction.rejected]: (state, action) => {},
    //fetch activation email
    [handleAddProductToCart.pending]: (state, action) => {},
    [handleAddProductToCart.fulfilled]: (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
        localStorage.setItem("cart", JSON.stringify(action.payload));
      }
    },
    [handleAddProductToCart.rejected]: (state, action) => {},
    //fetch activation email
    [handleRemoveProductToCart.pending]: (state, action) => {},
    [handleRemoveProductToCart.fulfilled]: (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
        localStorage.setItem("cart", JSON.stringify(action.payload));
      }
    },
    [handleRemoveProductToCart.rejected]: (state, action) => {},
    //fetch activation email
    [handleUpdateAmountProductToCart.pending]: (state, action) => {},
    [handleUpdateAmountProductToCart.fulfilled]: (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
        localStorage.setItem("cart", JSON.stringify(action.payload));
      }
    },
    [handleUpdateAmountProductToCart.rejected]: (state, action) => {},
    //fetch activation email
    [handleResetCart.pending]: (state, action) => {},
    [handleResetCart.fulfilled]: (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
        localStorage.setItem("cart", JSON.stringify(action.payload));
      }
    },
    [handleResetCart.rejected]: (state, action) => {},

    //fetch activation email
    [deleteProductsInCart.pending]: (state, action) => {},
    [deleteProductsInCart.fulfilled]: (state, action) => {
      if (action.payload) {
        state.cart = action.payload;
        localStorage.setItem("cart", JSON.stringify(action.payload));
      }
    },
    [deleteProductsInCart.rejected]: (state, action) => {},
  },
});

const cartReducer = cartSlice.reducer;

export const cartSelector = (state) => state.cartReducer.cart;
export const { handleResetCartUser } = cartSlice.actions;

export default cartReducer;
