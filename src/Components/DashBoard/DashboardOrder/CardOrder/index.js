import React from 'react';
function CardOrder({ title, count }) {
    return (
        <div className="card-order">
            <h3 className="card-order-title ">
                <span className="enclosed">{title}</span>
            </h3>
            <h3 className="card-order-content">
                <span className="enclosed">
                    {count} <p>Đơn hàng</p>
                </span>
            </h3>
        </div>
    );
}

CardOrder.propTypes = {};

export default CardOrder;
