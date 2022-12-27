/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Drawer, Empty, Tooltip } from 'antd';
import { humanImg } from '../../../assets/fake-data/human.js';
import { useSelector } from 'react-redux';
import { userAddressSelector } from '../../../Store/Reducer/userAddressReducer.js';

function NavigationCustomer({ visible, handleSetVisible, user }) {
    const [orderCreated, setOrderCreated] = useState('');
    const userAddressAll = useSelector(userAddressSelector);

    useEffect(() => {
        if (user) {
            const d = new Date(user.createdAt);
            const orderCreated =
                d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString();
            setOrderCreated(orderCreated);
        }
    }, [user]);

    const onClose = () => {
        handleSetVisible(false);
    };

    const { userAddress } = userAddressAll;

    return (
        <>
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <div className="logo-bar">
                    <div className="container-customer">
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col-lg-8 customer-info">
                                <div className="top-info-block d-inline-flex">
                                    {user && user.phoneNumber ? (
                                        <>
                                            <div className="icon-block">
                                                <i className="fal fa-phone"></i>
                                            </div>
                                            <div className="info-block">
                                                <h5 className="font-weight-500">
                                                    {user.phoneNumber}
                                                </h5>
                                                <p>Phone Number</p>
                                            </div>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className="top-info-block d-inline-flex">
                                    <div className="icon-block">
                                        <i className="fal fa-envelope"></i>
                                    </div>
                                    <div className="info-block">
                                        <h5 className="font-weight-500">
                                            {user && user.email}
                                        </h5>
                                        <p>Email Us</p>
                                    </div>
                                </div>
                                <div className="top-info-block d-inline-flex">
                                    <div className="icon-block">
                                        <i className="fal fa-alarm-clock"></i>
                                    </div>
                                    <div className="info-block">
                                        <h5 className="font-weight-500">
                                            Mon-Sat 9:00-12.00{' '}
                                        </h5>
                                        <p>Sunday Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="banner-area py-7">
                    {/* Content */}
                    <div className="container-customer">
                        <div className="row  align-items-center">
                            <div className="col-lg-6">
                                <div className="main-banner">
                                    <h1 className="display-4 mb-4 font-weight-normal">
                                        {user && user.username}
                                    </h1>
                                    <p className="lead mb-4">
                                        Gender: {user && user.gender}
                                    </p>
                                    <p className="lead mb-4">
                                        Date created: {orderCreated}
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="banner-img-block">
                                    <img
                                        src={
                                            (user && user.profilePicture) ||
                                            humanImg
                                        }
                                        alt="banner-img"
                                        className="img-fluid"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                'https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>{' '}
                        {/* / .row */}
                    </div>{' '}
                    {/* / .container */}
                </section>
                <section className="section bg-grey" id="feature">
                    <h4 className="address-user-title">Address User</h4>
                    <div className="container-customer">
                        {userAddress ? (
                            userAddress.items && userAddress.items.length ? (
                                userAddress.items.map((item, index) => (
                                    <div className="col-lg-3 col-sm-6 col-md-6 address-item" key={index}>
                                        <div className="text-center feature-block">
                                            <Tooltip
                                                placement="top"
                                                title={
                                                    item.address.mota +
                                                    ' ~ ' +
                                                    item.address.quan.DistrictName +
                                                    ' ~ ' +
                                                    item.address.tinh.ProvinceName +
                                                    ' ~ ' +
                                                    item.address.xa.WardName
                                                }
                                            >
                                                <div className="img-icon-block mb-4">
                                                    <i className="ti-thumb-up" />
                                                </div>
                                                <h4 className="mb-2">
                                                    {item.username}
                                                </h4>
                                                <h6 className="mb-2">
                                                    {item.phoneNumber}
                                                </h6>

                                                <p className="address-value">
                                                    {item.address.mota +
                                                        ' ~ ' +
                                                        item.address.quan +
                                                        ' ~ ' +
                                                        item.address.tinh +
                                                        ' ~ ' +
                                                        item.address.xa}
                                                </p>
                                                {item.status && (
                                                    <p className="address-item-active">
                                                        <i className="fad fa-check-circle"></i>
                                                    </p>
                                                )}
                                            </Tooltip>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Empty />
                            )
                        ) : (
                            <Empty />
                        )}
                    </div>{' '}
                    {/* / .container */}
                </section>
            </Drawer>
        </>
    );
}

NavigationCustomer.propTypes = {};

export default NavigationCustomer;
