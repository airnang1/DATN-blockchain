import React from 'react';
import OrderPayProduct from './OrderPayProduct';

function OrderPayProducts(props) {
    const { orders, handleOrderActive, photoURL } = props;
    return (
        <div className="user-order__product-all">
            {orders.map((order, index) => (
                <OrderPayProduct
                    order={order}
                    key={order._id}
                    index={index}
                    handleOrderActive={handleOrderActive}
                    photoURL={photoURL}
                />
            ))}
        </div>
    );
}

OrderPayProducts.propTypes = {};

export default OrderPayProducts;
