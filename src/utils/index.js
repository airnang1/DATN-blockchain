import axios from "axios";
import jwt_decode from "jwt-decode";
import { signingSuccess } from "../Store/Reducer/authReducer";
import { toast } from "react-toastify";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const baseURL = process.env.REACT_APP_SERVER_API;

export const newObjectId = () => {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  const objectId =
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
      })
      .toLowerCase();

  return objectId;
};

export const sortLowToHight = (products) => {
  return products
    .slice()
    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
};

export const sortHightToLow = (products) => {
  return products
    .slice()
    .sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
};

export const openNotification = (title, des) => {
  notification.open({
    message: title,
    description: des,
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
};

export const getProducts = (count, products) => {
  if (products) {
    let products_api = products.slice();
    products_api.sort(() => Math.random() - 0.5).slice();
    return products_api.slice(0, count);
  } else {
    return [];
  }
};

export const numberWithCommas = (num) =>
  num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;

export const imageShow = (src, theme) => {
  return <img src={src} alt="images" className="img-thumbnail" />;
};

export const videoShow = (src, theme) => {
  return <video controls src={src} alt="images" className="img-thumbnail" />;
};

export const messageInfoToast = (status, title) => {
  if (status) {
    toast.success(title);
  } else {
    toast.warning(title);
  }
};

export const loadingProductHome = (products) => {
  const count = Math.ceil(products.length / 5);
  return count * 380;
};

export const isEmptyObject = (v) => {
  return !!v && v.constructor === Object && Object.keys(v).length === 0;
};

export const isEmptyObjectAll = (v) => {
  const data = Object.values(v);
  const isCheck = data.some((item) => {
    if (item) {
      return item.length === 0;
    }
    return false;
  });

  return isCheck;
};

export const handleChangeProductPrice = (priceOld, priceNew) => {
  if (+priceOld < priceNew) {
    return 0;
  } else {
    return Math.round(((+priceOld - priceNew) / +priceOld) * 100);
  }
};

function isObject(obj) {
  return obj && typeof obj === "object";
}

export function isArray(obj) {
  return isObject(obj) && obj instanceof Array;
}

export const findIndex = (products, id) => {
  var result = -1;
  products.forEach((product, index) => {
    if (product._id === id) {
      result = index;
    }
  });
  return result;
};

export default function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

export const handleGetAxiosJWT = ({ token, dispatch, handleGetAxiosToken }) => {
  let axiosJWT = axios.create();

  const refreshToken = async () => {
    try {
      const res = await axios.post(`${baseURL}/auth/refresh_token`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodeToken = jwt_decode(token);
      if (decodeToken.exp < date.getTime() / 1000) {
        const data = refreshToken();
        dispatch(signingSuccess(data));
        config.headers["Authorization"] = data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  handleGetAxiosToken(axiosJWT);
};

export const isStringEmptyArray = (arr) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === "") return true;
  }
  return false;
};
