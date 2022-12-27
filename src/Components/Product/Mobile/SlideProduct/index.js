/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Slider from "react-slick";
import { Row } from "antd";
import ProductCart from "../../../ProductCart";

function SlideProduct(props) {
  const { products } = props;
  const [display, setDisplay] = useState(true);
  const [width, setWidth] = useState(950);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ padding: 0 }}>
      <div
        style={{
          width: "100%",
          display: display ? "block" : "none",
        }}
      >
        <Slider {...settings}>
          {products.map((item, index) => (
            <ProductCart
              id={item.id}
              product={item}
              name={item.name}
              price={item.price}
              status={item.status}
              star={item.star}
              amount={item.amount}
              category={item.category}
              capacity={item.capacity}
              varation={item.varation}
              image={item.image}
              description={item.description}
              priceOld={item.priceOld}
              height="350"
              img_width="100%"
              key={index}
              right="-5px"
            />
          ))}
        </Slider>
      </div>
    </Row>
  );
}

SlideProduct.propTypes = {};

export default SlideProduct;
