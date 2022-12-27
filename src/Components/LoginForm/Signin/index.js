/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loadingSelector } from "../../../Store/Reducer/loadingReducer";
import { resetIsForgetPassword } from "../../../Store/Reducer/authReducer";

Signin.propTypes = {
  onSubmit: PropTypes.func,
};
Signin.defaultProps = {
  onSubmit: null,
};

function Signin({ handleFbLogin, handleGgLogin, onSubmit }) {
  const loading = useSelector(loadingSelector);
  const dispatch = useDispatch();

  const onFinishFailed = (error) => {
    console.log(error);
  };

  return (
    <div className="form__container sign-in-container">
      <Form
        layout="vertical"
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
      >
        <h1 className="form__title">Đăng Nhập</h1>
        <div className="form__social-container">
          <FacebookLogin
            appId="975856353186645"
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFbLogin}
          />
          <GoogleLogin
            clientId="355174219711-cisdj781jtsa2flfvgu86eii8b3knomq.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleGgLogin}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <span>hoặc tài khoản email của bạn</span>
        <Form.Item
          label="Nhập Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập Email của bạn!" },
            {
              // eslint-disable-next-line no-useless-escape
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Email không hợp lệ!",
            },
          ]}
        >
          <Input placeholder="Nhập email..." />
        </Form.Item>
        <Form.Item
          label="Nhập mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Link to="/forgot-password" onClick={() => dispatch(resetIsForgetPassword(true))}>
            <p>Bạn quên mật khẩu</p>
          </Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

Signin.propTypes = {};

export default Signin;
