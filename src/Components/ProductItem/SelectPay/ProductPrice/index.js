import React from 'react';
import { Row, Skeleton, Tag } from 'antd';
import { numberWithCommas } from '../../../../utils';

function ProductPrice(props) {
    const { productPrice, productPriceOld, productObj, loading, product } =
        props;

    return (
        <>
            {loading ? (
                <Skeleton.Button
                    active={true}
                    size="large"
                    shape="default"
                    block={false}
                    style={{ width: '100%', marginTop: 10 }}
                />
            ) : (
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    className="product-price"
                >
                    <p className="product-text" style={{ fontWeight: 600 }}>
                        {!productObj.price
                            ? numberWithCommas(productPrice || '')
                            : numberWithCommas(productObj.price)}
                        <sup> đ</sup>
                    </p>
                    {+productObj.priceOld ? (
                        <p className="product-text-old">
                            <i>
                                <del>
                                    {!productObj.priceOld
                                        ? numberWithCommas(
                                              productPriceOld || '',
                                          )
                                        : numberWithCommas(productObj.priceOld)}
                                    đ
                                </del>
                            </i>
                        </p>
                    ) : (
                        ''
                    )}
                    {productObj.priceOld > productObj.price ? (
                        <Tag
                            color="#f50"
                            style={{
                                transform: 'translateY(-5px)',
                                backgroundColor: 'red',
                                fontSize: '17px',
                            }}
                        >
                            -
                            {productObj.priceOld && productObj.price
                                ? Math.round(
                                      ((productObj.priceOld -
                                          productObj.price) /
                                          productObj.priceOld) *
                                          100,
                                  )
                                : Object.keys(product).length
                                ? Math.round(
                                      ((product.priceOld - product.price) /
                                          product.priceOld) *
                                          100,
                                  )
                                : ''}
                            %
                        </Tag>
                    ) : (
                        ''
                    )}
                </Row>
            )}
        </>
    );
}

ProductPrice.propTypes = {};

export default ProductPrice;
