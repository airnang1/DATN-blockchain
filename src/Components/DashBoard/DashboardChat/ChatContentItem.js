import { Avatar } from 'antd';
import React, { useEffect, useRef } from 'react';
import { humanImg } from '../../../assets/fake-data/human';

function ChatContentItem(props) {
    const { con, chatUser } = props;
    const messageRef = useRef();

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [con.message]);

    return (
        <div className="row" ref={messageRef}>
            <li className="left clearfix-chat-content-item">
                <div className="col-lg-">
                    <span className="chat-img pull-left" style={{ marginLeft: 20 }}>
                    <Avatar src={chatUser.photoURL || humanImg} alt={chatUser.displayName} size={30} />
                    </span>
                </div>
                <div
                    className="col-lg-14"
                    style={{ justifyContent: 'start', display: 'flex' }}
                >
                    <p>{con.message}</p>
                    <span className="date-message">{con.created}</span>
                </div>
            </li>
        </div>
    );
}

ChatContentItem.propTypes = {};

export default ChatContentItem;
