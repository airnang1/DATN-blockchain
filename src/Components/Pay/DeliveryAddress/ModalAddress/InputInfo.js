import React from "react";
import { Col, Form, Input, Row } from "antd";

function InputInfo(props) {
  const {
    inputName,
    inputNumber,
    handleChangeInputName,
    handleChangeInputNumber,
  } = props;

  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      className="delivery-address__row"
      style={{ marginBottom: 20 }}
    >
      <Col className="gutter-row delivery-address__col--des" span={12}>
        <Form.Item
          name="inputName"
          label="Họ và tên"
          rules={[
            { required: true, message: "Xin hãy nhập họ và tên" },
            { min: 5, message: "Tên của bạn phải ít nhất 5 kí tự" },
            { max: 50, message: "Tên của bạn quá dài" },
            {
              pattern: /^[a-zA-Z\s]*$/,
              message: "Tên của bạn không được có kí tự đặc biệt",
            },
          ]}
        >
          <Input
            placeholder="Nhập Họ Và Tên"
            style={{ height: 40 }}
            value={inputName}
            onChange={handleChangeInputName}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row delivery-address__col--des" span={12}>
        <Form.Item
          name="inputNumber"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Xin hãy nhập số điện thoại" },
            {
              pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
              message: "Số điện thoại của bạn không đúng!",
            },
          ]}
        >
          <Input
            placeholder="Số Điện Thoại"
            style={{ height: 40 }}
            value={inputNumber}
            onChange={handleChangeInputNumber}
          />
        </Form.Item>
      </Col>
    </Row>
  );
}

InputInfo.propTypes = {};

export default InputInfo;
