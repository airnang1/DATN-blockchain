import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Skeleton } from 'antd';

function ProductAmout(props) {
    const { product, handleNumAmount, loading } = props;
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        handleNumAmount(amount);
    }, [amount, handleNumAmount]);

    const onHandleValueNum = () => (amount < 1 ? setAmount(1) : amount);

    const handleNumAmountSum = (n) => {
        n > 1 ? setAmount(n - 1) : setAmount(n);
    };

    const handleNumAmountExpress = (n) => {
        setAmount(n + 1);
    };

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
                        width: '400px',
                        marginTop: 10,
                    }}
                />
            ) : (
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{ margin: '20px 0' }}
                >
                    <Col className="gutter-row" span={6}>
                        <p className="product-amount product-move">Số Lượng</p>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div className="buttons_added">
                            <Input
                                className="minus is-form"
                                type="button"
                                defaultValue="-"
                                onClick={() => handleNumAmountSum(amount)}
                            />
                            <Input
                                aria-label="quantity"
                                className="input-qty"
                                max="Số tối đa"
                                min="Số tối thiểu"
                                name=""
                                type="number"
                                value={onHandleValueNum()}
                            />
                            <Input
                                className="plus is-form"
                                type="button"
                                defaultValue="+"
                                onClick={() => handleNumAmountExpress(amount)}
                            />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <p
                            className="product-amount"
                            style={{ color: '#c3c3c3' }}
                        >
                            {product.amount} sản phẩm có sẵn
                        </p>
                    </Col>
                </Row>
            )}
        </>
    );
}

ProductAmout.propTypes = {};

export default ProductAmout;
