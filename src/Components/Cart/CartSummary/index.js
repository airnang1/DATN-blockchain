import React from 'react';
import Summary from '../../../Components/Cart/Summary';
import { Skeleton } from 'antd';

function CartSummary(props) {
    const {
        cartProduct,
        totalProducts,
        onChangeAllProduct,
        deleteProductToCart,
        loading,
        handleBuyProductCheck,
        handleBuyProductToPay,
        handleTextInfoAllSelect,
        handleTextInfoDelete,
    } = props;
    return cartProduct.length ? (
        loading ? (
            <Skeleton.Button
                active={true}
                size="large"
                shape="default"
                block={false}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    marginTop: 20,
                }}
            />
        ) : (
            <Summary
                totalProducts={totalProducts}
                onChangeAllProduct={onChangeAllProduct}
                cartProduct={cartProduct}
                deleteProductToCart={deleteProductToCart}
                handleBuyProductCheck={handleBuyProductCheck}
                handleBuyProductToPay={handleBuyProductToPay}
                handleTextInfoAllSelect={handleTextInfoAllSelect}
                handleTextInfoDelete={handleTextInfoDelete}
            />
        )
    ) : (
        ''
    );
}

CartSummary.propTypes = {};

export default CartSummary;
