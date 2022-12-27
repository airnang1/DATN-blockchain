import { Avatar } from 'antd';
import React, { useEffect, useRef } from 'react';

function ChatItemContent(props) {
    const { con } = props;
    const messageRef = useRef();

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [con.message]);

    return (
        <div className="chat-msg" ref={messageRef}>
            <div className="chat-image-user">
                <Avatar src={'https://pdp.edu.vn/wp-content/uploads/2021/01/hinh-anh-girl-xinh-toc-ngan-de-thuong.jpg'} alt="" size={30} />
            </div>
            <div className="chat-content-text">
                <p>{con.message}</p>
            </div>
        </div>
    );
}

ChatItemContent.propTypes = {};

export default ChatItemContent;
