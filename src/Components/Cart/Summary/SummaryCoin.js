import React from 'react';
import { Checkbox, Col, Row } from 'antd';

function SummaryCoin(props) {
    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={12}></Col>
            <Col className="gutter-row" span={12}>
                <Checkbox
                    // indeterminate={indeterminate}
                    // onChange={onCheckAllChange}
                    // checked={checkAll}
                    disabled
                >
                    Shopee Xu
                </Checkbox>
                <div className="summary-coin">
                    <i
                        className="fad fa-usd-circle"
                        style={{ color: '#c7c700' }}
                    ></i>
                    <p className="summary-voucher-name">Shopee Voucher</p>
                </div>
                <div className="summary-check-title">
                    <i
                        className="fad fa-question-circle"
                        style={{ color: '#0000b8' }}
                    ></i>
                    <p className="summary-voucher-name">
                        Bạn chưa có Shopee Xu
                    </p>
                </div>
                <div className="summary-check-title">
                    <p> đ0</p>
                </div>
            </Col>
        </Row>
    );
}

SummaryCoin.propTypes = {};

export default SummaryCoin;
