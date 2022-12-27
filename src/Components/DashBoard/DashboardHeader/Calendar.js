/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';

import { Calendar } from 'antd';

function Calendars(props) {
    return (
        <li className="dropdown">
            <a className="dropdown-toggle count-info" data-toggle="dropdown">
                <i
                    className="fad fa-calendar-week"
                    style={{ marginLeft: 4 }}
                ></i>
            </a>
            <ul className="dropdown-menu show-calendar">
                <Calendar />
            </ul>
        </li>
    );
}

Calendars.propTypes = {};

export default Calendars;
