import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const baseURL = process.env.REACT_APP_SERVER_API;

axios.defaults.withCredentials = true;

// handle feature for User Page
export const updateProfileUser = createAsyncThunk(
  "updateProfileUser/updateProfileUserFetch",
  async ({ tokenAuth, data, axiosJWT }) => {
    try {
      await axiosJWT.put(`${baseURL}/users`, data, {
        headers: { Authorization: tokenAuth, data },
      });
      return data;
    } catch (err) {
      console.log(err);
      toast.error(`${err.message} 😓`);
    }
  }
);

// handle feature for Login Page
export const fetchSignupAction = createAsyncThunk(
  "signup/signupFetch",
  async (data, { rejectWithValue }) => {
    const {val: {name, email, password}, history} = data;
    try {
      await axios.post(`${baseURL}/auth/register`, {
        username: name,
        email,
        password,
      });
      history.push('/verify-email')
      toast.success(`Đăng ký thành công, hãy vào email của bạn để xác nhận 😍`);
    } catch (err) {
      console.log(err);
      toast.error(`${err.message} 😓`);
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginSocialAction = createAsyncThunk(
  "loginSocial/loginSocialFetch",
  async (data) => {
    try {
      const res = await axios.post(
        `${baseURL}/auth/${data.domant}_login`,
        data.data
      );
      console.log(res);
      toast.success(`Chào mừng bạn quay lại 😜`);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(`Đã xuất hiện lỗi vui lòng thực hiện lại 😓`);
    }
  }
);

export const fetchSigninAction = createAsyncThunk(
  "signinAction/fetchSigninAction",
  async (data) => {
    try {
      const res = await axios.post(`${baseURL}/auth/login`, {
        email: data.email,
        password: data.password,
      });
      toast.success(`Chào mừng bạn quay lại 😜`);
      return res.data;
    } catch (err) {
      console.log(err);
      toast.error(`Đã xuất hiện lỗi vui lòng thực hiện lại 😓`);
      return err;
    }
  }
);

export const forgotPasswordCall = createAsyncThunk(
  "forgotPassword/forgotPasswordAction",
  async ({email, history}) => {
    try {
      const res = await axios.post(`${baseURL}/auth/forgot-password`, {
        email,
      });
      res &&
        toast.success(
          `Tin nhắn đã được gửi đến địa chỉ ${email}, vui lòng kiểm tra 🥰`
        );
      history.push("/buyer/signin");
    } catch (error) {
      console.log(error);
      toast.error(`Đã xuất hiện lỗi vui lòng thực hiện lại 😓`);
    }
  }
);

export const handleLogout = createAsyncThunk(
  "handleLogout/handleLogoutAction",
  async (history) => {
    try {
      await axios.post(`${baseURL}/auth/logout`, null);
      history.push("/buyer/signin");
    } catch (error) {
      toast.error(`Đã xuất hiện lỗi vui lòng thực hiện lại 😓`);
    }
  }
);

export const fetchActivationEmail = createAsyncThunk(
  "ActivationEmail/fetchActivationEmail",
  async (activation_token) => {
    try {
      const res = await axios.post(`${baseURL}/auth/activate`, {
        activation_token,
      });
      if (res.data) {
        toast.success(`Xác nhận thành công 🥰`);
        return res.data;
      }
    } catch (error) {
      console.log({ msg: error.message });
    }
  }
);

export const getUserByToken = createAsyncThunk(
  "userByToken/getUserByToken",
  async ({ token, axiosJWT }) => {
    try {
      const res = await axiosJWT.get(`${baseURL}/users`, {
        headers: { Authorization: token },
      });
      return res.data;
    } catch (error) {
      console.log({ msg: error.message });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }
);

export const resetPasswordCall = createAsyncThunk(
  "resetPassword/resetPasswordToken",
  async (data) => {
    try {
      const res = await axios.post(`${baseURL}/auth/reset-password`, data.val, {
        headers: { Authorization: data.token },
      });
      res &&
        toast.success(
          `Bạn đã đổi thành công mật khâu mới, hãy đăng nhập lại nào 🥰`
        );
      data.history.push("/buyer/signin");
    } catch (error) {
      data.history.push("*");
      console.log({ msg: error.message });
      toast.error(`Đã xuất hiện lỗi vui lòng thực hiện lại 😓`);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: {
      user: JSON.parse(localStorage.getItem("user")) || null,
      tokenAuth: JSON.parse(localStorage.getItem("token")) || null,
      register: false,
      isForgetPassword: false,
    },
  },
  reducers: {
    logoutAction: (state, action) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.auth.user = null;
      state.auth.tokenAuth = null;
    },
    signingSuccess: (state, action) => {
      const token = action.payload.access_token;
      state.auth.tokenAuth = token;
      localStorage.setItem("token", JSON.stringify(token));

      state.auth.register = false;
    },
    resetIsForgetPassword: (state, action) => {
      state.auth.isForgetPassword = action.payload;
    }
  },
  extraReducers: {
    //update user profile
    [updateProfileUser.pending]: (state, action) => {},
    [updateProfileUser.fulfilled]: (state, action) => {
      const data = action.payload;
      if (data) {
        state.auth.user = { ...state.auth.user, ...data };
        localStorage.setItem("user", JSON.stringify(state.auth.user));
      }
    },
    [updateProfileUser.rejected]: (state, action) => {},

    //fetch activation email
    [fetchSignupAction.pending]: (state, action) => {},
    [fetchSignupAction.fulfilled]: (state, action) => {
      state.auth.register = true;
    },
    [fetchSignupAction.rejected]: (state, action) => {
      state.auth.register = false;
    },

    //fetch activation email
    [loginSocialAction.pending]: (state, action) => {},
    [loginSocialAction.fulfilled]: (state, action) => {
      if (action.payload) {
        const user = action.payload.newUser || action.payload.user;
        const token = action.payload.accessToken;

        state.auth.user = user;
        state.auth.tokenAuth = token;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));

        state.auth.register = false;
      }
    },
    [loginSocialAction.rejected]: (state, action) => {},

    // reset password email
    [resetPasswordCall.pending]: (state, action) => {},
    [resetPasswordCall.fulfilled]: (state, action) => {
      state.auth.register = false;
      state.auth.isForgetPassword = true;
    },
    [resetPasswordCall.rejected]: (state, action) => {},

    //forgot password email
    [forgotPasswordCall.pending]: (state, action) => {},
    [forgotPasswordCall.fulfilled]: (state, action) => {
      state.auth.register = true;
    },
    [forgotPasswordCall.rejected]: (state, action) => {},

    //fetch activation email
    [fetchActivationEmail.pending]: (state, action) => {},
    [fetchActivationEmail.fulfilled]: (state, action) => {
      if (action.payload) {
        const token = action.payload.accessToken;
        const user = action.payload.newUser;

        state.auth.user = user;
        state.auth.tokenAuth = token;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));

        state.auth.register = false;
      }
    },
    [fetchActivationEmail.rejected]: (state, action) => {
      state.auth.user = null;
      state.auth.register = true;
    },

    // get users authentication
    [getUserByToken.pending]: (state, action) => {},
    [getUserByToken.fulfilled]: (state, action) => {
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.auth.user = action.payload;
      }
    },
    [getUserByToken.rejected]: (state, action) => {
    },

    // get users authentication
    [handleLogout.pending]: (state, action) => {},
    [handleLogout.fulfilled]: (state, action) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userAddress");
      state.auth.user = null;
      state.auth.tokenAuth = null;
      state.auth.isForgetPassword = false;
    },
    [handleLogout.rejected]: (state, action) => {
    },

    // Signing
    [fetchSigninAction.pending]: (state, action) => {},
    [fetchSigninAction.fulfilled]: (state, action) => {
      if (action.payload.accessToken && action.payload.user) {
        const token = action.payload.accessToken;
        const user = action.payload.user;

        state.auth.user = user;
        state.auth.tokenAuth = token;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));

        state.auth.register = false;
      }
    },
    [fetchSigninAction.rejected]: (state, action) => {
    },
  },
});

const authReducer = authSlice.reducer;

export const authSelector = (state) => state.authReducer.auth;
export const { logoutAction, signingSuccess, resetIsForgetPassword } = authSlice.actions;

export default authReducer;
