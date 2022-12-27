/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { humanImg } from "../../../../assets/fake-data/human.js";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleCreateOrderToGHN } from "../../../../Store/Reducer/orderReducer.js";
import { numberWithCommas } from "../../../../utils/index.js";
import { authSelector } from "../../../../Store/Reducer/authReducer.js";

function OrderDrawerBox({
  visible,
  setVisible,
  orderItem,
  userAddress,
  userAddressAdmin,
  axiosJWT,
}) {
  const dispatch = useDispatch();
  const [orderCreated, setOrderCreated] = useState("");
  const auth = useSelector(authSelector);

  useEffect(() => {
    if (orderItem) {
      const d = new Date(orderItem.createdAt);
      const orderCreated =
        d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
      setOrderCreated(orderCreated);
    }
  }, [orderItem]);

  const onClose = () => {
    setVisible(false);
  };

  const handleConfirmOrder = (order) => {
    if (order) {
      userAddress.items.forEach((item) => {
        if (item.status) {
          dispatch(
            handleCreateOrderToGHN({
              orderId: order._id,
              toName: order.username,
              toPhone: order.phoneNumber,
              toAddress: `${order.city.mota}, ${order.city.xa.WardName}, ${order.city.quan.DistrictName}, ${order.city.tinh.ProvinceName}, Vietnam`,
              toWardCode: order.city.xa.WardCode,
              toDistrictId: order.city.quan.DistrictID,
              returnPhone: order.phoneNumber,
              returnDistrictId: order.city.quan.DistrictID,
              returnWardCode: order.city.xa.WardCode,
              returnAddress: `${order.city.mota}, ${order.city.xa.WardName}, ${order.city.quan.DistrictName}, ${order.city.tinh.ProvinceName}, Vietnam`,
              clientOrderCode: "",
              codAmount:
                order.products.reduce((accumulator, item) => {
                  return accumulator + item.price * item.qty;
                }, 0) + order.paymentFee,
              content: order.products.reduce((accumulator, item) => {
                return accumulator + item.name + ", ";
              }, ""),
              weight: order.products.reduce((accumulator, item) => {
                return accumulator + Number(item.sizeInformation.weight);
              }, 0),
              length: order.products.reduce((accumulator, item) => {
                return accumulator + Number(item.sizeInformation.length);
              }, 0),
              width: order.products.reduce((accumulator, item) => {
                return accumulator + Number(item.sizeInformation.width);
              }, 0),
              height: order.products.reduce((accumulator, item) => {
                return accumulator + Number(item.sizeInformation.height);
              }, 0),
              pickStationId: order.city.quan.DistrictID,
              insuranceValue: order.products.reduce((accumulator, item) => {
                return accumulator + Number(item.price) * item.qty;
              }, 0),
              coupon: null,
              serviceTypeId: order.serviceTypeId,
              paymentTypeId: 2,
              note: order.message,
              requiredNote: "CHOTHUHANG",
              pickShift: [2],
              items: order.products.map((product) => {
                return {
                  name: product.name,
                  code: product.productId,
                  quantity: product.qty,
                  price: +product.price,
                  length: Math.round(+product.sizeInformation.length),
                  width: Math.round(+product.sizeInformation.width),
                  height: Math.round(+product.sizeInformation.height),
                  category: {
                    level1: product.category,
                  },
                };
              }),
              dispatch,
              order,
              tokenAuth: auth.tokenAuth,
              axiosJWT,
            })
          );
        }
      });

      setVisible(false);
    }
  };

  return (
    <>
      <Drawer
        width={840}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div className="logo-bar">
          <div className="container-customer">
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-8 customer-info">
                <div className="top-info-block d-inline-flex">
                  {orderItem && orderItem.phoneNumber ? (
                    <>
                      <div className="icon-block">
                        <i className="fal fa-phone"></i>
                      </div>
                      <div className="info-block">
                        <h5 className="font-weight-500">
                          {orderItem.phoneNumber}
                        </h5>
                        <p>Phone Number</p>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="top-info-block d-inline-flex">
                  <div className="icon-block">
                    <i className="fal fa-envelope"></i>
                  </div>
                  <div className="info-block">
                    <h5 className="font-weight-500">
                      {orderItem && orderItem.email}
                    </h5>
                    <p>Email Us</p>
                  </div>
                </div>
                <div className="top-info-block d-inline-flex">
                  <div className="icon-block">
                    <i className="fal fa-alarm-clock"></i>
                  </div>
                  <div className="info-block">
                    <h5 className="font-weight-500">{orderCreated} </h5>
                    <p>Created At</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="banner-area py-7">
          {/* Content */}
          <div className="container-customer">
            <div className="row  align-items-center">
              <div className="col-lg-6">
                <div className="main-banner">
                  <h1 className="display-4 mb-4 font-weight-normal">
                    {orderItem?.username}
                  </h1>
                  <p className="lead mb-4">
                    Trạng thái:{" "}
                    {orderItem?.isDelivery
                      ? "Đang vận chuyển"
                      : "đang chờ xử lý"}
                  </p>
                  <p className="lead mb-4">
                    Thanh toán:{" "}
                    {orderItem?.isPayment ? "đã thanh toán" : "chưa thanh toán"}
                  </p>
                  <p className="lead mb-4">
                    Tin nhắn:{" "}
                    {orderItem?.message ? orderItem?.message : "không có"}
                  </p>
                  <p className="lead mb-4">
                    Phí ship: {numberWithCommas(orderItem?.paymentFee)}đ
                  </p>
                  <p className="lead mb-4">Ngày tạo: {orderCreated}</p>
                  <p className="lead mb-4">
                    Địa chỉ nhận hàng:{" "}
                    {`${orderItem?.city.mota}, ${orderItem?.city.xa.WardName}, ${orderItem?.city.quan.DistrictName}, ${orderItem?.city.tinh.ProvinceName}, Vietnam`}
                  </p>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="banner-img-block">
                  <img
                    src={(orderItem && orderItem.profilePicture) || humanImg}
                    alt="banner-img"
                    className="img-fluid"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg";
                    }}
                  />
                </div>
              </div>
            </div>{" "}
            {/* / .row */}
          </div>{" "}
          {/* / .container */}
        </section>
        <section className="section bg-grey" id="feature">
          <h4 className="address-user-title">Order User</h4>
          <div className="container-customer">
            <section className="ftco-section">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="table-wrap">
                      <table className="table">
                        <thead className="thead-primary">
                          <tr>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>total</th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItem &&
                            orderItem.products.map((product) => (
                              <tr className="alert" role="alert">
                                <td>
                                  <label className="checkbox-wrap checkbox-primary">
                                    <input type="checkbox" defaultChecked />
                                    <span className="checkmark" />
                                  </label>
                                </td>
                                <td className="img">
                                  <img
                                    src={product.image}
                                    alt="image-product"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      marginLeft: "46%",
                                    }}
                                  />
                                </td>
                                <td className="email">
                                  <span>{product.name}</span>
                                  <span></span>
                                </td>
                                <td>{numberWithCommas(product.price)}đ</td>
                                <td className="quantity">
                                  <p className="input-group">{product.qty}</p>
                                </td>
                                <td>
                                  {numberWithCommas(
                                    product.price * product.qty
                                  )}
                                  đ
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="check-payment">
            <div className="total-payment">
              <span>Tổng:</span>{" "}
              <span>
                {numberWithCommas(
                  orderItem &&
                    orderItem.products.reduce((accumulator, item) => {
                      return accumulator + item.price * item.qty;
                    }, 0)
                )}
                đ
              </span>
            </div>
            <div className="fee-shipping">
              <span>Phí ship:</span>{" "}
              <span>
                {numberWithCommas(orderItem && orderItem.paymentFee)}đ
              </span>
            </div>
            <div className="payment-action">
              <span>Thanh toán:</span>{" "}
              <span>
                {numberWithCommas(
                  orderItem &&
                    orderItem.products.reduce((accumulator, item) => {
                      return accumulator + item.price * item.qty;
                    }, 0) + orderItem.paymentFee
                )}
                đ
              </span>
            </div>{" "}
            {orderItem && orderItem.complete !== "confirm" ? (
              orderItem.complete === "pending" ? (
                <Button
                  type="primary"
                  size={100}
                  onClick={() => handleConfirmOrder(orderItem)}
                >
                  Xác nhận đơn hàng
                </Button>
              ) : (
                <Button type="primary" size={100} disabled>
                  Đơn hàng đã bị hủy
                </Button>
              )
            ) : (
              <Button type="primary" size={100} disabled>
                Đơn hàng đã được xác nhận
              </Button>
            )}
          </div>

          {/* / .container */}
        </section>
      </Drawer>
    </>
  );
}

OrderDrawerBox.propTypes = {};

export default OrderDrawerBox;
