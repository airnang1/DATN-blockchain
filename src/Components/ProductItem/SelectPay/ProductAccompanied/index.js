import React from 'react';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Avatar from 'antd/lib/avatar/avatar';
import { Button, Col, Popover, Row, Skeleton } from 'antd';
import { numberWithCommas } from '../../../../utils';

const contentMoveFee = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);
function ProductAccompanied(props) {
    const { loading } = props;

    return (
        <>
            {loading ? (
                <Skeleton.Button
                    active={true}
                    size="large"
                    shape="default"
                    block={false}
                    style={{
                        height: '60px',
                        width: '100%',
                        marginTop: 10,
                    }}
                />
            ) : (
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={6}>
                        <p className="product-move">Dịch Vụ</p>
                    </Col>
                    <Col className="gutter-row product-accompanied" span={18}>
                        <Checkbox></Checkbox>
                        <Avatar
                            size="large"
                            src="https://salt.tikicdn.com/cache/280x280/ts/product/af/ff/43/7186184ff3e311b562de02ea7fef3e1e.jpg"
                            alt=""
                        />
                        <div className="product-info">
                            <Popover
                                content={contentMoveFee}
                                title="Title"
                                trigger="hover"
                            >
                                <Button
                                    type="text"
                                    style={{
                                        margin: '5px 0px',
                                        fontSize: '14px',
                                        color: '#a0a0a0',
                                    }}
                                >
                                    Dịch vụ bảo vệ điện thoại, máy tính bảng -
                                    rơi, vỡ, vào nước - 12 tháng
                                </Button>
                            </Popover>
                            <p className="product-price-accompanied">
                                {numberWithCommas(2939999)}đ
                            </p>
                        </div>
                    </Col>
                </Row>
            )}
        </>
    );
}

ProductAccompanied.propTypes = {};

export default ProductAccompanied;
