import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Badge, Button, Col, Empty, Modal, Row, Skeleton, Tooltip } from "antd";
import { Input } from "antd";
import Product from "./Product";
import { numberWithCommas } from "../../../utils";

const { TextArea } = Input;

const ProductsPayStyle = styled.div`
  height: auto;
  background: #fff;
  box-shadow: 0px 0px 10px 1px #e8e8e8;
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
  overflow: hidden;
  .products-pay {
    &__row-title {
      border-bottom: 1px solid #eaeaea;
    }
    &__col {
    }
    &__name {
      font-size: 21px;
    }
    &__unit {
      font-size: 17px;
      color: #a2a2a2;
    }
    &__row-products {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 20px;
    }
    &__name-product {
      font-size: 17px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 0;
    }
    &__kind {
      font-size: 15px;
      font-weight: 600;
      color: #a2a2a2;
      margin: 0;
    }
    &__amount {
      margin-left: 25px;
      font-size: 17px;
      margin: 0;
    }
    &__price {
      color: #e67171;
      font-size: 17px;
      margin: 0;
    }
    &__unit-price {
      font-size: 17px;
      margin: 0;
    }
  }
  .flex-end {
    display: flex;
    justify-content: flex-end;
  }
  button.ant-btn.ant-btn-link {
    font-size: 17px;
  }
  img {
    width: 100%;
  }
  .contact-shop {
    border-top: 1px dashed #c5c5c5;
    &__message {
      font-size: 18px;
      color: #5ebcec;
    }
    &__message-price {
      display: flex;
      justify-content: space-between;
    }
    &__price {
      font-size: 17px;
    }
    &__content {
      font-size: 15px;
      color: #919191;
    }
  }
  .ant-empty {
    margin: 32px 30px;
  }
  .cart-seklentor {
    width: "100%";
  }
`;
function ProductsPay(props) {
  const {
    products_api,
    loading,
    handleChangeMessage,
    serviceFee,
    feeService,
    setFeeServince,
    leadTime,
    servicePackage,
    setServiceTypeId,
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [active, setActive] = useState(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (leadTime) {
      const timeLine = new Date(leadTime).toLocaleDateString("en-GB");

      setTime(timeLine);
    }
  }, [leadTime]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const renderProductApi = products_api.map((product, index) =>
    loading ? (
      <Skeleton.Button
        active={true}
        size="large"
        shape="default"
        block={false}
        style={{
          width: 1200,
          display: "flex",
          alignItems: "center",
          height: "100px",
          marginTop: 20,
        }}
        className="cart-seklentor"
        key={index}
      />
    ) : (
      <Product key={product._id} product={product} />
    )
  );

  const handleSetFeeService = (fee, index) => {
    setFeeServince(fee.data.total);
    setServiceTypeId(fee.service_type_id);
    setActive(index);
  };

  useEffect(() => {
    if (serviceFee) {
      if (serviceFee.length && serviceFee[0].data) {
        setFeeServince(serviceFee[0].data.total);
        setServiceTypeId(serviceFee[0].service_type_id);
        setActive(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceFee]);

  return (
    <ProductsPayStyle>
      <div className="products-pay">
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="products-pay__row-title"
        >
          <Col className="gutter-row products-pay__col" span={13}>
            <p className="products-pay__name">Sản phẩm</p>
          </Col>
          <Col className="gutter-row products-pay__col" span={3}>
            <p className="products-pay__unit">Đơn Giá</p>
          </Col>
          <Col className="gutter-row products-pay__col" span={3}>
            <p className="products-pay__unit">Số Lượng</p>
          </Col>
          <Col className="gutter-row products-pay__col flex-end" span={5}>
            <p className="products-pay__unit">Thành Tiền</p>
          </Col>
        </Row>
        {renderProductApi.length ? renderProductApi : <Empty />}
      </div>
      <div className="contact-shop">
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="contact-shop__row-products"
        >
          {loading ? (
            <Skeleton.Button
              active={true}
              size="large"
              shape="default"
              block={false}
              style={{
                width: "550px",
                display: "flex",
                alignItems: "center",
                height: "150px",
                marginTop: 20,
                marginLeft: 30,
              }}
              className="cart-seklentor"
            />
          ) : (
            <Col className="gutter-row contact-shop__col" span={10}>
              <div className="contact-shop__message">Lời Nhắn</div>
              <TextArea
                rows={4}
                placeholder="Hãy để lại lời nhắn cho người bán..."
                onChange={handleChangeMessage}
              />
            </Col>
          )}
          {loading ? (
            <Skeleton.Button
              active={true}
              size="large"
              shape="default"
              block={false}
              style={{
                width: "550px",
                display: "flex",
                alignItems: "center",
                height: "150px",
                marginTop: 20,
                marginLeft: 60,
              }}
              className="cart-seklentor"
            />
          ) : (
            <Col className="gutter-row contact-shop__col" span={14}>
              <div className="contact-shop__message-price">
                <div className="contact-shop__message">Đơn Vị Vận Chuyển</div>
                <div className="contact-shop__price">
                  {numberWithCommas(feeService)}₫
                </div>
              </div>
              <div className="contact-shop__message-price">
                <div className="contact-shop__message">
                  Thời gian giao hàng ước tính:
                </div>
                <div className="contact-shop__price">{time}</div>
              </div>
              <div className="contact-shop__content">
                <p className="contact-shop__info-ship">
                  {servicePackage && servicePackage.code_message_value}
                </p>
              </div>

              <Button
                type="link"
                disabled={serviceFee && serviceFee.length === 0}
                onClick={showModal}
              >
                Thay Đổi
              </Button>

              <Modal
                title="Đơn vị vận chuyển"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <div className="cards">
                  {serviceFee &&
                    serviceFee.map(
                      (item, index) =>
                        item && (
                          <Badge.Ribbon
                            text="Đã chọn"
                            color="success"
                            style={{
                              right: 2,
                              display: active === index ? "block" : "none",
                              top: 25,
                            }}
                            key={index}
                          >
                            <Tooltip
                              title={`Phí dịch vụ: ${numberWithCommas(
                                item.data?.service_fee
                              )}₫. Phí khai giá hàng hóa: ${numberWithCommas(
                                item.data?.insurance_fee
                              )}₫. Phí gửi hàng tại bưu cục: ${numberWithCommas(
                                item.data?.pick_station_fee
                              )}₫. Phí giao lại hàng: ${numberWithCommas(
                                item.data?.r2s_fee
                              )}₫. `}
                              color="#2db7f5"
                              className="card"
                            >
                              <div
                                className="card card-1"
                                onClick={() => handleSetFeeService(item, index)}
                              >
                                <h2 className="card__title">
                                  Tổng chi phí:
                                  <p className="payment__price">
                                    {numberWithCommas(item.data?.total)}₫
                                  </p>
                                </h2>
                                <p className="card__apply">
                                  Phương thức vận chuyển: {item?.short_name}{" "}
                                </p>
                              </div>
                            </Tooltip>
                          </Badge.Ribbon>
                        )
                    )}
                </div>
              </Modal>
            </Col>
          )}
        </Row>
      </div>
    </ProductsPayStyle>
  );
}

ProductsPay.propTypes = {};

export default ProductsPay;
