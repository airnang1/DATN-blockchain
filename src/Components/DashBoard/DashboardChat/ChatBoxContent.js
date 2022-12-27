import React from 'react';
import ChatContentItem from './ChatContentItem';
import ChatContentItemMain from './ChatContentItemMain';

function ChatBoxContent(props) {
    const { conversationsArray, chatUser, uid } = props;

    return (
        <div className="row chat-content">
            {conversationsArray && conversationsArray.length !== 0 ? (
                conversationsArray.map((con, index) => {
                    if (con.user_uid_1 === uid) {
                        return <ChatContentItemMain con={con} key={index} />;
                    } else {
                        return (
                            <ChatContentItem
                                con={con}
                                chatUser={chatUser}
                                key={index}
                            />
                        );
                    }
                })
            ) : (
                <span className="empty-chat-content">
                    Bạn chưa có tin nhắn nào cả, nhắn ngay 😜
                </span>
            )}
        </div>
    );
}

ChatBoxContent.propTypes = {};

export default ChatBoxContent;
