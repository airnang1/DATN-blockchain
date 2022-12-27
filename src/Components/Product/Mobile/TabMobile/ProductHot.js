import React from "react";
import styled from "styled-components";
import { Col, Empty, Row } from "antd";
import SlideProduct from "../SlideProduct";
import DividerComponent from "../Divider";

const ProductHotComponent = styled.div`
  padding: 20px;
  margin-bottom: 30px;
  button.slick-arrow.slick-prev {
    background: #3333330d;
    position: absolute;
    left: 0%;
    width: 3%;
    height: 100px;
    z-index: 1;
  }
  button.slick-arrow.slick-next {
    background: #3333330d;
    position: absolute;
    right: 0%;
    width: 3%;
    height: 100px;
    z-index: 1;
  }
  .price-shock-title {
    font-size: 30px;
    color: #ff5500;
  }
  i.fad.fa-bolt {
    font-size: 45px;
    color: #ffca00;
  }
  .ant-card-cover {
    width: 100%;
  }
  .slick-slide {
  }
  .ant-card-body {
    height: 105px;
  }
  .ant-card-meta-title {
    color: #917920;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
  .ant-card-meta-description {
    text-align: center;
  }
  ul.slick-dots {
    visibility: hidden;
  }
  .ant-divider-horizontal.ant-divider-with-text {
    margin: 0;
  }
`;
const Week = styled.div`
  .ant-ribbon-wrapper {
    transform: scale(0.95);
  }
  .product-cart {
    width: 100%;
  }
  .product-cart__price {
    color: #e80808;
    font-size: 1.6rem;
    font-weight: 600;
  }
  .product-cart .product-cart-evaluate {
    display: block;
  }
  .product-cart__image {
    padding-top: 85%;
  }
  i.fad.fa-fire {
    font-size: 30px;
    margin-right: 10px;
    color: #ff8a43;
  }
`;
const Mouth = styled.div`
  margin-top: 55px;
  .ant-ribbon-wrapper {
    transform: scale(0.95);
  }
  .product-cart {
    width: 100%;
  }
  .product-cart__price {
    color: #e80808;
    font-size: 1.6rem;
    font-weight: 600;
  }
  .product-cart .product-cart-evaluate {
    display: block;
  }
  .product-cart__image {
    padding-top: 85%;
  }
  i.fad.fa-fire {
    font-size: 30px;
    margin-right: 10px;
    color: #ff8a43;
  }
`;
const Year = styled.div`
  .ant-ribbon-wrapper {
    transform: scale(0.95);
  }
  .product-cart {
    width: 100%;
  }
  .product-cart__price {
    color: #e80808;
    font-size: 1.6rem;
    font-weight: 600;
  }
  .product-cart .product-cart-evaluate {
    display: block;
  }
  .product-cart__image {
    padding-top: 85%;
  }
  i.fad.fa-fire {
    font-size: 30px;
    margin-right: 10px;
    color: #ff8a43;
  }
`;

function ProductHot(props) {
  const { products } = props;

  return (
    <ProductHotComponent>
      <Week>
        <DividerComponent
          title="Sản phẩm của Tuần"
          transformY="0"
          icon=""
          position="center"
        />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            className="gutter-row"
            span={24}
            style={{
              display: "flex",
              justifyContent: " flex-start",
              alignItems: "center",
            }}
          >
            <i className="fad fa-fire"></i>
            <p className="product-week-title">Sản Phẩm Của Tuần</p>
          </Col>
        </Row>
        {products?.length ? (
          <SlideProduct products={products} />
        ) : (
          <>
            <Empty />
          </>
        )}
      </Week>

      <Mouth>
        <DividerComponent
          title="Sản phẩm của Tháng"
          transformY="0"
          icon=""
          position="center"
        />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            className="gutter-row"
            span={24}
            style={{
              display: "flex",
              justifyContent: " flex-start",
              alignItems: "center",
            }}
          >
            <i className="fad fa-fire"></i>
            <p className="product-week-title">Sản Phẩm Của Tháng</p>
          </Col>
        </Row>
        {products?.length ? (
          <SlideProduct products={products} />
        ) : (
          <>
            <Empty />
          </>
        )}
      </Mouth>
      <Year
        style={{
          marginTop: 50,
        }}
      >
        <DividerComponent
          title="Sản phẩm của Năm"
          transformY="0"
          icon=""
          position="center"
        />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            className="gutter-row"
            span={24}
            style={{
              display: "flex",
              justifyContent: " flex-start",
              alignItems: "center",
            }}
          >
            <i className="fad fa-fire"></i>
            <p className="product-week-title">Sản Phẩm Của Năm</p>
          </Col>
        </Row>
        {products?.length ? (
          <SlideProduct products={products} />
        ) : (
          <>
            <Empty />
          </>
        )}
      </Year>
    </ProductHotComponent>
  );
}

ProductHot.propTypes = {};

export default ProductHot;
