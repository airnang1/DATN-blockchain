import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Button, Radio } from "antd";
import DividerComponent from "../Divider";
import AddressUserCheck from "./AddressUserCheck";
import { useSelector } from "react-redux";
import { authSelector } from "../../../../Store/Reducer/authReducer";
import BasicMap from "../../../BasicMap";
import { Link } from "react-router-dom";

function ModalAdress(props) {
  const {
    visible,
    loading,
    handleCancel,
    handleOk,
    onChangeRadio,
    isSetAddress,
  } = props;
  const auth = useSelector(authSelector);
  const [lngLat, setLngLat] = useState({ long: 0, lat: 0 });
  return (
    <Modal
      visible={visible}
      title="Địa Chỉ Giao Hàng"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="login-ship">
        <p className="login-ship-title">
          Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng phí
          đóng gói, vận chuyển một cách chính xác nhất.
        </p>
        {auth.user && auth.tokenAuth ? (
          <BasicMap setLngLat={setLngLat} lngLat={lngLat} />
        ) : (
          <Link type="button" className="button-redirect" to="/buyer/signin">
            Đăng nhập để chọn địa chỉ giao hàng
          </Link>
        )}
      </div>
      <DividerComponent title="hoặc" transformY="0" icon="" position="center" />
      <div className="address-ship">
        <Radio value={!isSetAddress} onChange={onChangeRadio}>
          Chọn khu vực giao hàng
        </Radio>
        <AddressUserCheck isSetAddress={isSetAddress} />
      </div>
    </Modal>
  );
}

ModalAdress.propTypes = {};

export default ModalAdress;
