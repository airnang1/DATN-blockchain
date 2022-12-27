/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

function MessageInfo(props) {
    return (
        <li className="dropdown">
            <a className="dropdown-toggle count-info" data-toggle="dropdown">
                <em className="fa fa-envelope" />
                <span className="label label-danger">15</span>
            </a>
            <ul className="dropdown-menu dropdown-messages">
                <li>
                    <div className="dropdown-messages-box">
                        <a href="profile.html" className="pull-left">
                            <img
                                alt="image"
                                className="img-circle"
                                src="https://thuthuatnhanh.com/wp-content/uploads/2019/05/gai-xinh-toc-ngan-facebook.jpg"
                            />
                        </a>
                        <div className="message-body">
                            <small className="pull-right">3 mins ago</small>
                            <a href="#">
                                <strong>John Doe</strong> commented on{' '}
                                <strong>your photo</strong>.
                            </a>
                            <br />
                            <small className="text-muted">
                                1:24 pm - 25/03/2015
                            </small>
                        </div>
                    </div>
                </li>
                <li className="divider" />
                <li>
                    <div className="dropdown-messages-box">
                        <a href="profile.html" className="pull-left">
                            <img
                                alt="image"
                                className="img-circle"
                                src="https://thuthuatnhanh.com/wp-content/uploads/2019/05/gai-xinh-toc-ngan-facebook.jpg"
                            />
                        </a>
                        <div className="message-body">
                            <small className="pull-right">1 hour ago</small>
                            <a href="#">
                                New message from <strong>Jane Doe</strong>.
                            </a>
                            <br />
                            <small className="text-muted">
                                12:27 pm - 25/03/2015
                            </small>
                        </div>
                    </div>
                </li>
                <li className="divider" />
                <li>
                    <div className="all-button">
                        <a>
                            <em className="fa fa-inbox" />{' '}
                            <strong>All Messages</strong>
                        </a>
                    </div>
                </li>
            </ul>
        </li>
    );
}

MessageInfo.propTypes = {};

export default MessageInfo;
