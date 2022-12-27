import React from "react";
import ProductName from "./ProductName";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";
import ProductMove from "./ProductMove";
import ProductSelect from "./ProductSelect";
import ProductAmout from "./ProductAmout";
import ProductBuy from "./ProductBuy";
import ProductAccompanied from "./ProductAccompanied";

function SelectPay(props) {
  const {
    product,
    handleImportProduct,
    productObj,
    handleProductToCart,
    handleNumAmount,
    handleProductToBuy,
    loading,
    user,
    productObjChange,
    totalCmt,
  } = props;

  return (
    <>
      <ProductName product={product} loading={loading} />
      <ProductInfo product={product} loading={loading} totalCmt={totalCmt} />
      <ProductPrice
        productPrice={product.price}
        productPriceOld={product.priceOld}
        productObj={productObj}
        product={product}
        loading={loading}
      />
      <ProductMove product={product} loading={loading} user={user} />
      <ProductSelect
        product={product}
        handleImportProduct={handleImportProduct}
        productObj={productObj}
        loading={loading}
      />
      {handleNumAmount && (
        <ProductAmout
          product={product}
          handleNumAmount={handleNumAmount}
          loading={loading}
        />
      )}

      <ProductBuy
        product={product}
        productObj={productObj}
        handleProductToCart={handleProductToCart}
        handleProductToBuy={handleProductToBuy}
        loading={loading}
        productObjChange={productObjChange}
      />
      <ProductAccompanied loading={loading} />
    </>
  );
}

SelectPay.propTypes = {};

export default SelectPay;
