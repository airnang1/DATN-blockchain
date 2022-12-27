import React, { useState } from 'react';
import { Button, Col, Skeleton } from 'antd';
import { ShopOutlined, WechatOutlined } from '@ant-design/icons';

function Shop(props) {
    const { product, loading } = props;
    // eslint-disable-next-line no-unused-vars
    const [online, setOnline] = useState(true);

    const shopInfo = product.shop ? product.shop : {};
    return (
        <>
            {loading ? (
                <Skeleton.Button
                    active={true}
                    size="large"
                    shape="default"
                    block={false}
                    style={{
                        height: 60,
                        width: '100%',
                        marginTop: 10,
                    }}
                />
            ) : (
                <>
                    <Col className="gutter-row" span={10}>
                        <img
                            alt=""
                            style={{ width: 100, display: '' }}
                            src={shopInfo.image}
                        />
                        <div className="product-shop-name">
                            <p>{shopInfo.name}</p>
                            <div className="product-work">
                                {online ? (
                                    <p>
                                        <i
                                            className="fad fa-dot-circle"
                                            style={{
                                                color: 'green',
                                                marginRight: 5,
                                            }}
                                        ></i>
                                        Đang Hoạt Động
                                    </p>
                                ) : (
                                    'Online 6 Phút Trước'
                                )}
                            </div>
                            <div className="product-btn-shop">
                                <Button
                                    size="large"
                                    style={{
                                        background: '#ffe7e7',
                                        marginRight: 10,
                                    }}
                                    danger
                                    icon={<WechatOutlined />}
                                >
                                    Chat Liền
                                </Button>
                                <Button size="large" icon={<ShopOutlined />}>
                                    Xem Shop
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col
                        className="gutter-row"
                        span={4}
                        style={{
                            alignItems: 'flex-start',
                            marginLeft: 100,
                        }}
                    >
                        <div className="product-intro">
                            Đánh Giá<p>{shopInfo.evaluate}</p>
                        </div>
                        <div className="product-intro">
                            Sản Phẩm<p>{product.amount}</p>
                        </div>
                    </Col>
                    <Col
                        className="gutter-row"
                        span={5}
                        style={{ alignItems: 'flex-start' }}
                    >
                        <div className="product-intro">
                            Tỷ Lệ Phản Hồi<p>{shopInfo.response_rate}%</p>
                        </div>
                        <div className="product-intro">
                            Thời Gian Phản Hồi
                            <p>{shopInfo.response_time} giờ</p>
                        </div>
                    </Col>
                    <Col
                        className="gutter-row"
                        span={5}
                        style={{ alignItems: 'flex-start' }}
                    >
                        <div className="product-intro">
                            Tham Gia<p>{shopInfo.participation} Tháng trước</p>
                        </div>
                        <div className="product-intro">
                            Người theo dõi<p>{shopInfo.monitor}</p>
                        </div>
                    </Col>
                </>
            )}
        </>
    );
}

Shop.propTypes = {};

export default Shop;
