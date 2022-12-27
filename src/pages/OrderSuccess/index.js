import React, { useEffect, useState } from 'react';
import Helmet from '../../Components/Helmet';
import Section from '../../Components/Section';
import { Link, useParams,useHistory } from 'react-router-dom';
import SuccessModalCheckout from '../../Components/SuccessModalCheckout';
import useQuery from '../../Hooks/useQuery.js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductsInCart } from '../../Store/Reducer/cartReducer';
import {
    handleAddOrder,
    orderSelector,
} from '../../Store/Reducer/orderReducer';
import { authSelector } from '../../Store/Reducer/authReducer';
import {
    getUserAddress,
} from '../../Store/Reducer/userAddressReducer';
import { setLoadingAction } from '../../Store/Reducer/loadingReducer';

function OrderSuccess({axiosJWT}) {
    const { paymentId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const query = useQuery();
    const auth = useSelector(authSelector);
    const cartProducts = JSON.parse(localStorage.getItem('cart'));
    const userAddress = JSON.parse(localStorage.getItem('userAddress'));
    const [productsId, setProductsId] = useState([]);
    const orderSlt = useSelector(orderSelector);
    const [isActiveModalSuccess, setIsActiveModalSuccess] = useState(false);
    const [isCheckProductsToCart, setIsCheckProductsToCart] = useState(false);

    const { order } = orderSlt;
    const messageOrder = query.get('message');

    useEffect(() => {
        if(!auth.user && !auth.tokenAuth) {
            history.push('/buyer/sign-in')
        }
    }, [history, auth]);

    useEffect(() => {
        dispatch(setLoadingAction(false));
        if (query.get('productsId')) {
            if (query.get('productsId').split('-').length) {
                setProductsId(query.get('productsId').split('-'));
            }
        }
    }, [query, dispatch]);

    useEffect(() => {
        if (productsId && productsId.length) {
            if(cartProducts) {
                if (cartProducts.itemsChecked) {
                    if (cartProducts.data.items) {
                        const cartProductsChange = cartProducts.data.items.some(
                            function (item) {
                                if (productsId.includes(item._id.toString()))
                                    return true;
                                else return false;
                            },
                        );
                        setIsCheckProductsToCart(cartProductsChange);
                    }
                } else {
                    if (cartProducts.cart) {
                        const cartProductsChange = cartProducts.cart.items.some(
                            function (item) {
                                if (productsId.includes(item._id.toString()))
                                    return true;
                                else return false;
                            },
                        );
                        setIsCheckProductsToCart(cartProductsChange);
                    }
                }
            }
            
        }
    }, [cartProducts, productsId]);

    useEffect(() => {
        if (order) {
            if (isCheckProductsToCart) {
                if (paymentId) {
                    setIsActiveModalSuccess(true);
                    if (productsId && cartProducts._id) {
                        dispatch(
                            deleteProductsInCart({
                                productsId,
                                cartId: cartProducts._id,
                            }),
                        );
                    }
                }
                setTimeout(() => {
                    setIsActiveModalSuccess(false);
                }, 3000);
            }
        }
    }, [
        cartProducts,
        dispatch,
        isCheckProductsToCart,
        order,
        paymentId,
        productsId,
    ]);

    useEffect(() => {
        if (auth.user) {
            dispatch(getUserAddress({ userId: auth.user._id }));
        }
    }, [dispatch, auth]);

    useEffect(() => {
        if (auth.tokenAuth) {
                if (productsId && productsId.length) {
                if (userAddress) {
                    if (userAddress.items.length) {
                        userAddress.items.forEach((item) => {
                            if (item.status) {
                                dispatch(
                                    handleAddOrder({
                                        tokenAuth: auth.tokenAuth,
                                        username: item.username,
                                        phoneNumber: item.phoneNumber,
                                        city: item.address,
                                        productsID: productsId,
                                        isPayment: JSON.parse(
                                            query.get('isPayment'),
                                        ),
                                        message: messageOrder,
                                        paymentFee: JSON.parse(
                                            query.get('paymentFee'),
                                        ),
                                        serviceTypeId: JSON.parse(
                                            query.get('serviceTypeId'),
                                        ),
                                        axiosJWT
                                    }),
                                );
                            }
                        });
                    }
                }
            }
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, productsId.length]);

    return (
        <Helmet title="Order Success">
            <SuccessModalCheckout isActiveModalSuccess={isActiveModalSuccess} />
            <div className="order-success">
                <Section>
                    <div className="order-success__payment-info">
                        <div className="order-success__payment-info__icon-success">
                            <img
                                alt="icon-success"
                                src="https://pageengage.homeasap.com/wp-content/uploads/2017/12/PE-Success-Icon.png"
                            />
                        </div>
                        <div className="order-success__payment-info__title">
                            <p>
                                THANK{'  '}
                                {query.get('username')
                                    ? query.get('username').toUpperCase()
                                    : 'YOU'}
                                {'  '}
                                FOR YOUR PURCHASE
                            </p>
                        </div>
                        <div className="order-success__payment-info__payment-id">
                            <p>Your order number is: {paymentId}</p>
                        </div>
                        <div className="order-success__payment-info__btn-continue">
                            <Link className="button" to="/user/order">
                                <span className="button__text">
                                    <span>Xem</span>
                                </span>
                                <span> </span>
                                <span>đơn hàng</span>

                                <svg
                                    className="button__svg"
                                    role="presentational"
                                    viewBox="0 0 600 600"
                                >
                                    <defs>
                                        <clipPath id="myClip">
                                            <rect
                                                x={0}
                                                y={0}
                                                width="100%"
                                                height="50%"
                                            />
                                        </clipPath>
                                    </defs>
                                    <g clipPath="url(#myClip)">
                                        <g id="money">
                                            <path
                                                d="M441.9,116.54h-162c-4.66,0-8.49,4.34-8.62,9.83l.85,278.17,178.37,2V126.37C450.38,120.89,446.56,116.52,441.9,116.54Z"
                                                fill="#699e64"
                                                stroke="#323c44"
                                                strokeMiterlimit={10}
                                                strokeWidth={14}
                                            />
                                            <path
                                                d="M424.73,165.49c-10-2.53-17.38-12-17.68-24H316.44c-.09,11.58-7,21.53-16.62,23.94-3.24.92-5.54,4.29-5.62,8.21V376.54H430.1V173.71C430.15,169.83,427.93,166.43,424.73,165.49Z"
                                                fill="#699e64"
                                                stroke="#323c44"
                                                strokeMiterlimit={10}
                                                strokeWidth={14}
                                            />
                                        </g>
                                        <g id="creditcard">
                                            <path
                                                d="M372.12,181.59H210.9c-4.64,0-8.45,4.34-8.58,9.83l.85,278.17,177.49,2V191.42C380.55,185.94,376.75,181.57,372.12,181.59Z"
                                                fill="#a76fe2"
                                                stroke="#323c44"
                                                strokeMiterlimit={10}
                                                strokeWidth={14}
                                            />
                                            <path
                                                d="M347.55,261.85H332.22c-3.73,0-6.76-3.58-6.76-8v-35.2c0-4.42,3-8,6.76-8h15.33c3.73,0,6.76,3.58,6.76,8v35.2C354.31,258.27,351.28,261.85,347.55,261.85Z"
                                                fill="#ffdc67"
                                            />
                                            <path
                                                d="M249.73,183.76h28.85v274.8H249.73Z"
                                                fill="#323c44"
                                            />
                                        </g>
                                    </g>
                                    <g id="wallet">
                                        <path
                                            d="M478,288.23h-337A28.93,28.93,0,0,0,112,317.14V546.2a29,29,0,0,0,28.94,28.95H478a29,29,0,0,0,28.95-28.94h0v-229A29,29,0,0,0,478,288.23Z"
                                            fill="#a4bdc1"
                                            stroke="#323c44"
                                            strokeMiterlimit={10}
                                            strokeWidth={14}
                                        />
                                        <path
                                            d="M512.83,382.71H416.71a28.93,28.93,0,0,0-28.95,28.94h0V467.8a29,29,0,0,0,28.95,28.95h96.12a19.31,19.31,0,0,0,19.3-19.3V402a19.3,19.3,0,0,0-19.3-19.3Z"
                                            fill="#a4bdc1"
                                            stroke="#323c44"
                                            strokeMiterlimit={10}
                                            strokeWidth={14}
                                        />
                                        <path
                                            d="M451.46,435.79v7.88a14.48,14.48,0,1,1-29,0v-7.9a14.48,14.48,0,0,1,29,0Z"
                                            fill="#a4bdc1"
                                            stroke="#323c44"
                                            strokeMiterlimit={10}
                                            strokeWidth={14}
                                        />
                                        <path
                                            d="M147.87,541.93V320.84c-.05-13.2,8.25-21.51,21.62-24.27a42.71,42.71,0,0,1,7.14-1.32l-29.36-.63a67.77,67.77,0,0,0-9.13.45c-13.37,2.75-20.32,12.57-20.27,25.77l.38,221.24c-1.57,15.44,8.15,27.08,25.34,26.1l33-.19c-15.9,0-28.78-10.58-28.76-25.93Z"
                                            fill="#7b8f91"
                                        />
                                        <path
                                            d="M148.16,343.22a6,6,0,0,0-6,6v92a6,6,0,0,0,12,0v-92A6,6,0,0,0,148.16,343.22Z"
                                            fill="#323c44"
                                        />
                                    </g>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </Section>

                <div className="order-success__user-info"></div>
                <div className="order-success__product-info"></div>
            </div>
        </Helmet>
    );
}

OrderSuccess.propTypes = {};

export default OrderSuccess;
