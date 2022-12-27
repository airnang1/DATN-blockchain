import React from 'react';
import PropTypes from 'prop-types';

function PoliceCart(props) {
    const { name, description, icon, onClick } = props;
    return (
        <div className="police-cart" onClick={onClick}>
            <div className="police-cart__icon">
                <i className={`fas fa-${icon}`}></i>
            </div>
            <div className="police-cart__info">
                <div className="police-cart__info__name">{name}</div>
                <div className="police-cart__info__description">
                    {description}
                </div>
            </div>
        </div>
    );
}

PoliceCart.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default PoliceCart;
