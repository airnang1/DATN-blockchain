import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Col, Row, Skeleton } from "antd";
import DeliveryAddressTitle from "./DeliveryAddressTitle";
import ModalAddress from "./ModalAddress";

const DeliveryStyle = styled.div`
  height: 120px;
  background: #fff;
  box-shadow: 0px 0px 10px 1px #e8e8e8;
  border-radius: 5px;
  .delivery-address {
    transform: translateY(15px);
    &__row {
    }
    &__col--title {
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      font-size: 22px;
      color: #f4642a;
      & i {
        margin-left: 20px;
      }
    }
    &__title {
      padding: 10px 10px;
      margin: 0;
    }
    &__name-user {
      font-size: 18px;
      margin-left: 20px;
      font-weight: 600;
      letter-spacing: 1px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    &__address-user {
      font-size: 19px;
      font-weight: 100;
      color: #7f7f7f;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
    }
    &__border-top {
      height: 3px;
      display: flex;
      & .a1 {
        width: 40px;
        height: 100%;
        transform: skewX(50deg);
        background: red;
        margin-left: 15px;
      }
      & .a2 {
        width: 40px;
        height: 100%;
        transform: skewX(50deg);
        background: blue;
        margin-left: 15px;
      }
    }
  }
  .ant-skeleton-element {
    display: inline-block;
    width: 100%;
    height: 100%;
    transform: translateY(-20px);
  }
`;

function DeliveryAddress(props) {
  const {
    address_api,
    loading,
    valueAddress,
    showModal,
    visible,
    handleOk,
    handleCancel,
    modalText,
    confirmLoading,
    onHandleValueImportAddress,
    handleImportImput,
    onChangeCheckbox,
    inputName,
    inputNumber,
    handleChangeInputName,
    address_user_api,
    handleChangeInputNumber,
    userAddress,
    setUserAddressDefault,
    userAddressDefault,
    lngLat,
    setLngLat,
    isShowSavedAddress,
  } = props;
  const [userAddressValue, setUserAddressValue] = useState(null);

  useEffect(() => {
    if (userAddress) {
      userAddress.items.forEach((item) => {
        if (item.status) {
          setUserAddressValue(item);
        }
      });
    }
  }, [userAddress]);

  return (
    <DeliveryStyle>
      {loading ? (
        <Skeleton.Button
          active={true}
          size="large"
          shape="default"
          block={false}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            height: "100%",
            marginTop: 20,
          }}
          className="cart-seklentor"
        />
      ) : (
        <>
          <div className="delivery-address__border-top">
            <div className="a1"></div>
            <div className="a2"></div>
            <div className="a1"></div>
            <div className="a2"></div>
            <div className="a1"></div>
            <div className="a2"></div>
            <div className="a1"></div>
            <div className="a2"></div>
            <div className="a1"></div>
            <div className="a2"></div>
            <div className="a1"></div>
            <div className="a2"></div>
            <div className="a1"></div>
            <div className="a2"></div>
            <div className="a1"></div>
            <div className="a2"></div>
            <div className="a1"></div>
            <div className="a2"></div>
            <div className="a1"></div>
            <div className="a2"></div>
            <div className="a1"></div>
            <div className="a2"></div>
            <div className="a1"></div>
          </div>
          <div className="delivery-address">
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              className="delivery-address__row"
            >
              <Col
                className="gutter-row delivery-address__col--title"
                span={24}
              >
                <i className="fad fa-map-marker-alt"></i>
                <p className="delivery-address__title">Địa Chỉ Nhận Hàng</p>
              </Col>
            </Row>
            {userAddress && userAddress.items.length ? (
              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                className="delivery-address__row"
              >
                {/* <UserAddressItems userAddress={userAddress} /> */}
                <DeliveryAddressTitle userAddressValue={userAddressValue} />
                <Col className="gutter-row delivery-address__col--des" span={4}>
                  <Button type="link" onClick={showModal}>
                    THAY ĐỔI
                  </Button>
                </Col>
              </Row>
            ) : (
              <p
                className="text-info"
                style={{ fontSize: 20, textAlign: "center" }}
              >
                Hiện tại bạn chưa có địa chỉ mặc định nào?
              </p>
            )}
            <ModalAddress
              visible={visible}
              handleOk={handleOk}
              handleCancel={handleCancel}
              modalText={modalText}
              confirmLoading={confirmLoading}
              address_api={address_api}
              objAddress={valueAddress}
              onHandleValueImportAddress={onHandleValueImportAddress}
              handleImportImput={handleImportImput}
              inputName={inputName}
              inputNumber={inputNumber}
              handleChangeInputName={handleChangeInputName}
              handleChangeInputNumber={handleChangeInputNumber}
              onChangeCheckbox={onChangeCheckbox}
              address_user_api={address_user_api}
              userAddress={userAddress}
              setUserAddressDefault={setUserAddressDefault}
              userAddressDefault={userAddressDefault}
              lngLat={lngLat}
              setLngLat={setLngLat}
              isShowSavedAddress={isShowSavedAddress}
            />
          </div>
        </>
      )}
    </DeliveryStyle>
  );
}

DeliveryAddress.propTypes = {};
export default DeliveryAddress;
