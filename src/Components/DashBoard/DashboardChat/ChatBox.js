import React from 'react';
function ChatBox(props) {
    // eslint-disable-next-line no-unused-vars
    const { chatStarted, chatUser } = props;
    return (
        <div className="row chat-box-active">
            <div className="col-lg-8">
                <div className="col-lg-2" style={{ marginTop: 8 }}>
                    <span
                        className="chat-img pull-left"
                        style={{ marginBottom: 9 }}
                    >
                        {/* {renderPhotoAccout(
                            chatUser.photoURL,
                            50,
                            chatUser.displayName,
                        )} */}
                    </span>
                </div>
                <div className="col-lg-9">
                    <div className="chat-body clearfix">
                        <div className="clearfix-header">
                            <strong className="primary-font">
                                {/* {chatStarted ? chatUser.displayName : ''} */}
                            </strong>
                            <br />
                            {/* {chatUser.isOnline ? (
                                <div className="active-acount">
                                    <div className="active-acount-check"></div>
                                    <small className="text-muted">
                                        Đang hoạt động
                                    </small>
                                </div>
                            ) : (
                                <small>
                                    {moment().format('YYYY-MM-DD HH:mm:ss')}
                                </small>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-1">
                <i className="fas fa-phone"></i>
            </div>
            <div className="col-lg-1">
                <i className="fad fa-video"></i>
            </div>
            <div className="col-lg-1">
                <i className="fad fa-filter"></i>
            </div>
        </div>
    );
}

ChatBox.propTypes = {};

export default ChatBox;
