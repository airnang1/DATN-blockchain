/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  Drawer,
  Empty,
  List,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import Slider from "react-slick";
import parse from "html-react-parser";
import UserComments from "./UserComments";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductApi,
  productItemSelector,
} from "../../../Store/Reducer/product";

function Navigation({
  visible,
  handleSetVisible,
  product,
  handleSetActiveProductDetail,
  totalCmt,
}) {
  const dispatch = useDispatch();
  const productStore = useSelector(productItemSelector);

  const [display, setDisplay] = useState(false);
  const [replyComment, setReplyComment] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  const drawerRef = useRef();

  const { isLoading } = productStore;
  const handleShowDescriptionProduct = () => {
    setDisplay(!display);
  };

  const handleGetMoreComments = (item) => {
    dispatch(getProductApi({ limit: item.comments.length + 4, id: item._id }));
  };

  useEffect(() => {
    if (drawerRef.current) {
      drawerRef.current.scrollTo(0, 0);
    }
  }, [visible]);

  const handleFilterPropertyValues = () => {
    const defaultTitle = [];
    const descTitle = [];
    if (product) {
      if (Object.keys(product).length) {
        var resultInputConfig = Object.keys(product).map((key) => [
          key,
          product[key],
        ]);
        resultInputConfig.forEach((item) => {
          if (
            item[0] !== "id" &&
            item[0] !== "description" &&
            item[0] !== "detail" &&
            item[0] !== "varation" &&
            item[0] !== "shop" &&
            item[0] !== "image"
          ) {
            defaultTitle.push(item);
          } else if (item[0] === "description") {
            descTitle.push(
              Object.keys(item[1]).map((key) => [key, item[1][key]])
            );
          }
          if (item[0] === "likes" || item[0] === "comments") {
            item[1] = item[1].length;
          }
          if (item[0] === "createdAt") {
            const d = new Date(item[1]);
            item[1] =
              d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
          }
        });
        return { defaultTitle: defaultTitle, descTitle: descTitle };
      }
    }
  };

  useEffect(() => {
    if (product?.comments) {
      const newRep = product.comments.filter((cmt) => !cmt.reply);
      setReplyComment(newRep);
    }
  }, [product?.comments]);

  const onClose = () => {
    handleSetVisible(false);
    // handleSetActiveProductDetail();
  };

  const handleSetProduct = (index) => {
    setActiveImage(index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const value = handleFilterPropertyValues();

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      className="drawer-info-product"
    >
      {isLoading ? (
        <div className="loading-drawer drawer-product-dashboard">
          <div
            className="row varation-image loading-change"
            style={{ paddingTop: 5, height: "auto" }}
          >
            <Spin size="large" />
          </div>
        </div>
      ) : (
        <div className="drawer-product-dashboard">
          <div
            className="row varation-image"
            style={{ paddingTop: 5, height: "auto" }}
          >
            <div className="product-switching">
              {product && Object.keys(product).length &&
                product.varation.map((item, index) => (
                  <div
                    className={`product-image-item ${
                      activeImage === index ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => handleSetProduct(index)}
                    ref={drawerRef}
                  >
                    <Tooltip placement="top" title={item.title}>
                      <img alt={item.title} src={item.image} />
                    </Tooltip>
                  </div>
                ))}
            </div>
          </div>
          <div className="row" style={{ paddingTop: 5, height: "auto" }}>
            <div className="slider-img">
              <Slider {...settings}>
                {product && Object.keys(product).length &&
                  product.image[activeImage].image.map((item, index) => (
                    <div className="image-products" key={index}>
                      <img alt={item._id} src={item.data} />
                    </div>
                  ))}
              </Slider>
            </div>
            <div className="row">
              <Divider orientation="center">Thông Tin Sản Phẩm</Divider>
              <List
                header={<div>Thông Tin</div>}
                footer={<div>Kết Thúc</div>}
                bordered
                dataSource={value && value.defaultTitle}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark>[ {item[0]} ]</Typography.Text>{" "}
                    {item[0] === "logo" ? (
                      <img
                        alt=""
                        src={item[1]}
                        style={{
                          width: "10%",
                          marginLeft: "10px",
                        }}
                      />
                    ) : (
                      item[1]
                    )}
                  </List.Item>
                )}
              />
              <Divider orientation="center">Mô tả</Divider>
              <List
                header={<div>Thông Tin</div>}
                footer={<div>Kết Thúc</div>}
                bordered
                dataSource={value && value.descTitle[0]}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark>[ {item[0]} ]</Typography.Text>
                    {item[1]}
                  </List.Item>
                )}
              />
            </div>
            <div className="row">
              <Divider orientation="center">Thông Tin Chi Tiết</Divider>
              <div
                className="product-desc-info"
                style={{
                  marginTop: "50px",
                  height: display ? "auto" : 230,
                  overflow: "hidden",
                  transition: "0.5s ease-in-out",
                  position: "relative",
                  paddingLeft: "50px",
                }}
              >
                <h1>MÔ TẢ SẢN PHẨM</h1>
                {product && Object.keys(product).length ? parse(product.detail) : ""}
                <div
                  className="opacity"
                  style={{
                    position: "absolute",
                    height: 150,
                    width: "100%",
                    top: "44%",
                    background:
                      "linear-gradient(rgb(255 255 255 / 0%), rgb(255, 255, 255)) rgb(255 255 255 / 31%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    visibility: display ? "hidden" : "",
                  }}
                ></div>
              </div>
              <Button
                type="link"
                onClick={handleShowDescriptionProduct}
                style={{ marginTop: 30, marginLeft: "45%" }}
              >
                {display ? "Thu Gọn" : "Xem Thêm"}
              </Button>
            </div>
            <div className="row">
              <Divider orientation="center">Bình Luận Từ Người Mua</Divider>
              <div className="user-comments">
                {replyComment && replyComment.length ? (
                  replyComment.map((item, index) => (
                    <UserComments
                      comment={item}
                      key={index}
                      comments={product.comments}
                    />
                  ))
                ) : (
                  <Empty />
                )}
                {totalCmt !== product?.comments.length ? (
                  <Button
                    type="link"
                    onClick={() => handleGetMoreComments(product)}
                  >
                    Xem thêm bình luận
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}

Navigation.propTypes = {};

export default Navigation;
