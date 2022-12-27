import React from 'react';
import { Button, Divider, Rate, Tag } from 'antd';
import Comments from '../../Comment';
import styled from 'styled-components';
import { StarOutlined } from '@ant-design/icons';

const ProductsCmt = styled.div`
    margin-top: 30px;
    .product-cmt-btn {
        button.ant-btn {
            margin: 5px;
            width: auto;
            height: 36px;
            color: #000000;
            background: #fbffbd;
            svg {
                color: #cdb400;
            }
        }
    }

    span.ant-tag.ant-tag-red {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 130px;
    }
    strong {
        margin: 5px;
        font-size: 30px;
        color: #fac600;
    }
    p {
        margin: 0;
        font-size: 18px;
    }
    .product-cmt-star {
        margin-right: 20px;
    }
    button.ant-btn.ant-btn-text.ant-btn-sm.ant-btn-icon-only.ant-upload-list-item-card-actions-btn {
        background: transparent;
        color: #333;
    }
`;
function ProductCmts(props) {
    const {
        product,
        commentsUser,
        handleInSertCmt,
        handleComments,
        user,
        tokenAuth,
        axiosJWT
    } = props;

    return (
        <ProductsCmt>
            <h1>ĐÁNH GIÁ SẢN PHẨM</h1>
            <Tag color="red">
                <div className="product-cmt-star">
                    <p>
                        <strong>{product.star}</strong> trên 5
                    </p>
                    <Rate
                        disabled
                        defaultValue={product.star}
                        style={{ margin: '5px' }}
                    />
                </div>
                <div className="product-cmt-btn">
                    <Button icon={<StarOutlined />}>
                        Tất Cả (
                        {product.comments ? product.comments.length : '0'})
                    </Button>
                    <Button icon={<StarOutlined />}>5 Sao (#)</Button>
                    <Button icon={<StarOutlined />}>4 Sao (#)</Button>
                    <Button icon={<StarOutlined />}>3 Sao (#)</Button>
                    <Button icon={<StarOutlined />}>2 Sao (#)</Button>
                    <Button icon={<StarOutlined />}>1 Sao (#)</Button>
                    <br />
                    <Button icon={<StarOutlined />}>Có Bình Luận (#)</Button>
                    <Button icon={<StarOutlined />}>
                        Có Hình Ảnh/Video (#)
                    </Button>
                </div>
            </Tag>
            <div className="product-comments">
                <Divider
                    orientation="left"
                    style={{
                        transform: 'translateY(10px)',
                        color: '#c3c3c3',
                    }}
                >
                    <i className="fad fa-comment-alt-smile"></i> Bình Luận
                </Divider>
                <Comments
                    commentsUser={commentsUser}
                    product={product}
                    handleInSertCmt={handleInSertCmt}
                    handleComments={handleComments}
                    user={user}
                    tokenAuth={tokenAuth}
                    axiosJWT={axiosJWT}
                />
            </div>
        </ProductsCmt>
    );
}

ProductCmts.propTypes = {};

export default ProductCmts;
