import React from 'react';
import { Row, Skeleton, Tag } from 'antd';

function ProductName(props) {
    const { product, loading } = props;
    const statusProduct =
        +product.amount > +product.sold ? 'Còn hàng' : 'Hết hàng';
    return (
        <>
            {loading ? (
                <Skeleton.Button
                    active={true}
                    size="large"
                    shape="default"
                    block={false}
                    style={{ width: '100%' }}
                />
            ) : (
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <p className="product-name">
                        <Tag
                            color="#f50"
                            style={{ transform: 'translateY(-4px)' }}
                        >
                            {statusProduct}
                        </Tag>
                        {product.name}
                    </p>
                </Row>
            )}
        </>
    );
}

ProductName.propTypes = {};

export default ProductName;
