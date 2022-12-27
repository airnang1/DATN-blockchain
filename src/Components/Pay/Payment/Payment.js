import React from "react";
import styled from "styled-components";
import { Button, Col, Row, Skeleton } from "antd";
import MethodPay from "./MethodPay";
import { numberWithCommas } from "../../../utils";

const PaymentComponent = styled.div`
  height: auto;
  background: #fff;
  box-shadow: 0px 0px 10px 1px #e8e8e8;
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;

  .payment {
    &__name {
      font-size: 20px;
    }
    &__row-method {
      border-bottom: 1px dashed #eaeaea;
      margin-bottom: 20px;
    }
    &__total-price-product {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 18px;
      color: #8f8f8f;
    }
    &__total {
      font-size: 30px;
      color: #ee0000;
      transform: translateX(-15px);
    }
    &__title {
      margin-right: 50px;
    }
  }
  span.anticon.anticon-check {
    color: #009905;
  }
  .btn-active {
    background: "#ecfbff";
  }
`;
function Payment(props) {
  const {
    sumProduct,
    loading,
    handleChangeMethodPayProduct,
    handleMethodPayProduct,
    handleShowPayTable,
    payMethodActive,
  } = props;

  return (
    <PaymentComponent>
      <div className="payment">
        <MethodPay
          handleChangeMethodPayProduct={handleChangeMethodPayProduct}
          handleShowPayTable={handleShowPayTable}
          payMethodActive={payMethodActive}
        />
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="payment__row-method"
        >
          <Col className="gutter-row products-pay__col" span={16}></Col>
          {loading ? (
            <Col className="gutter-row products-pay__col" span={8}>
              <Skeleton.Button
                active={true}
                size="large"
                shape="default"
                block={false}
                style={{
                  width: "370px",
                  display: "flex",
                  alignItems: "center",
                  height: "200px",
                  marginTop: 20,
                }}
                className="cart-seklentor"
              />
            </Col>
          ) : (
            <Col className="gutter-row products-pay__col" span={8}>
              <div className="payment__total-price-product">
                <p className="payment__title">Tổng tiền hàng</p>
                <p className="payment__price">
                  ₫{sumProduct ? numberWithCommas(sumProduct) : 0}
                </p>
              </div>
              <div className="payment__total-price-product">
                <p className="payment__title">Phí vận chuyển</p>
                <p className="payment__price">₫32.700</p>
              </div>
              <div className="payment__total-price-product">
                <p className="payment__title">Tổng thanh toán:</p>
                <p className="payment__total">
                  ₫{sumProduct ? numberWithCommas(sumProduct + 32700) : 0}
                </p>
              </div>
              <Button
                type="primary"
                style={{ width: 200, height: 50, fontSize: 18 }}
                onClick={handleMethodPayProduct}
              >
                Đặt Hàng
              </Button>
            </Col>
          )}
        </Row>
      </div>
    </PaymentComponent>
  );
}

Payment.propTypes = {};

export default Payment;
