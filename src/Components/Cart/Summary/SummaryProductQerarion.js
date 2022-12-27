import React from 'react';
import { Button, Checkbox, Col, Row, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../../../utils';

function SummaryProductQerarion(props) {
    const {
        cartProduct,
        totalProducts,
        onChangeAllProduct,
        deleteProductToCart,
        handleBuyProductToPay,
        handleBuyProductCheck,
        handleTextInfoAllSelect,
        handleTextInfoDelete,
    } = props;

    return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={4}>
                <Tooltip
                    placement="top"
                    title={() => handleTextInfoAllSelect()}
                    color={'#2db7f5'}
                >
                    <Checkbox
                        onChange={(e) => onChangeAllProduct(e)}
                        name="allSelect"
                        checked={
                            cartProduct.filter(
                                (item) => item?.isChecked !== true,
                            ).length < 1
                        }
                    >
                        Chọn Tất Cả ({cartProduct.length})
                    </Checkbox>
                </Tooltip>
            </Col>
            <Col className="gutter-row" span={2}>
                <Tooltip
                    placement="top"
                    title={() => handleTextInfoDelete()}
                    color={'#2db7f5'}
                >
                    <Button type="text" onClick={() => deleteProductToCart()}>
                        Xoá
                    </Button>
                </Tooltip>
            </Col>
            <Col className="gutter-row" span={5}>
                <Button type="text" disabled>
                    Lưu Vào Mục Đã Thêm
                </Button>
            </Col>
            <Col
                className="gutter-row"
                span={9}
                style={{ display: 'flex', alignItems: 'center' }}
            >
                Tổng thanh toán ({totalProducts.length} Sản phẩm):
                <p className="summary-coin-value" style={{ display: 'flex' }}>
                    {cartProduct.length
                        ? totalProducts.length
                            ? numberWithCommas(
                                  totalProducts.reduce((accumulator, item) => {
                                      return (
                                          accumulator +
                                          Number(item.price) * item.qty
                                      );
                                  }, 0),
                              )
                            : 0
                        : 0}
                    <sup
                        style={{
                            marginTop: '20px',
                        }}
                    >
                        đ
                    </sup>
                </p>
            </Col>
            <Col className="gutter-row" span={4}>
                <Link to={handleBuyProductToPay() || '/#'}>
                    <Button
                        type="danger"
                        size="large"
                        onClick={handleBuyProductCheck}
                    >
                        Mua Hàng
                    </Button>
                </Link>
            </Col>
        </Row>
    );
}

SummaryProductQerarion.propTypes = {};

export default SummaryProductQerarion;
