import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, Badge } from 'antd';
import { humanImg } from '../../../../assets/fake-data/human';
import { numberWithCommas } from '../../../../utils';

const OrderPayProductStyles = styled.div`
    padding: 10px 10px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    .user-order__pay-product-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &__image {
            width: 15%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .ant-avatar-image {
                background: transparent;
                width: 50px;
                height: 50px;
            }
            img {
                width: 100%;
            }
        }
        &__name {
            font-size: 20px;
            font-family: 'M PLUS Rounded 1c';
            text-shadow: 1px 0px 6px #aaaaaa;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .title-product {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-word;
                width: 300px;
            }
        }
        &__date {
            font-size: 13px;
            margin-left: 20px;
            text-shadow: none;
            font-weight: 700;
        }
        &__description {
            font-size: 15px;
            font-family: 'M PLUS Rounded 1c';
            margin: 5px 0;
        }
        &__address-info {
            font-size: 14px;
            font-family: 'M PLUS Rounded 1c';
        }
        &__content {
            width: 60%;
            margin-right: -15px;
        }
        &__price {
            font-size: 20px;
            color: red;
            font-weight: 700;
        }
        &__status {
            font-size: 10px;
            margin-left: 14px;
            font-weight: 600;
            font-family: sans-serif;
            & .Đang.chờ.xử.lý {
                color: #e2c801;
            }
            & .Đã.hủy.đơn.hàng {
                color: #d00000;
            }
            & .Đang.giao.hàng {
                color: #119803;
            }
            span.title-status {
                margin-right: 5px;
            }
        }
    }
    span.ant-badge.ant-badge-not-a-wrapper {
        position: absolute;
        top: 0;
        right: 25%;
    }
    .user-order__stt {
        font-size: 20px;
        font-family: 'M PLUS Rounded 1c';
        transform: translateX(10px);
        color: #7a7a7a;
    }
`;
function OrderPayProduct(props) {
    const { order, handleOrderActive, photoURL, index } =
        props;

    const [orderCreated, setOrderCreated] = useState('');

    useEffect(() => {
        if (order) {
            const d = new Date(order.createdAt);
            const orderCreated =
                d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString();
            setOrderCreated(orderCreated);
        }
    }, [order]);

    return (
        <OrderPayProductStyles id={order._id}>
            <div
                className="user-order__pay-product-item"
                onDoubleClick={() => handleOrderActive(order)}
            >
                <div className="user-order__stt">
                    <span>{index + 1}</span>
                </div>
                <div className="user-order__pay-product-item__image">
                    <Badge
                        count={order.products.length}
                        style={{ zIndex: 1 }}
                    />
                    <Avatar src={photoURL || humanImg} alt="avatar" size={50} />
                </div>
                <div className="user-order__pay-product-item__content">
                    <div className="user-order__pay-product-item__title">
                        <div className="user-order__pay-product-item__name">
                            <span className="title-product">
                                Đơn hàng của {order.username}
                            </span>
                            <div className="user-order__pay-product-item__date">
                                <span>{orderCreated}</span>
                            </div>
                        </div>
                        <div className="user-order__pay-product-item__description">
                            <span>
                                Đơn hàng gồm {order.products.length} sản phẩm
                            </span>
                        </div>
                        <div className="user-order__pay-product-item__address-info">
                            <span>
                                Địa chỉ giao hàng:{' '}
                                {order.city.tinh.ProvinceName} -{' '}
                                {order.city.quan.DistrictName} -{' '}
                                {order.city.xa.WardName} - {order.city.mota}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="user-order__pay-product-item__price">
                    <span>
                        {numberWithCommas(
                            order.products.reduce((accumulator, item) => {
                                return accumulator + item.price * item.qty;
                            }, 0),
                        )}
                        <sup
                            style={{
                                marginTop: '20px',
                            }}
                        >
                            đ
                        </sup>
                    </span>
                </div>
                <div className="user-order__pay-product-item__status">
                    <div className={order.complete}>
                        <span className="title-status">{order.complete}</span>
                    </div>
                </div>
            </div>
        </OrderPayProductStyles>
    );
}

OrderPayProduct.propTypes = {};

export default OrderPayProduct;
