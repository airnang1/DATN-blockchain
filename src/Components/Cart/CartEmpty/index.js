import React from 'react';
import EmptyComponent from '../Empty';
import Menu from 'rc-menu/lib/Menu';
import { Alert, Col, Row, Skeleton } from 'antd';

function CartEmpty(props) {
    const { cartProduct, loading } = props;

    return cartProduct.length ? (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={24}>
                    {loading ? (
                        <Skeleton.Button
                            active={true}
                            size="large"
                            shape="default"
                            block={false}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        />
                    ) : (
                        <Alert
                            message="Thông báo"
                            description="Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!"
                            type="warning"
                            showIcon
                            closable
                        />
                    )}
                </Col>
            </Row>
            <Menu />
        </>
    ) : (
        <EmptyComponent />
    );
}

CartEmpty.propTypes = {};

export default CartEmpty;
