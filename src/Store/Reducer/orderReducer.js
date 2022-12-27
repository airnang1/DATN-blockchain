import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
const baseURL = process.env.REACT_APP_SERVER_API;

const tokenKeys = "874008ef-d7ee-11ec-ac64-422c37c6de1b";
const shopId = 114505;
const url = baseURL;
const orderTokenPrintAPI = `https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token`;
const apiOrderCreate =
  "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create";

axios.defaults.withCredentials = true;

export const handleAddOrder = createAsyncThunk(
  "handleAddOrder/handleAddOrderFetch",
  async (
    {
      username,
      phoneNumber,
      city,
      productsID,
      tokenAuth,
      isPayment,
      message,
      paymentFee,
      serviceTypeId,
      axiosJWT,
    },
    { rejectWithValue }
  ) => {
    if (paymentFee && serviceTypeId) {
      try {
        const res = await axiosJWT.post(
          `${url}/order`,
          {
            username,
            phoneNumber,
            city,
            productsID,
            isPayment,
            message,
            paymentFee,
            serviceTypeId,
          },
          {
            headers: { Authorization: tokenAuth },
          }
        );
        return res.data;
      } catch (err) {
        toast.warning(`Tạo đơn hàng thất bại!`);
        console.log(err);
        return rejectWithValue(err.response.data);
      }
    }
  }
);

export const handleGetOrder = createAsyncThunk(
  "handleGetOrder/handleGetOrderFetch",
  async ({ tokenAuth, axiosJWT }) => {
    try {
      const res = await axiosJWT.get(`${url}/order`, {
        headers: { Authorization: tokenAuth },
      });
      return res.data;
    } catch (err) {
      toast.warning(`Get orders failed!`);
      console.log(err);
    }
  }
);

export const handleGetOrdersInStore = createAsyncThunk(
  "handleGetOrdersInStore/handleGetOrdersInStoreFetch",
  async () => {
    try {
      const res = await axios.get(`${url}/order/all`);
      return res.data;
    } catch (err) {
      toast.error(`Get orders failed!`);
      console.log(err);
    }
  }
);

export const handleDeleteOrder = createAsyncThunk(
  "handleDeleteOrderFetch/handleDeleteOrderFetchStore",
  async ({ id, axiosJWT, tokenAuth }) => {
    try {
      await axiosJWT.delete(`${url}/order/${id}`, {
        headers: { Authorization: tokenAuth },
      });
      toast.success("Bạn đã xóa thành công đơn hàng này");
      return { id };
    } catch (err) {
      toast.error(`delete order failed!`);
      console.log(err);
    }
  }
);

export const handleCreateOrderToGHN = createAsyncThunk(
  "handleCreateOrderToGHN/handleCreateOrderToGHNFetch",
  async ({
    toName,
    toPhone,
    toAddress,
    toWardCode,
    toDistrictId,
    returnPhone,
    returnDistrictId,
    returnWardCode,
    returnAddress,
    clientOrderCode,
    codAmount,
    content,
    weight,
    length,
    width,
    height,
    pickStationId,
    insuranceValue,
    coupon,
    serviceTypeId,
    paymentTypeId,
    note,
    requiredNote,
    items,
    pickShift,
    orderId,
    dispatch,
    order,
    tokenAuth,
    axiosJWT,
  }) => {
    try {
      let res = await fetch(apiOrderCreate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          shop_id: shopId,
          token: tokenKeys,
        },
        body: JSON.stringify({
          payment_type_id: 1,
          note: note,
          required_note: requiredNote,
          return_phone: returnPhone,
          return_address: returnAddress,
          return_district_id: returnDistrictId,
          return_ward_code: returnWardCode,
          client_order_code: clientOrderCode,
          to_name: toName,
          to_phone: toPhone,
          to_district_id: toDistrictId,
          to_ward_code: toWardCode,
          to_address: toAddress,
          cod_amount: codAmount,
          content: content,
          weight: Math.round(+weight),
          length: Math.round(+length),
          width: Math.round(+width),
          height: Math.round(+height),
          pick_station_id: pickStationId,
          deliver_station_id: null,
          insurance_value: insuranceValue >= 5000000 ? 3000000 : insuranceValue,
          service_type_id: 1,
          coupon: coupon,
          pick_shift: pickShift,
          items: items,
        }),
      });

      let commits = await res.json();

      const resOrder = await axios.put(`${url}/order/${orderId}`, {
        complete: "confirm",
        isDelivery: true,
        orderCode: commits.data.order_code,
        returnMessage: commits.code_message_value,
        expectedDeliveryTime: commits.data.expected_delivery_time,
      });

      dispatch(
        handleUpdateStatusOrder({
          orderId: order._id,
          complete: "confirm",
          tokenAuth,
          axiosJWT,
          isDelivery: true,
        })
      );
      toast.success(
        `Đơn hàng ${orderId} đã được xác nhận, bạn có thể in đơn hàng!`
      );
      return resOrder.data;
    } catch (err) {
      toast.error(`Create order failed!`);
      console.log(err);
    }
  }
);

