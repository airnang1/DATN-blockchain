import React from 'react';
import { Col, Empty, Row } from 'antd';
import styled from 'styled-components';
import OrderPayProducts from '../AllProduct/OrderPayProducts';

const WaitingConfirmItem = styled.div``;

function WaitingConfirm(props) {
    const { orders, photoURL, handleOrderActive } = props;

    const handleChangeDataValue = () => {};
    return (
        <WaitingConfirmItem>
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{ marginBottom: '20px' }}
            >
                <Col
                    className="gutter-row"
                    span={24}
                    style={{
                        display: 'flex',
                        minHeight: '350px',
                        flexDirection: 'column',
                        height: 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <div className="add-product__processing">
                        {orders.length !== 0 ? (
                            <OrderPayProducts
                                orders={orders}
                                handleOrderActive={handleOrderActive}
                                photoURL={photoURL}
                                handleChangeDataValue={handleChangeDataValue}
                            />
                        ) : (
                            <>
                                <Empty />
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </WaitingConfirmItem>
    );
}

WaitingConfirm.propTypes = {};

export default WaitingConfirm;
