/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Badge, Card, Progress, Row } from 'antd';
import Slider from 'react-slick';
import { slide_genuine } from '../../assets/fake-data';
import { Link } from 'react-router-dom';
import { handleChangeProductPrice, numberWithCommas } from '../../utils';
const { Meta } = Card;

const SriceShockComp = styled.div`
    margin-bottom: 30px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    button.slick-arrow.slick-prev {
        background: #3333331f;
        position: absolute;
        left: 0%;
        width: 3%;
        height: 100px;
        z-index: 1;
    }
    button.slick-arrow.slick-next {
        background: #3333331f;
        position: absolute;
        right: 0%;
        width: 3%;
        height: 100px;
        z-index: 0;
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
        height: 200px;
        transform: translateY(30px);
        transition: 0.5s ease;
        &:hover {
            transform: translateY(20px);
        }
    }
    .slick-slide {
    }
    .ant-card-body {
        height: 105px;
    }
    .ant-card-meta-title {
        color: #e80000;
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
    .slick-slide img {
        display: block;
        width: 85%;
        margin-left: 17px;
    }
    .ant-card.ant-card-bordered.ant-card-hoverable {
        margin: 2px;
    }
    i.fad.fa-fire {
        position: absolute;
        top: 90%;
        right: 6%;
        font-size: 18px;
    }
    path {
        display: none;
    }
`;
const settings2 = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
};

function SriceShock(props) {
    const { title, slideStatus, mobile_api } = props;
    const [display, setDisplay] = useState(true);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
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
    const handleRenderProductUI = (products) => {
        if (products) {
            return products
                ? products.filter((item) => {
                      return (
                          handleChangeProductPrice(item.priceOld, item.price) >
                          10
                      );
                  })
                : '';
        }
    };

    return (
        <SriceShockComp>
            <div className="price-shock-title">
                <p className="price-shock-text">
                    {title ? (
                        title
                    ) : (
                        <i>
                            Giá Sốc <i className="fad fa-bolt"></i> Hôm Nay
                        </i>
                    )}
                </p>
            </div>
            {slideStatus && (
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{ padding: 0 }}
                >
                    <div
                        style={{
                            width: '100%',
                            display: display ? 'block' : 'none',
                            marginBottom: 20,
                        }}
                    >
                        <Slider {...settings2}>
                            {slide_genuine.map((item, index) => (
                                <div className="product-slide-item" key={index}>
                                    <img
                                        alt=""
                                        style={{ width: '100%' }}
                                        src={item}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </Row>
            )}
            <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{ padding: 0 }}
            >
                <div
                    style={{
                        width: '100%',
                        display: display ? 'block' : 'none',
                    }}
                >
                    <Slider {...settings}>
                        {handleRenderProductUI(mobile_api)
                            ? handleRenderProductUI(mobile_api).map(
                                  (item, index) => (
                                      <div style={{ width: 247 }} key={index}>
                                          <Link
                                              to={`/product/${
                                                  item.category
                                              }/${item.name.replace(
                                                  /[^\w\s]/gi,
                                                  '',
                                              )}/${item._id}`}
                                          >
                                              <Badge.Ribbon
                                                  text="Hot"
                                                  color="red"
                                                  style={{
                                                      right: '0px',
                                                      display:
                                                          item.util > 50
                                                              ? 'block'
                                                              : 'none',
                                                  }}
                                                  key={index}
                                              >
                                                  <Card
                                                      hoverable
                                                      cover={
                                                          <img
                                                              alt="example"
                                                              src={
                                                                  item.image[0]
                                                                      .image[0]
                                                                      .data
                                                              }
                                                          />
                                                      }
                                                  >
                                                      <Meta
                                                          title={
                                                              <>
                                                                  {numberWithCommas(
                                                                      item.price,
                                                                  )}
                                                                  <sup> đ</sup>
                                                              </>
                                                          }
                                                          description={
                                                              item.util > 50
                                                                  ? 'Sắp bán hết'
                                                                  : 'Vẫn còn nhiều hàng'
                                                          }
                                                      />
                                                      <div
                                                          style={{ width: 170 }}
                                                      >
                                                          <Progress
                                                              percent={handleChangeProductPrice(
                                                                  item.priceOld,
                                                                  item.price,
                                                              )}
                                                              size="small"
                                                              status="exception"
                                                          />
                                                          <i
                                                              className="fad fa-fire"
                                                              style={{
                                                                  color:
                                                                      handleChangeProductPrice(
                                                                          item.priceOld,
                                                                          item.price,
                                                                      ) > 40
                                                                          ? '#ff3a0a'
                                                                          : '#fff',
                                                              }}
                                                          ></i>
                                                      </div>
                                                  </Card>
                                              </Badge.Ribbon>
                                          </Link>
                                      </div>
                                  ),
                              )
                            : ''}
                    </Slider>
                </div>
            </Row>
        </SriceShockComp>
    );
}

SriceShock.propTypes = {};

export default SriceShock;
