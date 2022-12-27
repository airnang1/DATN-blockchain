import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { numberWithCommas } from '../../../../utils';

function OrderUserProfile(props) {
    const { photoURL, dataOrder } = props;
    const [orderCreated, setOrderCreated] = useState('');

    useEffect(() => {
        if (dataOrder) {
            const d = new Date(dataOrder.createdAt);
            const orderCreated =
                d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString();
            setOrderCreated(orderCreated);
        }
    }, [dataOrder]);

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="order__user-profile">
                    <span>Thông tin người mua hàng</span>
                    <div className="order__user-status">
                        <div className={dataOrder.complete}>
                            <span className="title-status">
                                {dataOrder.complete}
                            </span>
                            {/* <i className={`fad ${dataOrder.complete}`}></i> */}
                        </div>
                    </div>
                </div>
                <div className="order__user">
                    <div className="order__user-title">
                        <div className="order__user-avatar">
                            <Avatar alt="" src={photoURL} size="large" />
                        </div>
                        <div className="order__user-name">
                            <span>{dataOrder.username}</span>
                        </div>
                    </div>
                    <div className="order__user-phone">
                        <span className="order__user-phone-title">
                            Số Điện Thoại:
                        </span>
                        <span className="order__user-phone-text">
                            {dataOrder.phoneNumber}
                        </span>
                    </div>
                    <div className="order__user-address">
                        <span className="order__user-address-title">
                            Địa Chỉ:
                        </span>
                        <span className="order__user-address-text">
                            {dataOrder.city.tinh.ProvinceName} -{' '}
                            {dataOrder.city.quan.DistrictName} -{' '}
                            {dataOrder.city.xa.WardName} - {dataOrder.city.mota}
                        </span>
                    </div>
                    <div className="order__user-date-time">
                        <span className="order__user-date-time-title">
                            Thời gian:
                        </span>
                        <span className="order__user-date-time-text">
                            {orderCreated}
                        </span>
                    </div>

                    <div className="order__user-message">
                        <span className="order__user-message-title">
                            Lời nhắn:
                        </span>
                        <span className="order__user-message-text">
                            {dataOrder.message || 'Không có lời nhắn'}
                        </span>
                    </div>
                    <div className="order__user-date-time">
                        <span className="order__user-date-time-title">
                            Phí shipping:
                        </span>
                        <span className="order__user-date-time-text">
                            {numberWithCommas(dataOrder.paymentFee)} đ
                        </span>
                    </div>
                    <div className="order__user-date-time">
                        <span className="order__user-date-time-title">
                            Trạng thái đơn hàng: 
                        </span>
                        <span className="order__user-date-time-text">
                        {dataOrder.isDelivery ? 'Đơn hàng đang được vận chuyển' : 'Đơn hàng đang chờ xử lý'}
                        </span>
                    </div>
                    <div className="order__user-date-time">
                        <span className="order__user-date-time-title">
                            Lời nhắn từ hệ thống:
                        </span>
                        <span className="order__user-date-time-text">
                            {dataOrder.returnMessage}
                        </span>
                    </div>
                    <div className="order__user-date-time">
                        <span className="order__user-date-time-title">
                            Ngày bàn giao sản phẩm:
                        </span>
                        <span className="order__user-date-time-text">
                            {dataOrder.expectedDeliveryTime}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

OrderUserProfile.propTypes = {};

export default OrderUserProfile;
