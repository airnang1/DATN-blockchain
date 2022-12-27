import React from 'react';
import { Button, Col, Row } from 'antd';

function SummaryVoucher(props) {
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={12}></Col>
            <Col className="gutter-row" span={12}>
                <div className="summary-voucher">
                    <i
                        className="fad fa-hand-holding-usd"
                        style={{ color: 'red' }}
                    ></i>
                    <p className="summary-voucher-name">Shopee Voucher</p>
                </div>
                <div className="summary-btn">
                    <Button>Chọn Hoặc Nhập Mã</Button>
                </div>
            </Col>
        </Row>
    );
}

SummaryVoucher.propTypes = {};

export default SummaryVoucher;
