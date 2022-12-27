import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Tag, Tooltip } from 'antd';

function ChangePhoneNumber(props) {
    const { phoneNumber, onChangePhoneNumber } = props;
    const [visible, setVisible] = useState(false);
    const [phone, setPhone] = useState('');

    useEffect(() => {
        phoneNumber ? setPhone(phoneNumber) : setPhone('');
    }, [phoneNumber]);

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    return (
        <Form.Item label="Số Điện thoại" type="number">
            <Button type="link" onClick={showModal}>
                Thêm
            </Button>
            <Modal
                title=" Số Điện Thoại"
                visible={visible}
                onOk={hideModal}
                onCancel={hideModal}
            >
                <Form.Item label="Nhập Số Điện Thoại">
                    <Tooltip
                        title={
                            !phone
                                ? 'Nhập số điện thoại mặc định ở đây'
                                : 'Thay đổi số điện thoại của bạn ở đây'
                        }
                        color="#f50"
                        key={
                            !phone
                                ? 'Nhập số điện thoại mặc định ở đây'
                                : 'Thay đổi số điện thoại của bạn ở đây'
                        }
                    >
                        <Input onChange={onChangePhoneNumber} type="number" />
                    </Tooltip>
                </Form.Item>

                <Form.Item label="Số Hiện Tại">
                    <span className="user__phone-number-content">
                        {phone ? '(84+) ' + phone : 'Bạn chưa có số nào cả!'}
                    </span>
                    {phone && (
                        <Tag color="green" style={{ marginLeft: 10 }}>
                            Gốc
                        </Tag>
                    )}
                </Form.Item>
            </Modal>
        </Form.Item>
    );
}

ChangePhoneNumber.propTypes = {};

export default ChangePhoneNumber;
