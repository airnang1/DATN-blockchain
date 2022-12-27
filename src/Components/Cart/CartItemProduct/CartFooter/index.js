import React from 'react';
import { Button } from 'antd';

function CartFooter(props) {
    return (
        <div className="cart-footer">
            <i className="fad fa-truck" style={{ color: '#19acac' }}></i>
            <p
                className="cart-footer-title"
                style={{ margin: '0 10px', color: '#a0a0a0' }}
            >
                Miễn Phí Vận Chuyển cho đơn hàng từ ₫0 (giảm tối đa ₫25.000)
            </p>
            <Button type="text">Tìm hiểu thêm</Button>
        </div>
    );
}

CartFooter.propTypes = {};

export default CartFooter;
