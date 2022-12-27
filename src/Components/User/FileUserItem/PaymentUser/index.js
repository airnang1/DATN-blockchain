import React, { useState } from 'react';
import styled from 'styled-components';
import {
    DatePicker,
    Form,
    Button,
    Row,
    Col,
    Empty,
    Divider,
    Input,
    Tag,
} from 'antd';
import { IssuesCloseOutlined, PlusOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
const { RangePicker } = DatePicker;
const FileUserCredit = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
const FileUserPayment = styled.div`
    p.file-user-credit-title {
        font-size: 20px;
    }
    span.ant-divider-inner-text {
        font-size: 13px;
        color: #cbcbcb;
    }
    .ant-modal-title {
        font-size: 22px;
    }
`;
const FileUserAccountPayment = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

function onChange(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
    console.log('onOk: ', value);
}
function PaymentUser(props) {
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);

    // const onChange = (e) => {
    //     console.log('radio checked', e.target.value);
    //     setModal(e.target.value);
    // };
    const setModal1Visible = (modalVisible) => {
        setModal1(modalVisible);
    };
    const setModal2Visible = (modalVisible) => {
        setModal2(modalVisible);
    };

    return (
        <FileUserPayment>
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{ marginBottom: '20px' }}
            >
                <Col
                    className="gutter-row"
                    span={24}
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        minHeight: '250px',
                        flexDirection: 'column',
                        height: 'auto',
                    }}
                >
                    <FileUserCredit>
                        <p className="file-user-credit-title">
                            Thẻ Tín Dụng / Thẻ Ghi Nợ
                        </p>
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                            onClick={() => setModal1Visible(true)}
                        >
                            Thêm Thẻ Mới
                        </Button>
                        <Modal
                            title="Thêm Thẻ"
                            centered
                            style={{ top: 20 }}
                            visible={modal1}
                            onOk={() => setModal1Visible(false)}
                            onCancel={() => setModal1Visible(false)}
                        >
                            <Tag
                                icon={
                                    <IssuesCloseOutlined
                                        style={{ fontSize: '22px' }}
                                    />
                                }
                                color="success"
                                style={{
                                    display: 'flex',
                                    padding: '10px',
                                    marginBottom: '10px',
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: '16px',
                                    }}
                                >
                                    Thông tin thẻ của bạn được bảo mật.
                                </p>
                                <p
                                    style={{
                                        color: '#333',
                                        marginBottom: 0,
                                    }}
                                >
                                    Chúng tôi hợp tác với CyberSource để đảm bảo
                                    thông tin thẻ của bạn được giữ an toàn
                                    <br /> và bảo mật. Shopee sẽ không có quyền
                                    truy cập vào thông tin thẻ của bạn.
                                </p>
                            </Tag>
                            <Form
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 18,
                                }}
                                layout="horizontal"
                                size="large"
                                style={{ padding: '10px', height: '500px' }}
                                // onValuesChange={onFormLayoutChange}
                            >
                                <p
                                    className="user-payment-desc"
                                    style={{
                                        fontSize: '18px',
                                        fontƯeight: '600',
                                        color: '#aeaeae',
                                    }}
                                >
                                    Chi tiết thẻ
                                </p>
                                <Form.Item
                                    style={{
                                        marginBottom: '16px',
                                        fontSize: '16px',
                                    }}
                                    label="Họ và tên thẻ"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: '16px' }}
                                    label="Số thẻ"
                                >
                                    <Input />
                                </Form.Item>
                                <div className="date-number">
                                    <Form.Item
                                        label="Ngày hết hạn"
                                        style={{ marginBottom: '16px' }}
                                    >
                                        <RangePicker
                                            format="YYYY-MM-DD"
                                            onChange={onChange}
                                            onOk={onOk}
                                            // placeholder="Ngày hết hạn"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Mã CVV">
                                        <Input placeholder="Mã CVV" />
                                    </Form.Item>
                                </div>
                                <p
                                    className="user-payment-desc"
                                    style={{
                                        fontSize: '18px',
                                        fontƯeight: '600',
                                        color: '#aeaeae',
                                    }}
                                >
                                    Địa chỉ thanh toán
                                </p>
                                <Form.Item
                                    style={{ marginBottom: '16px' }}
                                    label="Địa chỉ"
                                >
                                    <Input value="43-Bàu Tràm 1" />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: '16px' }}
                                    label="Mã bưu điện"
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </FileUserCredit>
                    <Divider
                        orientation="left"
                        style={{ transform: 'translateY(-30px)' }}
                    >
                        Credit
                    </Divider>
                    <Empty style={{ width: '100%' }} />
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                    className="gutter-row"
                    span={24}
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        minHeight: '250px',
                        flexDirection: 'column',
                        height: 'auto',
                    }}
                >
                    <FileUserAccountPayment>
                        <p className="file-user-credit-title">
                            Tài Khoản Ngân Hàng Của Tôi
                        </p>
                        <Button
                            icon={<PlusOutlined />}
                            type="primary"
                            size="large"
                            onClick={() => setModal2Visible(true)}
                        >
                            Thêm Tài Khoản Ngân Hàng
                        </Button>
                        <Modal
                            title="Thêm Số Điện Thoại"
                            centered
                            style={{ top: 20 }}
                            visible={modal2}
                            onOk={() => setModal2Visible(false)}
                            onCancel={() => setModal2Visible(false)}
                        >
                            <Form
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 18,
                                }}
                                layout="horizontal"
                                size="large"
                                // onValuesChange={onFormLayoutChange}
                            >
                                <div
                                    className="phone-number"
                                    style={{ display: 'flex' }}
                                >
                                    <Form.Item
                                        label="Số điện thoại"
                                        style={{ margin: 0, fontSize: '16px' }}
                                    >
                                        <Input
                                            style={{
                                                marginRight: '60px',
                                            }}
                                        />
                                    </Form.Item>
                                    <Button>Gửi Mã xác minh</Button>
                                </div>

                                <Form.Item
                                    label="Mã xác minh"
                                    style={{
                                        transform: 'translateX(-34px)',
                                    }}
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </FileUserAccountPayment>
                    <Divider
                        orientation="left"
                        style={{ transform: 'translateY(-30px)' }}
                    >
                        Payment
                    </Divider>
                    <Empty style={{ width: '100%' }} />
                </Col>
            </Row>
        </FileUserPayment>
    );
}

PaymentUser.propTypes = {};

export default PaymentUser;
