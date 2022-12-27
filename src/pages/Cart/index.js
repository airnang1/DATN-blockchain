import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Helmet from '../../Components/Helmet';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    handleAddCoinsProduct,
    handleRemoveCoinsProduct,
    handleUpdateCoinsProduct,
    resetProductCoints,
    totalProductsSelector,
} from '../../Store/Reducer/totalProduct';
import Popup from '../../Components/Cart/Popup';
import CartEmpty from '../../Components/Cart/CartEmpty';
import CartItemProducts from '../../Components/Cart/CartItemProducts';
import CartSummary from '../../Components/Cart/CartSummary';
import SriceShock from '../../Components/SriceShock';
import {
    handleSearchSimilar,
    resetProductSimilar,
    searchSimilarSelector,
    setLoadingSimilar,
} from '../../Store/Reducer/searchSimilar';
import {
    cartSelector,
    deleteProductsInCart,
    handleUpdateAmountProductToCart,
} from '../../Store/Reducer/cartReducer';
import { loadingSelector } from '../../Store/Reducer/loadingReducer';
import { productsSelector } from '../../Store/Reducer/productsReducer';
import { Redirect } from 'react-router';
import { authSelector } from '../../Store/Reducer/authReducer';

const CartPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 97%;

    .ant-row {
        max-width: 100%;
        margin: 10px 0;
        align-items: center;
        margin: 10px 0 !important;
    }
    .ant-alert-message {
        color: #9e8506;
    }
    .ant-alert-description {
        font-size: 13px;
        color: #9b9b9b;
    }
    .header-row {
        height: 50px;
        justify-content: center;
        display: flex;
        align-items: center;
        background: #ffffff;
        margin: 10px 0;
    }
    .ant-checkbox + span {
        display: flex;
        justify-content: center;
        align-items: center;
        p {
            margin: 0 10px;
        }
        i {
            color: red;
        }
    }
    .cart-header {
        height: 50px;
        display: flex;
        align-items: center;
    }
    p.cart-title {
        margin: 0 10px;
        width: 90%;
        padding: 10px;
    }
    .cart-product {
        width: 50%;
    }
    .cart-footer {
        display: flex;
        justify-content: center;
        align-items: baseline;
    }
    .ant-col.ant-col-3.gutter-row {
        text-align: center;
    }
    .ant-skeleton.ant-skeleton-element.ant-skeleton-active {
        width: 100%;
        height: 60px;
    }
    .cart-seklentor {
        width: 100%;
        height: 200px !important;
        margin-bottom: 20px;
    }
    .ant-dropdown.ant-dropdown-placement-bottomLeft {
        width: 100%;
        padding: 20px 176px;
        position: absolute;
        transform: translateX(-13px);
    }
    .btn-show-search-product-similar {
        &:after {
            content: '';
            width: 74%;
            height: 10px;
            background: #fefefe;
            position: absolute;
            top: 75px;
            z-index: 2;
            right: 19px;
        }
    }
    .input-product-checkbox {
        .ant-checkbox {
            transform: scale(1.5);
            .ant-checkbox-inner {
                ${'' /* top: -30px; */}
            }
        }
    }
