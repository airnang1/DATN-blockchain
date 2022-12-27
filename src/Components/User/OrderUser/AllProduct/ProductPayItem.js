import React from 'react';
 
import styled from 'styled-components';
import numberWithCommas from '../../../../utils/numberWithCommas';

const ProductPayItemStyle = styled.div`
    width: 100%;
    height: 130px;
    box-shadow: 1px 1px 30px 1px #eaeaea;
    margin-bottom: 10px;
    border: 1px solid #d2d2d2;
    .user-order__product {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        &__image {
            width: 15%;
            height: 100%;
            padding: 10px;
            & img {
                width: 100%;
            }
        }
        &__content {
            transform: translateX(-45px);
            width: 447px;
        }
        &__name {
            font-size: 18px;
            font-family: 'M PLUS Rounded 1c';
            color: #6e6e6e;
        }
        &__description {
            font-size: 15px;
            font-weight: 600;
            color: #828282;
            font-style: italic;
        }
        &__amount {
            font-size: 16px;
            color: #aaa;
        }
        &__price {
            font-size: 17px;
            width: 15%;
            color: #747474;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #d2d2d2;
            height: 100%;
        }
    }
`;
function ProductPayItem(props) {
    const { order } = props;

    return (
        <ProductPayItemStyle>
            <div className="user-order__product">
                <div className="user-order__product__image">
                    <img alt={order.name} src={order.image[0]} />
                </div>
                <div className="user-order__product__content">
                    <div className="user-order__product__name">
                        <span>{order.name}</span>
                    </div>
                    <div className="user-order__product__description">
                        <span>{order.capacity}</span>
                    </div>
                </div>
                <div className="user-order__product__amount">
                    <span>x {order.amount}</span>
                </div>
                <div className="user-order__product__price">
                    {numberWithCommas(order.price)}
                    <sup> đ</sup>
                </div>
            </div>
        </ProductPayItemStyle>
    );
}

ProductPayItem.propTypes = {};

export default ProductPayItem;
