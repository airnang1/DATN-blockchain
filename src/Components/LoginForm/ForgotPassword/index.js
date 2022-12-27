/* eslint-disable no-useless-escape */
import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  forgotPasswordCall,
} from "../../../Store/Reducer/authReducer";
import { Button, Form, Input, message } from "antd";

ForgotPassword.propTypes = {
  onSubmit: PropTypes.func,
};
ForgotPassword.defaultProps = {
  onSubmit: null,
};

function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (val) => {
    dispatch(forgotPasswordCall({email: val.email, history}));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo);
  };

  return (
    <div className="form">
      <div className="form__forgot-password">
        <div className="form__container">
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <h1 className="form__title">Xác nhận tài khoản</h1>
            <div className="form__social-container"></div>
            <span>vui lòng nhập email của bạn vào để tìm tài khoản</span>
            <Form.Item
              label="Nhập Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập Email của bạn!" },
                {
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Email không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div className="btn-actions">
              <Link to="/buyer/signin">
                <Button type="button" className="btn-outline-light">
                  Cancel
                </Button>
              </Link>
              <Form.Item className="btn-action">
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {};

export default ForgotPassword;
