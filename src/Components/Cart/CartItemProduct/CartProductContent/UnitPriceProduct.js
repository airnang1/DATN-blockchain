import React from 'react';
import { Col } from 'antd';
import { numberWithCommas } from '../../../../utils';

function UnitPriceProduct(props) {
    const { product } = props;
    return (
        <Col className="gutter-row" span={3}>
            <p style={{ color: '#a0a0a0' }}>
                {numberWithCommas(product.price)} <sup> đ</sup>
            </p>
        </Col>
    );
}

UnitPriceProduct.propTypes = {};

export default UnitPriceProduct;
