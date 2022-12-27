import React from 'react';
import { Checkbox, Tag } from 'antd';

function ShopToCart(props) {
    const { onChange, product } = props;

    return (
        <div
            className="cart-header"
            style={{ borderBottom: '1px solid #dbdbdb' }}
        >
            <Checkbox
                onChange={onChange}
                checked={product?.isChecked || false}
                name={product._id}
            >
                <Tag color="#f50">Mall</Tag>
                <p className="cart-mesage">Innisfree Official Store</p>
                <i className="fas fa-envelope-open"></i>
            </Checkbox>
        </div>
    );
}

ShopToCart.propTypes = {};

export default ShopToCart;
