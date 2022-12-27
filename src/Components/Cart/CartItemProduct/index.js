/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShopToCart from "./ShopToCart";
import CartProductContent from "./CartProductContent";
import CartFooter from "./CartFooter";

const CartItem = styled.div`
  margin: 10px 0;
  background: #ffffff;
  padding: 10px;
  border: 1px solid #dbdbdb;
`;
function CartItemProduct(props) {
  const {
    product,
    handleAmount,
    activeSearchSimilar,
    index,
    handleShowSearchProductActive,
    statusSearchSimilar,
    handleStatusChange,
    handleImportProductToTotal,
    mobile_api,
    searchSimilar,
    loadingSimilar,
  } = props;
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(product.qty);
  }, [product]);

  const onChange = (e) => {
    const { name, checked } = e.target;
    handleStatusChange(name, checked);
  };

  useEffect(() => {
    handleImportProductToTotal(product, product.isChecked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onHandleValueNum = () => (amount < 1 ? 1 : amount);

  const handleRemoveNum = () => {
    setAmount(amount - 1);
    handleAmount({ ...product, amount: amount - 1 });
  };

  const handleSumNum = () => {
    setAmount(amount + 1);
    handleAmount({ ...product, amount: amount + 1 });
  };

  return (
    <CartItem>
      <ShopToCart onChange={onChange} product={product} />

      <CartProductContent
        onChange={onChange}
        product={product}
        handleRemoveNum={handleRemoveNum}
        onHandleValueNum={onHandleValueNum}
        handleSumNum={handleSumNum}
        amount={amount}
        activeSearchSimilar={activeSearchSimilar}
        handleShowSearchProductActive={handleShowSearchProductActive}
        index={index}
        statusSearchSimilar={statusSearchSimilar}
        mobile_api={mobile_api}
        searchSimilar={searchSimilar}
        loadingSimilar={loadingSimilar}
      />

      <CartFooter />
    </CartItem>
  );
}

CartItemProduct.propTypes = {};

export default CartItemProduct;
