import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { CloseSquareOutlined } from '@ant-design/icons';

function Popup(props) {
    const {
        modal,
        setModalVisibleAlear,
        currentProduct,
        setModalVisibleCancel,
    } = props;

    return (
        <Modal
            title={`Bạn chắc chắn muốn ${currentProduct.length} bỏ sản phẩm này ?`}
            centered
            icon={<CloseSquareOutlined />}
            visible={modal}
            onOk={() => setModalVisibleAlear()}
            onCancel={() => setModalVisibleCancel()}
            className="popup-product-cart"
        >
            {currentProduct.map((item, index) => (
                <p key={index}>{item.name}</p>
            ))}
        </Modal>
    );
}

Popup.propTypes = {};

export default Popup;
