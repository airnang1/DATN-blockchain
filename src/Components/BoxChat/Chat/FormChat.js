import React from 'react';

function FormChat(props) {
    const { handleChangeInputMessage, handleSubmitMessage, message } = props;
    return (
        <div className="chat-input">
            <input
                type="text"
                id="chat-input"
                placeholder="Send a message..."
                value={message}
                onChange={handleChangeInputMessage}
            />
            <button className="chat-submit" onClick={handleSubmitMessage}>
                <i className="fad fa-paper-plane"></i>
            </button>
        </div>
    );
}

FormChat.propTypes = {};

export default FormChat;
