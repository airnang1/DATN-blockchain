import ReactDOM from 'react-dom';
import React from 'react';
import { Modal } from 'antd';

function UserLeaveConfirmation(message, callback, confirmOpen, setConfirmOpen) {
    const container = document.createElement('div');

    container.setAttribute('custom-confirm-view', '');

    const handleConfirm = (callbackState) => {
        ReactDOM.unmountComponentAtNode(container);
        callback(callbackState);
        setConfirmOpen(false);
    };

    const handleCancel = (callbackState) => {
        ReactDOM.unmountComponentAtNode(container);
        callback();
        setConfirmOpen(false);
    };

    document.body.appendChild(container);

    const { header, content } = JSON.parse(message);

    ReactDOM.render(
        <Modal
            title="Bạn Chưa Lưu Lại"
            visible={confirmOpen}
            header={header}
            onOk={handleConfirm}
            onCancel={handleCancel}
        >
            <p>{content}</p>
        </Modal>,
        container,
    );
}

export default UserLeaveConfirmation;
