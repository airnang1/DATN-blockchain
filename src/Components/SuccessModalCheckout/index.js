import React from 'react';
 

function SuccessModalCheckout({ isActiveModalSuccess }) {
    return (
        <div
            className={`card-order-success ${
                isActiveModalSuccess ? 'active' : ''
            }`}
        >
            <div className="card-order-success__cart-icon">
                <i className="checkmark">✓</i>
            </div>
            <h1>Order Success</h1>
        </div>
    );
}

SuccessModalCheckout.propTypes = {};

export default SuccessModalCheckout;
