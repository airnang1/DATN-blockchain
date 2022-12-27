/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { loadingSelector } from "../../../Store/Reducer/loadingReducer";
import { useSelector } from "react-redux";

Signup.propTypes = {
  onSubmit: PropTypes.func,
};
Signup.defaultProps = {
  onSubmit: null,
};

function Signup(props) {
  const loading = useSelector(loadingSelector);
  const onFinishFailed = (error) => {
    console.log(error);
  };
  
  return (
    <div className="form__container sign-up-container form">
      <Form
        layout="vertical"
        onFinish={props.onSubmit}
        onFinishFailed={onFinishFailed}
      >
        <h1 className="form__signin-title">Create Account</h1>
        <div className="form__social-container"></div>
        <span>or use your email for registration</span>
        <Form.Item
          label="Nhập tên của bạn"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên của bạn!" },
            {
              min: 5,
              message: "Tên bạn phải ít nhất 5 kí tự",
            },
          ]}
        >
          <Input placeholder="Nhập Tên của bạn" />
        </Form.Item>
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
          <Input placeholder="Nhập email của bạn" />
        </Form.Item>
        <Form.Item
          label="Nhập mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
            { min: 9, message: "Độ dài mật khẩu phải trên 8 kí tự" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item
          label="Xác nhận lại mật khẩu"
          name="confirm_password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Xác nhận mật khẩu của bạn"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

Signup.propTypes = {};

export default Signup;
