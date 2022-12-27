/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function TopUser(props) {
    return (
        <div className="col-lg-6">
            <div className="panel panel-default ">
                <div className="panel-heading">
                    Top User
                    <ul className="pull-right panel-settings panel-button-tab-right">
                        <li className="dropdown">
                            <a
                                className="pull-right dropdown-toggle"
                                data-toggle="dropdown"
                                href="#"
                            >
                                <em className="fa fa-cogs"></em>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                    <ul className="dropdown-settings">
                                        <li>
                                            <a href="#">
                                                <em className="fa fa-cog"></em>{' '}
                                                Settings 1
                                            </a>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <a href="#">
                                                <em className="fa fa-cog"></em>{' '}
                                                Settings 2
                                            </a>
                                        </li>
                                        <li className="divider"></li>
                                        <li>
                                            <a href="#">
                                                <em className="fa fa-cog"></em>{' '}
                                                Settings 3
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <span className="pull-right clickable panel-toggle panel-button-tab-left">
                        <em className="fa fa-toggle-up"></em>
                    </span>
                </div>
                <div className="panel-body">
                    <div className="col-md-12 no-padding">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Top</th>
                                    <th>Hình Ảnh</th>
                                    <th>Tên</th>
                                    <th>Số Điện Thoại</th>
                                    <th>Uy Tín</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {handleRenderUITableItem} */}
                                <tr className="active-row">
                                    <td>1</td>
                                    <td className="user-image">
                                        <img
                                            alt=""
                                            src="https://anhdepblog.com/wp-content/uploads/2020/09/hinh-girl-xinh-de-thuong-10.jpg"
                                            style={{ width: 70 }}
                                        />
                                    </td>
                                    <td>Trần Thị Mai Anh</td>
                                    <td>0332142432</td>
                                    <td>100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

TopUser.propTypes = {};

export default TopUser;
