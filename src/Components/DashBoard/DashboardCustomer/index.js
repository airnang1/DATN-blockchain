/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import TableCustomer from './TableCustomer';
import NavigationCustomer from './NavigationCustomer';
import TopUser from './TopUser';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteUser,
    getUser,
    getUsersInStore,
    usersSelector,
} from '../../../Store/Reducer/usersReducer';
import { getUserAddress } from '../../../Store/Reducer/userAddressReducer';
import { setLoadingAction } from '../../../Store/Reducer/loadingReducer';

function DashboardCustomer(props) {
    const dispatch = useDispatch();
    const usersDB = useSelector(usersSelector);
    const [visible, setVisible] = useState(false);

    const { users, user } = usersDB;

    useEffect(() => {
        dispatch(getUsersInStore());
    }, [dispatch]);

    const handleSetVisible = () => {
        setVisible(false);
    };

    const handleShowNavigation = (userId) => {
        dispatch(getUser({ userId }));
        dispatch(getUserAddress({ userId }));
        setVisible(true);
    };

    const confirm = (item) => {
        dispatch(setLoadingAction(true));
        dispatch(deleteUser({ user: item }));
        dispatch(setLoadingAction(false));
    };

    return (
        <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
            <div className="row">
                <ol className="breadcrumb">
                    <li>
                        <a href="#">
                            <em className="fa fa-home" />
                        </a>
                    </li>
                    <li className="active">Customer</li>
                </ol>
            </div>
            {/*/.row*/}
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Customer</h1>
                </div>
            </div>
            {/*/.row*/}
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default articles">
                        <div className="panel-heading">
                            Danh Sách Người Sử Dụng
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
                                                    <a
                                                        onClick={
                                                            handleShowNavigation
                                                        }
                                                    >
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
                        <div className="panel-body articles-container table-customer">
                            <TableCustomer
                                users={users}
                                confirm={confirm}
                                handleShowNavigation={handleShowNavigation}
                            />
                            <NavigationCustomer
                                visible={visible}
                                handleSetVisible={handleSetVisible}
                                user={user}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <TopUser />
            </div>
        </div>
    );
}

DashboardCustomer.propTypes = {};

export default DashboardCustomer;
