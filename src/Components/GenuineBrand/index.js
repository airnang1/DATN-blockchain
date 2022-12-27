/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Col, Image, Row, Button } from "antd";
import Slider from "react-slick";
import {
  slide_laptop_genuine,
  slide_price_shock,
} from "../../assets/fake-data";
import { openNotification } from "../../utils";

function GenuineBrand(props) {
  const [display, setDisplay] = useState(true);
  const [visible, setVisible] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleCategoryProduct = () => {
    openNotification(
      "Ahihi Ko Bấm Đc Đâu 🧨",
      "Hiện tại thì tui chưa thêm sản phẩm này nên tạm thời lướt chỗ khác đi nha 😁"
    );
  };

  return (
    <div className="genuine-brand">
      <div className="genuine-brand-title">
        <i className="fad fa-donate" />
        <p>Thương Hiệu Chính Hãng</p>
      </div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ padding: 0 }}>
        <div
          style={{
            width: "100%",
            display: display ? "block" : "none",
          }}
        >
          <Slider {...settings}>
            {slide_price_shock.map((item, index) => (
              <div className="product-slide-item" key={index}>
                <img alt="" style={{ width: "100%" }} src={item} />
              </div>
            ))}
          </Slider>
        </div>
      </Row>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ paddingRight: "30px" }}
      >
        {slide_laptop_genuine.map((item, index) => (
          <Col className="gutter-row" span={4} key={index}>
            <div className="genuine-brand-image">
              <Image
                preview={{ visible: false }}
                src={item}
                className="ant-image"
                onClick={() => setVisible(true)}
              />
              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  <Image src={item} />
                  {/* <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
                                    <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" /> */}
                </Image.PreviewGroup>
              </div>
            </div>
            <div className="genuine-brand-btn">
              <Button type="link" onClick={handleCategoryProduct}>
                Đặt gạch ngay
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

GenuineBrand.propTypes = {};

export default GenuineBrand;
