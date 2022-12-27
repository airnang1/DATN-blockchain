import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import AllProduct from "./AllProduct";
import WaitingConfirm from "./WaitingConfirm";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Helmet from "../../Helmet";
import DrawerOrderPay from "./DrawerOrderPay";
import { authSelector } from "../../../Store/Reducer/authReducer";
import {
  handleGetOrder,
  handleUpdateStatusOrder,
  orderSelector,
} from "../../../Store/Reducer/orderReducer";
import {
  loadingSelector,
  setLoadingAction,
} from "../../../Store/Reducer/loadingReducer";
const { TabPane } = Tabs;

const OrderUserConFirm = styled.div`
  .ant-tabs-tab {
    width: 140px;
  }
  .ant-tabs-nav-list {
    transition: 2s width ease;
  }
  .ant-tabs-tab-btn {
    margin-left: 10px;
  }
`;

function OrderUser({ axiosJWT }) {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const orderSlt = useSelector(orderSelector);
  const loading = useSelector(loadingSelector);

  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [dataOrder, setDataOrder] = useState();
  const [productWaitingConfirm, setProductWaitingConfirm] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [delivered, setDelivered] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);
  const [orderSearch, setOrderSearch] = useState(null);

  const { profilePicture } = auth.user;
  const { tokenAuth } = auth;

  useEffect(() => {
    dispatch(setLoadingAction(true));
    if (auth.tokenAuth) {
      dispatch(handleGetOrder({ tokenAuth: auth.tokenAuth, axiosJWT }));
    }
    setTimeout(() => {
      dispatch(setLoadingAction(false));
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, auth.tokenAuth]);

  useEffect(() => {
    if (orderSlt.orders) {
      setOrders(orderSlt.orders);
    }
  }, [orderSlt.orders]);

  useEffect(() => {
    const orderWaitingConfirm = orders.filter(
      (item) => item.complete === "pending"
    );
    setProductWaitingConfirm(orderWaitingConfirm);

    const orderDelivery = orders.filter((item) => item.complete === "confirm");
    setDelivery(orderDelivery);

    const orderDelivered = orders.filter((item) => item.complete === "driver");
    setDelivered(orderDelivered);

    const orderCancel = orders.filter((item) => item.complete === "cancel");
    setCancelOrder(orderCancel);
  }, [orders]);

  const handleOrderActive = (order) => {
    setDataOrder(order);
    setVisible(true);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleCancelOrderProduct = (dataOrder) => {
    setVisible(false);
    dispatch(
      handleUpdateStatusOrder({
        orderId: dataOrder._id,
        complete: "cancel",
        axiosJWT,
        tokenAuth,
      })
    );
  };

  const handleOrderRecovery = (dataOrder) => {
    setVisible(false);
    dispatch(
      handleUpdateStatusOrder({
        orderId: dataOrder._id,
        complete: "pending",
        axiosJWT,
        tokenAuth,
      })
    );
  };

  const handleSetValueSearchOrder = (value) => {
    if (value) {
      if (orders.length) {
        const orderSearch = [];
        orders.forEach((order) => {
          const isCheck = order.products.some((product) => {
            if (
              value.trim() === "" ||
              product.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            ) {
              return true;
            }
            return false;
          });
          if (isCheck) {
            orderSearch.push(order);
          }
        });
        setOrderSearch(orderSearch);
      }
    } else {
      setOrderSearch(null);
    }
  };

  return (
    <Helmet title="Order User">
      <OrderUserConFirm>
        <Tabs defaultActiveKey="1" type="card" size={110}>
          <TabPane tab="Tất cả đơn hàng" key="1">
            <AllProduct
              orders={orderSearch === null ? orders : orderSearch}
              handleOrderActive={handleOrderActive}
              photoURL={profilePicture}
              handleSetValueSearchOrder={handleSetValueSearchOrder}
              loading={loading}
            />
          </TabPane>
          <TabPane tab="Đang chờ xử lý" key="2">
            <WaitingConfirm
              orders={productWaitingConfirm}
              photoURL={profilePicture}
              handleOrderActive={handleOrderActive}
            />
          </TabPane>
          <TabPane tab="Đang giao hàng" key="3">
            <WaitingConfirm
              orders={delivery}
              photoURL={profilePicture}
              handleOrderActive={handleOrderActive}
            />
          </TabPane>
          <TabPane tab="Đã giao hàng" key="5">
            <WaitingConfirm
              orders={delivered}
              photoURL={profilePicture}
              handleOrderActive={handleOrderActive}
            />
          </TabPane>
          <TabPane tab="Đã huỷ đơn hàng" key="6">
            <WaitingConfirm
              orders={cancelOrder}
              photoURL={profilePicture}
              handleOrderActive={handleOrderActive}
            />
          </TabPane>
        </Tabs>
        <DrawerOrderPay
          visible={visible}
          placement={placement}
          onChange={onChange}
          onClose={onClose}
          dataOrder={dataOrder}
          photoURL={profilePicture}
          handleCancelOrderProduct={handleCancelOrderProduct}
          handleOrderRecovery={handleOrderRecovery}
        />
      </OrderUserConFirm>
    </Helmet>
  );
}

OrderUser.propTypes = {};

export default OrderUser;
