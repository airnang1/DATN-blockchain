import React, { useEffect, useState } from "react";
import { Button, Col, Row, Skeleton } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function ProductBuy(props) {
  const {
    handleProductToCart,
    product,
    handleProductToBuy,
    loading,
    productObjChange,
  } = props;
  const [productCart, setproductCart] = useState({});

  useEffect(() => {
    const productItem =
      Object.keys(product).length !== 0
        ? {
            _id: product._id,
            name: product.name,
            count: product.varation[0].count,
            image: product.image[0],
            price: product.price,
            priceOld: product.priceOld,
            capacity: product.description,
            trademark: product.description.trademark,
            category: product.category,
            tokenEth: product.tokenEth || "",
            sizeInformation: {
              height: product.height,
              length: product.length,
              weight: product.weight,
              width: product.width,
            },
          }
        : {};
    productObjChange && Object.keys(productObjChange).length !== 0
      ? setproductCart(productObjChange)
      : setproductCart(productItem);
    return () => {
      setproductCart({});
    };
  }, [product, productObjChange]);

  return (
    <>
      {loading ? (
        <Skeleton.Button
          active={true}
          size="large"
          shape="default"
          block={false}
          style={{
            height: "60px",
            width: "400px",
            marginTop: 10,
          }}
        />
      ) : (
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="product-add-cart"
        >
          <Col className="gutter-row" span={8}>
            <Button
              size="large"
              style={{
                width: "180px",
                background: "#ffe7e7",
              }}
              danger
              icon={<ShoppingCartOutlined />}
              onClick={() => handleProductToCart(productCart)}
            >
              Thêm Vào Giỏ Hàng
            </Button>
          </Col>
          <Col className="gutter-row" span={8} style={{ width: "170px" }}>
            <Link to="/cart">
              <Button
                size="large"
                type="danger"
                onClick={() => handleProductToBuy(productCart)}
                style={{ width: 200 }}
              >
                Mua Ngay
              </Button>
            </Link>
          </Col>
        </Row>
      )}
    </>
  );
}

ProductBuy.propTypes = {};

export default ProductBuy;
