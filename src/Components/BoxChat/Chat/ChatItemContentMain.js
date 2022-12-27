import { Avatar } from "antd";
import React, { useEffect, useRef } from "react";
import { humanImg } from "../../../assets/fake-data/human";
function ChatItemContentMain(props) {
  const { data, con } = props;
  const messageRef = useRef();

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [con.message]);

  return (
    <div
      className="chat-msg left"
      style={{ justifyContent: "end" }}
      ref={messageRef}
    >
      <div className="chat-content-text">
        <p>{con.message}</p>
      </div>
      <div className="chat-image-user">
        <Avatar src={data.user.photoURL || humanImg} alt="" size={30} />
      </div>
    </div>
  );
}

ChatItemContentMain.propTypes = {};

export default ChatItemContentMain;
