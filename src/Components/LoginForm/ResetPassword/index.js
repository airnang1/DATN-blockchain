import React from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPasswordCall } from "../../../Store/Reducer/authReducer";
import { setLoadingAction } from "../../../Store/Reducer/loadingReducer";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
ForgotPassword.propTypes = {
  onSubmit: PropTypes.func,
};
ForgotPassword.defaultProps = {
  onSubmit: null,
};

function ForgotPassword(props) {
  const { token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (val) => {
    dispatch(setLoadingAction(true));
    dispatch(resetPasswordCall({ val, token, history }));
    setTimeout(() => {
      dispatch(setLoadingAction(false));
    }, 500);
  };

  const onFinishFailed = (error) => {
    console.log(error);
  };

  return (
    <div className="form">
      <div className="form__forgot-password" style={{ minHeight: "400px" }}>
        <div className="form__container">
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <h1 className="form__title">Đặt lại mật khẩu</h1>
            <div className="form__social-container"></div>
            <span>Nhập mật khẩu mới của bạn vào đây!</span>
            <Form.Item
              label="Nhập mật khẩu mới"
              name="password_new"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu" width={200}/>
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu mới"
              name="confirm_password"
              dependencies={["password_new"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password_new") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Xác nhận mật khẩu mới của bạn"
                width={200}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu lại
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {};

export default ForgotPassword;
