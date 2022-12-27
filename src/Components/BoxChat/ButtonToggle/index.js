import React from 'react';

function ButtonToggle(props) {
    const { isShowForm, handleShowFormMess } = props;
    return (
        <div
            id="chat-circle"
            className={isShowForm ? `btn btn-raised scale` : `btn btn-raised`}
            style={{ display: isShowForm ? 'none' : 'block' }}
            onClick={handleShowFormMess}
        >
            <div id="chat-overlay" />
            <i className="fab fa-facebook-messenger"></i>
        </div>
    );
}

ButtonToggle.propTypes = {};

export default ButtonToggle;
