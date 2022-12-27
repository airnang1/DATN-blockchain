import React from 'react';
 
import FormChat from './FormChat';
import ChatItemContent from './ChatItemContent';
import ChatItemContentMain from './ChatItemContentMain';

function Chat(props) {
    const {
        isShowForm,
        onClose,
        data,
        handleChangeInputMessage,
        handleSubmitMessage,
        conversationsArray,
        uid,
        message,
    } = props;
    return (
        <div
            className={isShowForm ? `chat-box scale` : `chat-box`}
            style={{ display: isShowForm ? 'block' : 'none' }}
        >
            <div className="chat-box-header">
                Chat với người bán hàng
                <span className="chat-box-toggle" onClick={onClose}>
                    <i className="material-icons">close</i>
                </span>
            </div>
            <div className="chat-box-body">
                <div className="chat-box-overlay"></div>
                <div className="chat-logs">
                    {conversationsArray
                        ? conversationsArray.map((con, index) => {
                              if (con.user_uid_1 === uid) {
                                  return (
                                      <ChatItemContentMain
                                          data={data}
                                          key={index}
                                          con={con}
                                      />
                                  );
                              } else {
                                  return (
                                      <ChatItemContent key={index} con={con} />
                                  );
                              }
                          })
                        : ''}
                </div>
            </div>
            <FormChat
                handleChangeInputMessage={handleChangeInputMessage}
                handleSubmitMessage={handleSubmitMessage}
                message={message}
            />
        </div>
    );
}

Chat.propTypes = {};

export default Chat;
