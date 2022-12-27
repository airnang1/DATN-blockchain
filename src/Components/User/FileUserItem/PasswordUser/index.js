/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
 
import styled from 'styled-components';
import { toast } from 'react-toastify';

const FileUserContent = styled.div`
    span.ant-divider-inner-text {
        font-size: 13px;
        color: #cbcbcb;
    }
    .file-user-title {
        margin-left: 40px;
    }
    .file-user-name {
        font-size: 23px;
        margin: 0;
    }
    .file-user-des {
        font-weight: 300;
        color: #aeaeae;
    }
    .user-name {
        margin: 0;
    }
    .ant-row {
        justify-content: center;
    }
    .ant-row {
        margin: 7px 0;
    }
    button.btn.btn-primary {
        width: 100px;
        font-size: 15px;
    }
`;
const FileUserFormPassWord = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    input {
        width: 400px;
    }
`;
function PasswordUser(props) {
    const initialValues = {
        password_old: '',
        password: '',
        confirm_password: '',
    };

    const onSubmitForm = (val) => {
        if (val.password_old === val.password) {
            toast.error(
                `Bạn đã sử dụng lại mật khẩu của tài khoản cũ của bạn, vui lòng đổi lại 😊`,
            );
        } else {
        }
    };

    return (
        <FileUserContent>
            {/* <>
                <div className="file-user-title">
                    <p className="file-user-name">Đổi Mật Khẩu</p>
                    <p className="file-user-des">
                        Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu
                        cho người khác
                    </p>
                </div>
                <Divider
                    orientation="left"
                    style={{ transform: 'translateY(-10px)' }}
                >
                    Change Password
                </Divider>
                <FileUserFormPassWord>
                    <Row
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                        style={{ width: '100%' }}
                    >
                        <Col className="gutter-row" span={16}>
                            <div className="file-user-content">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmitForm}
                                >
                                    {(formikProps) => {
                                        const {
                                            values,
                                            errors,
                                            touched,
                                            isSubmitting,
                                        } = formikProps;
                                        return (
                                            <Form>
                                                <FastField
                                                    name="password_old"
                                                    component={InputField}
                                                    label="Password Old"
                                                    placeholder="Nhập mật khẩu cũ ..."
                                                />
                                                <FastField
                                                    name="password"
                                                    component={InputField}
                                                    label="Password"
                                                    placeholder="Nhập mật khẩu mới ..."
                                                />
                                                <FastField
                                                    name="confirm_password"
                                                    component={InputField}
                                                    label="Password"
                                                    type="password"
                                                    placeholder="Xác nhận lại mật khẩu mới..."
                                                />
                                                <FormGroup>
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                    >
                                                        Save
                                                    </Button>
                                                </FormGroup>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </div>
                        </Col>
                    </Row>
                </FileUserFormPassWord>
            </> */}
            {/* <div className="file-user-title">
                    <p className="file-user-name">
                        Đổi Mật Khẩu Đã Bị Vô Hiệu Hóa
                    </p>
                    <p className="file-user-des">
                        Hiện tại tài khoản bạn đã đăng nhập bằng {}{' '}
                        nên ko có chức năng đổi mật khẩu
                    </p>
                </div> */}
        </FileUserContent>
    );
}

PasswordUser.propTypes = {};

export default PasswordUser;
