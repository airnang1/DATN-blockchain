/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import CardOrder from "./CardOrder";
import TabOrder from "./TabOrder";
import { useDispatch, useSelector } from "react-redux";
import {
  handleDeleteOrder,
  handleGetOrdersInStore,
  orderSelector,
} from "../../../Store/Reducer/orderReducer";
import {
  getUserAddress,
  userAddressSelector,
} from "../../../Store/Reducer/userAddressReducer";
import { authSelector } from "../../../Store/Reducer/authReducer";

function DashboardOrder({ axiosJWT }) {
  const dispatch = useDispatch();
  const orderSlt = useSelector(orderSelector);
  const userAddressSlt = useSelector(userAddressSelector);
  const auth = useSelector(authSelector);
  const { orders } = orderSlt;

  const { userAddress, userAddressAdmin } = userAddressSlt;

  useEffect(() => {
    if (auth.user) {
      dispatch(getUserAddress({ userId: auth.user._id }));
      dispatch(handleGetOrdersInStore());
    }
  }, [dispatch, auth]);

  const confirmDelete = (order) => {
    if (order._id) {
      dispatch(
        handleDeleteOrder({
          id: order._id,
          axiosJWT,
          tokenAuth: auth.tokenAuth,
        })
      );
    }
  };

  return (
    <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
      <div className="row">
        <ol className="breadcrumb">
          <li>
            <a href="#">
              <em className="fa fa-home" />
            </a>
          </li>
          <li className="active">Order</li>
        </ol>
      </div>
      {/*/.row*/}
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Order</h1>
        </div>
      </div>
      {/*/.row*/}
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default articles">
            <div className="panel-heading">
              Sơ lược đơn đặt hàng
              <ul className="pull-right panel-settings panel-button-tab-right">
                <li className="dropdown">
                  <a
                    className="pull-right dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                  >
                    <i className="far fa-clipboard-user"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-right">
                    <li>
                      <ul className="dropdown-settings">
                        <li>
                          <a>
                            <i className="fad fa-user-tag"></i> Xem Thông Tin
                            (Chỉ 1 người)
                          </a>
                        </li>
                        <li className="divider" />
                        <li>
                          <a href="#">
                            <i className="fad fa-user-minus"></i> Xoá Ra Khỏi
                            Danh Sách
                          </a>
                        </li>
                        <li className="divider" />
                        <li>
                          <a href="#">
                            <i className="fad fa-user-lock"></i> Chặn Người Này
                          </a>
                        </li>
                        <li className="divider" />
                        <li>
                          <a href="#">
                            <i className="fad fa-user-cog"></i> Sửa Thông Tin
                            (Chỉ 1 Người)
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="orders-container">
              <div className="panel-body articles-container order-container">
                <div className="wrapper">
                  <CardOrder
                    title="Tất cả đơn hàng"
                    count={orders && orders.length}
                  />
                </div>
              </div>
              <div className="panel-body articles-container order-container">
                <div className="wrapper">
                  <CardOrder title="Giao hàng chậm" count="0" />
                </div>
              </div>
              <div className="panel-body articles-container order-container">
                <div className="wrapper">
                  <CardOrder title="Xử lý chậm" count="0" />
                </div>
              </div>
              <div className="panel-body articles-container order-container">
                <div className="wrapper">
                  <CardOrder title="Chưa đối soát" count="0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-order">
        <TabOrder
          orders={orders}
          userAddress={userAddress}
          userAddressAdmin={userAddressAdmin}
          axiosJWT={axiosJWT}
          confirmDelete={confirmDelete}
        />
      </div>
    </div>
  );
}

DashboardOrder.propTypes = {};

export default DashboardOrder;
