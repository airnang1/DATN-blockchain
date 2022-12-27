import React, { useEffect, useRef, useState } from "react";
import { Checkbox, Form, Modal, Button, Steps } from "antd";
import SelectedValue from "./SelecteValue";
import InfoAddress from "./InfoAddress";
import SaveAddress from "./SaveAddress";
import InputInfo from "./InputInfo";

const { Step } = Steps;

function ModalAddress(props) {
  const {
    visible,
    handleOk,
    confirmLoading,
    handleCancel,
    address_api,
    onHandleValueImportAddress,
    handleImportImput,
    objAddress,
    inputName,
    modalText,
    inputNumber,
    handleChangeInputName,
    handleChangeInputNumber,
    onChangeCheckbox,
    address_user_api,
    userAddress,
    setUserAddressDefault,
    userAddressDefault,
    lngLat,
    setLngLat,
    isShowSavedAddress,
  } = props;
  const [current, setCurrent] = useState(0);
  const formRef = useRef();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    if (
      inputName &&
      inputNumber &&
      objAddress.tinh &&
      objAddress.quan &&
      objAddress.xa &&
      objAddress.mota
    ) {
      formRef.current?.setFieldsValue({
        inputName,
        inputNumber,
        ProvinceName: objAddress.tinh.ProvinceName,
        DistrictName: objAddress.quan.DistrictName,
        WardName: objAddress.xa.WardName,
        mota: objAddress.mota,
      });
    }
  }, [inputName, inputNumber, objAddress]);

  const handleCancelModal = () => {
    handleCancel();
    formRef.current?.resetFields();
    setCurrent(0);
  };

  const steps = [
    {
      title: "Địa điểm",
      content: objAddress && (
        <SelectedValue
          objAddress={objAddress}
          address_api={address_api}
          onHandleValueImportAddress={onHandleValueImportAddress}
          widthInput="220px"
        />
      ),
    },
    {
      title: "Mô tả",
      content: <InfoAddress lngLat={lngLat} setLngLat={setLngLat} />,
    },
  ];

  if (isShowSavedAddress) {
    steps.push({
      title: "Đã lưu",
      content: (
        <SaveAddress
          userAddress={userAddress}
          setUserAddressDefault={setUserAddressDefault}
          userAddressDefault={userAddressDefault}
        />
      ),
    });
  }

  const items = steps.map((item, idx) => ({
    index: idx,
    title: item.title,
    description: "ok",
    status: "process",
  }));

  const handleOkSubmit = () => {
    handleOk();
    formRef.current?.resetFields();
    setCurrent(0);
  };

  return (
    <div>
      <Form
        ref={formRef}
        name="control-ref"
        layout="vertical"
        onFinish={handleOkSubmit}
      >
        <Modal
          title={modalText}
          visible={visible}
          confirmLoading={confirmLoading}
          onCancel={handleCancelModal}
          footer={null}
          className="address-modal"
        >
          <div className="info-user">
            <i className="far fa-user"></i>
            <p className="">Thông Tin Khách Hàng</p>
          </div>
          <InputInfo
            handleImportImput={handleImportImput}
            inputName={inputName}
            inputNumber={inputNumber}
            handleChangeInputName={handleChangeInputName}
            handleChangeInputNumber={handleChangeInputNumber}
          />
          <div className="info-address">
            <i className="far fa-map-marker-alt"></i>
            <p className="">
              Vui lòng điền thông tin bên dưới hoặc chọn địa chỉ đã lưu
            </p>
          </div>
          <Steps current={current} items={items} size="small">
            {steps.map((step, index) => (
              <Step title={step.title} key={index} />
            ))}
          </Steps>
          {steps[current].content}
          {address_user_api && !address_user_api._id && (
            <Checkbox onChange={onChangeCheckbox} style={{ marginTop: 20 }}>
              Đặt làm địa chỉ mặc định
            </Checkbox>
          )}
          <Form.Item className="action-form">
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" htmlType="submit" onClick={handleOkSubmit}>
                Submit
              </Button>
            )}
          </Form.Item>
        </Modal>
      </Form>
    </div>
  );
}

ModalAddress.propTypes = {};

export default ModalAddress;
