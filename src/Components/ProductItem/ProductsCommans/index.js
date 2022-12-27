import React, { memo } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import DescriptionProduct from './DescriptionProduct';
import ProductCmts from './ProductsCmts';
import ProductsTop from './ProductsTop';

const ProductsComman = styled.div`
    transform: translateY(20px);
    .ant-row {
        margin-top: 20px;
    }
    th.ant-descriptions-item-label {
        width: 13%;
        font-size: 17px;
        color: #919191;
    }
    .ant-descriptions-title {
        font-size: 30px;
        color: #727272;
    }
    td.ant-descriptions-item-content {
        color: #d50000;
        font-size: 15px;
    }
    .ant-card-meta-description {
        font-size: 20px;
        color: red;
        text-align: center;
    }
    .ant-card.ant-card-bordered.ant-card-hoverable {
        margin: 7px 0;
    }
    h1 {
        font-size: 30px;
        color: #727272;
        font-weight: 600;
    }
    span.ant-divider-inner-text {
        color: #df0000;
    }
    p {
        font-size: 16px;
        color: #646464;
    }
    .product-max-saler {
        color: #cfcfcf;
        font-size: 20px;
    }
`;

function ProductsCommans(props) {
    const {
        product,
        commentsUser,
        handleInSertCmt,
        handleComments,
        user,
        tokenAuth,
        products_api,
        axiosJWT
    } = props;

    return (
        <ProductsComman>
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{
                    background: '#fff',
                    boxShadow: '0 0 2px 2px rgb(227 227 227)',
                }}
            >
                <Col className="gutter-row" span={19}>
                    <DescriptionProduct product={product} />
                    <ProductCmts
                        commentsUser={commentsUser}
                        product={product}
                        handleInSertCmt={handleInSertCmt}
                        handleComments={handleComments}
                        user={user}
                        tokenAuth={tokenAuth}
                        axiosJWT={axiosJWT}
                    />
                </Col>
                <Col className="gutter-row" span={5}>
                    <ProductsTop products_api={products_api} />
                </Col>
            </Row>
        </ProductsComman>
    );
}

ProductsCommans.propTypes = {};

export default memo(ProductsCommans);
