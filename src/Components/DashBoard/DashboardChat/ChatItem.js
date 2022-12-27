import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import { humanImg } from '../../../assets/fake-data/human';

function ChatItem(props) {
    const { activeClass, user, onClick } = props;

    return (
        <div
            className={activeClass ? 'row active-chat' : 'row'}
            onClick={() => onClick(user)}
        >
            <li className="left clearfix" style={{ display: 'flex' }}>
                <div className="col-lg-2" style={{ marginTop: 8 }}>
                    <span className="chat-img pull-left">
                    <Avatar src={user.photoURL || humanImg} alt={user.displayName} size={50} />
                    </span>
                </div>
                <div className="col-lg-9">
                    <div className="chat-body clearfix">
                        <div className="clearfix-header">
                            <strong className="primary-font">
                                {user.displayName}
                            </strong>{' '}
                            {user.isOnline ? (
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
                            )}
                        </div>
                        <p>
                            {/* {messageArray && messageArray.length
                                ? messageArray[0].message
                                : 'Bạn chưa có tin nhắn'} */}
                        </p>
                    </div>
                </div>
                <div className="col-lg-1">
                    <div className="box-alear"></div>
                </div>
            </li>
        </div>
    );
}

ChatItem.propTypes = {};

export default ChatItem;
