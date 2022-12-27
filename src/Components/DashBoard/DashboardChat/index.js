/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import ChatBoxContent from './ChatBoxContent';
import ChatMessing from './ChatMessing';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { messageInfoToast } from '../../../utils';
const baseURL = process.env.REACT_APP_SERVER_API;
function DashboardChat(props) {
    const [chatStarted, setChatStarted] = useState(true);
    const [chatUser, setChatUser] = useState(null);
    const [message, setMessage] = useState('');
    const [conversationsArray, setConversationsArray] = useState(null);
    const [media, setMedia] = useState([]);
    const [search, setSearch] = useState('');
    const [searchUser, setSearchUser] = useState([]);

    const handleSubmitMessage = () => {

    };

    const handleProcessingSearchers = async (e) => {
        e.preventDefault();

        if (!search) return setSearchUser([]);;
        try {
            const res = await axios.get(`${baseURL}/users/search?username=${search}`);
            setSearchUser(res.data.users);
        } catch (err) {
            console.log(err);
            messageInfoToast(false, 'get user failed!')
        }
    }

    return (
        <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
            <div className="row">
                <ol className="breadcrumb">
                    <li>
                        <a href="#">
                            <em className="fa fa-home" />
                        </a>
                    </li>
                    <li className="active">Chat</li>
                </ol>
            </div>
            {/*/.row*/}
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Chat</h1>
                </div>
            </div>
            {/*/.row*/}
            <div className="row">
                <div className="col-lg-4">
                    <div className="panel panel-default articles">
                        <div className="panel-heading">
                            Danh Sách Chat
                            <ul className="pull-right panel-settings panel-button-tab-right">
                                <li className="dropdown">
                                    <a
                                        className="pull-right dropdown-toggle"
                                        data-toggle="dropdown"
                                        href="#"
                                    >
                                        <i className="far fa-clipboard-user"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li>
                                            <ul className="dropdown-settings">
                                                <li>
                                                    <a>
                                                        <i className="fad fa-user-tag"></i>{' '}
                                                        Xem Thông Tin (Chỉ 1
                                                        người)
                                                    </a>
                                                </li>
                                                <li className="divider" />
                                                <li>
                                                    <a href="#">
                                                        <i className="fad fa-user-minus"></i>{' '}
                                                        Xoá Ra Khỏi Danh Sách
                                                    </a>
                                                </li>
                                                <li className="divider" />
                                                <li>
                                                    <a href="#">
                                                        <i className="fad fa-user-lock"></i>{' '}
                                                        Chặn Người Này
                                                    </a>
                                                </li>
                                                <li className="divider" />
                                                <li>
                                                    <a href="#">
                                                        <i className="fad fa-user-cog"></i>{' '}
                                                        Sửa Thông Tin (Chỉ 1
                                                        Người)
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <span className="pull-right clickable panel-toggle panel-button-tab-left">
                                <i className="fad fa-user-plus"></i>
                            </span>
                        </div>
                        <form onClick={handleProcessingSearchers}>
                            <div className="form-group">
                                <Input size="large" placeholder="large size" prefix={<UserOutlined />} onChange={(e) => setSearch(e.target.value)} />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                        </form>
                        <div className="panel-body articles-container container-chat-box">
                            <ChatList />
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="panel panel-default articles">
                        <div className="panel-heading">
                            ChatBox
                            <ul className="pull-right panel-settings panel-button-tab-right">
                                <li className="dropdown">
                                    <a
                                        className="pull-right dropdown-toggle"
                                        data-toggle="dropdown"
                                        href="#"
                                    >
                                        <i className="far fa-clipboard-user"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li>
                                            <ul className="dropdown-settings">
                                                <li>
                                                    <a>
                                                        <i className="fad fa-user-tag"></i>{' '}
                                                        Xem Thông Tin (Chỉ 1
                                                        người)
                                                    </a>
                                                </li>
                                                <li className="divider" />
                                                <li>
                                                    <a href="#">
                                                        <i className="fad fa-user-minus"></i>{' '}
                                                        Xoá Ra Khỏi Danh Sách
                                                    </a>
                                                </li>
                                                <li className="divider" />
                                                <li>
                                                    <a href="#">
                                                        <i className="fad fa-user-lock"></i>{' '}
                                                        Chặn Người Này
                                                    </a>
                                                </li>
                                                <li className="divider" />
                                                <li>
                                                    <a href="#">
                                                        <i className="fad fa-user-cog"></i>{' '}
                                                        Sửa Thông Tin (Chỉ 1
                                                        Người)
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <span className="pull-right clickable panel-toggle panel-button-tab-left">
                                <i className="fad fa-user-plus"></i>
                            </span>
                        </div>
                        <div className="panel-body articles-container">
                            {chatStarted && (
                                <>
                                    <ChatBox
                                        chatStarted={chatStarted}
                                        chatUser={chatUser}
                                    />
                                    <ChatBoxContent
                                        chatUser={chatUser}
                                        conversationsArray={conversationsArray}
                                    />
                                    <ChatMessing
                                        handleSubmitMessage={
                                            handleSubmitMessage
                                        }
                                        message={message}
                                        setMessage={setMessage}
                                        setMedia={setMedia}
                                        media={media}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

DashboardChat.propTypes = {};

export default DashboardChat;
