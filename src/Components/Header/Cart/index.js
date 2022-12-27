import React, { useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../Button';
import CartProducts from './CartProducts';
import { Empty } from 'antd';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../Store/Reducer/authReducer';
import { toast } from 'react-toastify';
import { handleResetCartUser } from '../../../Store/Reducer/cartReducer';
import { useDispatch } from 'react-redux';

function Cart(props) {
    const { cart } = props;
    const cartDrawerRef = useRef(null);
    const user = useSelector(authSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    const someHandler = () => {
        if (cartDrawerRef.current) {
            cartDrawerRef.current.classList.add('active');
        }
    };

    const someOtherHandler = () => {
        if (cartDrawerRef.current) {
            cartDrawerRef.current.classList.remove('active');
        }
    };

    useEffect(() => {
        if (!user.tokenAuth && !user.user) {
            dispatch(handleResetCartUser());
        }
    }, [user, dispatch]);

    const handleCheckLinkCart = () => {
        if (user.tokenAuth && user.user) {
            history.push('/cart');
        } else {
            toast.warning('Bạn cần phải đăng nhập để sử dụng dịch vụ này');
            history.push('/buyer/signin');
        }
    };

    return (
        <div className="header__menu__item header__menu__right__item">
            <div
                className="header__menu__item__cart"
                onMouseEnter={someHandler}
                onMouseLeave={someOtherHandler}
                id="cartId"
            >
                <span
                    onClick={handleCheckLinkCart}
                    className="header-cart-icon"
                >
                    <i className="fab fa-opencart"></i>
                </span>

                {cart && cart.cart && cart.cart.items.length ? (
                    <p>
                        {cart.cart.items.reduce((sum, { qty }) => sum + qty, 0)}
                    </p>
                ) : null}

                <div
                    className="header__menu__item__cart-drawer"
                    ref={cartDrawerRef}
                    id="cartDrawerId"
                >
                    <span className="header__menu__item__cart-drawer__title">
                        Add new product
                    </span>
                    <div className="header__menu__item__cart-drawer__products">
                        {cart && cart.cart && cart.cart.items.length ? (
                            cart.cart.items.map((item, index) => (
                                <CartProducts key={index} product={item} />
                            ))
                        ) : (
                            <Empty style={{ marginTop: 40 }} />
                        )}
                    </div>
                    <Link to="/cart" style={{ width: '100%' }}>
                        <Button
                            size="sm"
                            icon="shopping-basket"
                            animate={true}
                            width="100%"
                        >
                            View cart
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

Cart.propTypes = {};

export default Cart;
