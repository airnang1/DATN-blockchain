import React from 'react';
import { Col, Tag } from 'antd';
import { numberWithCommas } from '../../../../utils';
function TotalPriceProduct(props) {
    const { amount, product } = props;
    return (
        <Col className="gutter-row" span={3}>
            <Tag color="red" style={{ fontSize: '17px' }}>
                {numberWithCommas(product.price * amount)}
                <sup> đ</sup>
            </Tag>
        </Col>
    );
}

TotalPriceProduct.propTypes = {};

export default TotalPriceProduct;