`;

function Cart({axiosJWT}) {
    const dispatch = useDispatch();
    const cartProducts = useSelector(cartSelector);
    const totalProducts = useSelector(totalProductsSelector);
    const searchSimilarProducts = useSelector(searchSimilarSelector);
    const auth = useSelector(authSelector);

    const [modal, setModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState([]);
    const [cartProduct, setCartProduct] = useState([]);
    const [activeSearchSimilar, setActiveSearchSimilar] = useState(null);
    const [statusSearchSimilar, setStatusSearchSimilar] = useState(false);
    const loading = useSelector(loadingSelector);
    const products_api = useSelector(productsSelector);

    const { searchSimilar, loadingSimilar } = searchSimilarProducts;

    useEffect(() => {
        if (cartProducts) {
            setCartProduct(cartProducts.cart.items);
        }
    }, [cartProducts, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(resetProductCoints());
        };
    }, [dispatch]);

    if (!auth.user && !auth.tokenAuth) {
        return <Redirect to="/buyer/signin" />;
    }

    const handleAmount = (obj) => {
        const { productId, indexProduct, amount } = obj;
        if (obj.amount === 0) {
            setModal(true);
            setCurrentProduct([obj]);
        } else {
            dispatch(
                handleUpdateAmountProductToCart({
                    productId,
                    indexProduct,
                    cartId: cartProducts._id,
                    qty: amount,
                }),
            );
            dispatch(handleUpdateCoinsProduct({ ...obj, qty: amount }));
            dispatch(resetProductCoints());
        }
    };

    const setModalVisibleAlear = () => {
        if (currentProduct.length <= 1) {
            const { productId, indexProduct, amount } = currentProduct[0];

            dispatch(
                handleUpdateAmountProductToCart({
                    productId,
                    indexProduct,
                    cartId: cartProducts._id,
                    qty: amount || 0,
                }),
            );

            dispatch(handleRemoveCoinsProduct(currentProduct[0]));
            dispatch(resetProductCoints());
        } else {
            const productsId = [];
            currentProduct.forEach(async (element) => {
                productsId.push(element._id);
                dispatch(handleRemoveCoinsProduct(element));
                dispatch(resetProductCoints());
            });

            dispatch(
                deleteProductsInCart({ productsId, cartId: cartProducts._id }),
            );
        }

        setModal(false);
    };

    const setModalVisibleCancel = () => {
        setModal(false);
    };

    const onChangeAllProduct = (e) => {
        handleStatusChange('allSelect', e.target.checked);
    };

    const deleteProductToCart = () => {
        if (totalProducts.length) {
            setModal(true);
            setCurrentProduct(totalProducts);
        } else {
            messageToCart(true);
        }
    };

    const messageToCart = (status) => {
        if (status) {
            message.warning({
                content: 'Vui Lòng Chọn Sản Phẩm!',
                className: 'custom-class',
                style: {
                    marginTop: '0vh',
                },
            });
        }
    };

    const handleBuyProductCheck = () => {
        totalProducts.forEach((element) => {
            dispatch(handleRemoveCoinsProduct(element));
        });
        !totalProducts.length && messageToCart(true);
    };

    const handleBuyProductToPay = () => {
        const linkText = totalProducts.reduce((accumulator, item) => {
            return accumulator + `${item._id}+`;
        }, '');

        if (!totalProducts.length) {
            return '#';
        } else {
            return `/checkout/${linkText}`;
        }
    };

    const handleStatusChange = (id, status) => {
        if (id === 'allSelect') {
            let tempSelectAll = cartProduct.map((item) => {
                return { ...item, isChecked: status };
            });

            setCartProduct(tempSelectAll);
        } else {
            let tempProducts = cartProduct.map((item) =>
                item._id === id ? { ...item, isChecked: status } : item,
            );

            setCartProduct(tempProducts);
        }
    };

    const handleImportProductToTotal = (obj, status) => {
        if (status) {
            dispatch(handleAddCoinsProduct(obj));
        } else {
            dispatch(handleRemoveCoinsProduct(obj));
        }
    };

    const handleTextInfoDelete = () => {
        const text1 = (
            <span>
                Xoá {totalProducts.length} Sản Phẩm{' '}
                <i className="fad fa-trash-alt"></i>
            </span>
        );

        const text2 = (
            <span>
                Bạn Chưa Có Sản Phẩm Nào <i className="fad fa-sad-tear"></i>
            </span>
        );

        return totalProducts.length ? text1 : text2;
    };

    const handleTextInfoAllSelect = () => {
        const text1 = (
            <span>
                Nhấn vào để chọn tất cả <i className="fad fa-hand-pointer"></i>
            </span>
        );

        const text2 = (
            <span>
                Nhấn vào để bỏ chọn tất cả{' '}
                <i className="fad fa-hand-pointer"></i>
            </span>
        );

        return totalProducts.length === cartProduct.length ? text2 : text1;
    };

    const handleShowSearchProductActive = (index, product) => {
        dispatch(setLoadingSimilar(true));
        dispatch(resetProductSimilar());
        const dataSearchToObj = {
            category: product.category,
            name: product.name,
            price: product.price,
            trademark: product.capacity.trademark,
        };

        dispatch(
            handleSearchSimilar({
                dataSearchToObj,
            }),
        );
        setTimeout(() => {
            dispatch(setLoadingSimilar(false));
        }, 500);
        setActiveSearchSimilar(index);
        setStatusSearchSimilar(!statusSearchSimilar);
    };

    return (
        <Helmet title="Cart">
            <CartPage>
                <CartEmpty cartProduct={cartProduct} loading={loading} />

                <CartItemProducts
                    cartProduct={cartProduct}
                    handleAmount={handleAmount}
                    totalProducts={totalProducts}
                    loading={loading}
                    handleStatusChange={handleStatusChange}
                    handleImportProductToTotal={handleImportProductToTotal}
                    activeSearchSimilar={activeSearchSimilar}
                    handleShowSearchProductActive={
                        handleShowSearchProductActive
                    }
                    statusSearchSimilar={statusSearchSimilar}
                    searchSimilar={searchSimilar}
                    loadingSimilar={loadingSimilar}
                />

                <CartSummary
                    cartProduct={cartProduct}
                    totalProducts={totalProducts}
                    onChangeAllProduct={onChangeAllProduct}
                    deleteProductToCart={deleteProductToCart}
                    loading={loading}
                    handleBuyProductCheck={handleBuyProductCheck}
                    handleBuyProductToPay={handleBuyProductToPay}
                    handleTextInfoAllSelect={handleTextInfoAllSelect}
                    handleTextInfoDelete={handleTextInfoDelete}
                />

                <Popup
                    modal={modal}
                    setModalVisibleAlear={setModalVisibleAlear}
                    currentProduct={currentProduct}
                    setModalVisibleCancel={setModalVisibleCancel}
                />

                <SriceShock
                    title="CÓ THỂ BẠN CŨNG THÍCH"
                    slideStatus={false}
                    mobile_api={products_api.products}
                />
            </CartPage>
        </Helmet>
    );
}

Cart.propTypes = {};

export default Cart;
