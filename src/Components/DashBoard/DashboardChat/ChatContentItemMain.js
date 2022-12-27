import React, { useEffect, useRef } from 'react';

function ChatContentItemMain(props) {
    const { con } = props;
    const messageRef = useRef();

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [con.message]);

    return (
        <div className="row" ref={messageRef}>
            <li className="left clearfix-chat-content-item">
                <div className="col-lg-3"></div>
                <div className="col-lg-9 comment-main">
                    <span className="date-message">{con.created}</span>
                    <p>{con.message}</p>
                </div>
            </li>
        </div>
    );
}

ChatContentItemMain.propTypes = {};

export default ChatContentItemMain;
