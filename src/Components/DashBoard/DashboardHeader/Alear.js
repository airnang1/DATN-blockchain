/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function Alear(props) {
    return (
        <li className="dropdown">
            <a className="dropdown-toggle count-info" data-toggle="dropdown">
                <em className="fa fa-bell" />
                <span className="label label-info">5</span>
            </a>
            <ul className="dropdown-menu dropdown-alerts">
                <li>
                    <div>
                        <em className="fa fa-envelope" /> 1 New Message
                        <span className="pull-right text-muted small">
                            3 mins ago
                        </span>
                    </div>
                </li>
                <li className="divider" />
                <li>
                    <div>
                        <em className="fa fa-heart" /> 12 New Likes
                        <span className="pull-right text-muted small">
                            4 mins ago
                        </span>
                    </div>
                </li>
                <li className="divider" />
                <li>
                    <div>
                        <em className="fa fa-user" /> 5 New Followers
                        <span className="pull-right text-muted small">
                            4 mins ago
                        </span>
                    </div>
                </li>
            </ul>
        </li>
    );
}

Alear.propTypes = {};

export default Alear;