export const handlePrintOrderOfUser = createAsyncThunk(
  "handlePrintOrderOfUser/handlePrintOrderOfUserFetch",
  async ({ orderCode, orderId }) => {
    try {
      let res = await fetch(orderTokenPrintAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json", token: tokenKeys },
        body: JSON.stringify({
          order_codes: [orderCode],
        }),
      });

      let commits = await res.json();

      const resOrder = await axios.put(`${url}/order/${orderId}`, {
        tokenPrintCode: commits.data.token,
      });
      if (resOrder.data.order.tokenPrintCode) {
        const newWindow = window.open(
          `https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${resOrder.data.order.tokenPrintCode}`,
          "_blank",
          "noopener,noreferrer"
        );
        if (newWindow) newWindow.opener = null;
      }
      return resOrder.data;
    } catch (err) {
      toast.error(`Get orders failed!`);
      console.log(err);
    }
  }
);

export const handleUpdateStatusOrder = createAsyncThunk(
  "handleUpdateStatusOrder/handleUpdateStatusOrderFetch",
  async ({ orderId, complete, tokenAuth, axiosJWT, isDelivery }) => {
    try {
      const res = await axiosJWT.put(
        `${url}/order/${orderId}`,
        {
          complete,
          isDelivery,
        },
        {
          headers: { Authorization: tokenAuth },
        }
      );
      toast.success(`Đơn hàng ${orderId} đã được xác nhận!`);

      return res.data;
    } catch (err) {
      toast.error(`Get orders failed!`);
      console.log(err);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    isError: false,
    orders: null,
  },
  reducers: {},
  extraReducers: {
    //fetch activation email
    [handleCreateOrderToGHN.pending]: (state, action) => {},
    [handleCreateOrderToGHN.fulfilled]: (state, action) => {
      if (action.payload) {
        const orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order
        );
        state.orders = orders;
      }
    },
    [handleCreateOrderToGHN.rejected]: (state, action) => {},

    //fetch activation email
    [handlePrintOrderOfUser.pending]: (state, action) => {},
    [handlePrintOrderOfUser.fulfilled]: (state, action) => {
      if (action.payload) {
        const orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order
        );
        state.orders = orders;
      }
    },
    [handlePrintOrderOfUser.rejected]: (state, action) => {},

    //fetch activation email
    [handleGetOrdersInStore.pending]: (state, action) => {},
    [handleGetOrdersInStore.fulfilled]: (state, action) => {
      if (action.payload) {
        state.orders = action.payload.orders;
      }
    },
    [handleGetOrdersInStore.rejected]: (state, action) => {},
    //fetch activation email
    [handleAddOrder.pending]: (state, action) => {},
    [handleAddOrder.fulfilled]: (state, action) => {
      if (action.payload) {
        state.order = action.payload.newOrder;
      }
    },
    [handleAddOrder.rejected]: (state, action) => {
      state.isError = true;
    },
    [handleDeleteOrder.pending]: (state, action) => {},
    [handleDeleteOrder.fulfilled]: (state, action) => {
      if (action.payload) {
        const { id } = action.payload;
        state.orders = state.orders.filter(
          (order) => order._id.toString() !== id
        );
      }
    },
    [handleDeleteOrder.rejected]: (state, action) => {},

    //fetch activation email
    [handleGetOrder.pending]: (state, action) => {},
    [handleGetOrder.fulfilled]: (state, action) => {
      if (action.payload) {
        state.orders = action.payload.orders;
      }
    },
    [handleGetOrder.rejected]: (state, action) => {},

    //fetch activation email
    [handleUpdateStatusOrder.pending]: (state, action) => {},
    [handleUpdateStatusOrder.fulfilled]: (state, action) => {
      if (action.payload) {
        const orders = state.orders.map((order) =>
          order._id === action.payload.order._id ? action.payload.order : order
        );
        state.orders = orders;
      }
    },
    [handleUpdateStatusOrder.rejected]: (state, action) => {},
  },
});

const orderReducer = orderSlice.reducer;

export const orderSelector = (state) => state.orderReducer;
export const { handleResetOrderUser } = orderSlice.actions;

export default orderReducer;
