import React from "react";
import styled from "styled-components";
import { Card, Col, Menu, Row } from "antd";
import { Tabs } from "antd";
import Meta from "antd/lib/card/Meta";
import Avatar from "antd/lib/avatar/avatar";
const { TabPane } = Tabs;

const NewsPage = styled.div`
  .news-title {
    font-size: 40px;
    color: #979797;
    font-weight: 600;
    p {
      margin: 0;
    }
  }
  .ant-tabs-tab {
    font-size: 17px;
    margin: 10px 20px;
    color: #898989;
  }
  .ant-col.ant-col-17.gutter-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #fafafa;
    .ant-card-meta {
      margin: -20px 0;
    }
    .news-card-title {
      .ant-card.ant-card-bordered.ant-card-hoverable {
        width: 90%;
        height: 415px;
      }
    }
    .news-list-card-title {
      .ant-card.ant-card-bordered.ant-card-hoverable {
        width: 300px;
        height: 90px;
        margin: 16px 0;
      }
      .ant-card-body {
        width: 60%;
        height: 100%;
      }
      img {
        margin-top: 5px;
      }
    }
    .news-list-card-title {
      transform: translateX(-29px);
    }
  }
  .news-list .news-top {
    font-size: 20px;
    color: #c5c5c5;
  }
  span.ant-avatar.ant-avatar-lg.ant-avatar-circle {
    margin-right: 10px;
  }
  span.ant-avatar-string {
    font-size: 20px;
  }
  ul.ant-menu.ant-menu-root.ant-menu-inline.ant-menu-light {
    width: 96%;
  }
  .news-top {
    font-size: 20px;
    color: #d3d3d3;
  }
  .news-item {
    .news-card-author {
      display: flex;
    }
    .ant-card-body {
      padding: 10px 20px;
    }
    p.news-title-tabs {
      color: #6157ff;
      margin-bottom: 5px;
    }
    .ant-card-cover {
      width: 500px;
    }
    .ant-card.ant-card-bordered.ant-card-hoverable {
      display: flex;
    }
    .hbEgeo .news-item .ant-card-cover {
      width: 52%;
    }
    .ant-card-body {
      width: 65%;
    }
    .ant-card-meta-title {
      font-size: 26px;
    }
    .ant-card-meta-description {
      font-size: 16px;
    }
    .news-card-author {
      margin-top: 12px;
      p {
        margin: 0 10px;
        margin-top: 5px;
      }
    }
  }
  .ant-card.ant-card-bordered.ant-card-hoverable {
    margin: 20px;
  }
  .news-product-new {
    .ant-card.ant-card-bordered.ant-card-hoverable {
      display: flex;
      height: 88px;
      justify-content: center;
      align-items: center;
    }
    .ant-card-body {
      height: 88px;
      padding: 24px 5px;
    }
  }
  .news-img {
    width: 100%;
    img {
      width: 100%;
    }
  }
`;
// const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
// const onOpenChange = keys => {
//     const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
//     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
//       setOpenKeys(keys);
//     } else {
//       setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
//     }
//   };
const Demo = () => (
  <Tabs defaultActiveKey="1" centered>
    <TabPane tab="TIN MỚI" key="1">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={17}>
          <div className="news-card-title">
            <Card
              hoverable
              cover={
                <img
                  alt="example"
                  src="https://images.fpt.shop/unsafe/fit-in/490x326/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/8/9/637641323761238139_so-sanh-iphone-13-pro-max-va-iphone-12-pro-max-8.jpg"
                />
              }
            >
              <Meta
                title="Tổng hợp thông tin iphone 13: Những gì bạn muốn biết về siêu phẩm của Apple"
                description=" 5 - 3 giờ trước"
              />
            </Card>
          </div>
          <div className="news-list-card-title">
            <Card
              hoverable
              style={{ display: "flex" }}
              cover={
                <img
                  alt="example"
                  src="https://images.fpt.shop/unsafe/fit-in/120x80/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/8/12/637643963999583138_z-fold-flip-3-uudai-6.jpg"
                />
              }
            >
              <Meta title="Cách thức " description=" 5 - 3 giờ trước" />
            </Card>
            <Card
              hoverable
              style={{ display: "flex" }}
              cover={
                <img
                  alt="example"
                  src="https://images.fpt.shop/unsafe/fit-in/120x80/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/8/12/637643633515922391_samsung-galaxy-z-flip-3-cover.jpg"
                />
              }
            >
              <Meta title="Cách thức " description=" 5 - 3 giờ trước" />
            </Card>
            <Card
              hoverable
              style={{ display: "flex" }}
              cover={
                <img
                  alt="example"
                  src="https://images.fpt.shop/unsafe/fit-in/120x80/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/8/11/637643231573070713_samsung-galaxy-zfold-3-cover.jpg"
                />
              }
            >
              <Meta title="Cách thức " description=" 5 - 3 giờ trước" />
            </Card>
            <Card
              hoverable
              style={{ display: "flex" }}
              cover={
                <img
                  alt="example"
                  src="https://images.fpt.shop/unsafe/fit-in/120x80/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/8/11/637643137305288321_samsung-galaxy-zfold-3-fpt-cover.jpg"
                />
              }
            >
              <Meta title="Cách thức " description=" 5 - 3 giờ trước" />
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={7}>
          <div className="news-top">
            <p>Xem Nhiều</p>
          </div>
          <div className="news-list">
            <Menu
              mode="inline"
              // onOpenChange={onOpenChange}
              style={{ width: 256, padding: 10 }}
            >
              <Menu.Item key="1" style={{ paddingLeft: 0, margin: "20px 0px" }}>
                <Avatar
                  src=""
                  alt="1"
                  size="default"
                  style={{ backgroundColor: "#f56a00" }}
                >
                  1
                </Avatar>
                Jailbreak là gì? Có nên Jailbreak cho iPhone, iPad?
              </Menu.Item>
              <Menu.Item key="2" style={{ paddingLeft: 0, margin: "20px 0px" }}>
                <Avatar
                  src=""
                  alt="2"
                  size="default"
                  style={{ backgroundColor: "#7265e6" }}
                >
                  2
                </Avatar>
                Cổng Lightning là gì? Tìm hiểu về cổng kết nối Lightning của
                Apple
              </Menu.Item>
              <Menu.Item key="3" style={{ paddingLeft: 0, margin: "20px 0px" }}>
                <Avatar src="" alt="3" size="default">
                  3
                </Avatar>
                Snapchat là gì? Cách tải ứng dụng Snapchat cho điện thoại
              </Menu.Item>
              <Menu.Item key="4" style={{ paddingLeft: 0, margin: "20px 0px" }}>
                <Avatar src="" alt="4" size="default">
                  4
                </Avatar>
                Kính cường lực Corning Gorilla Glass là gì? Hiệu quả ra sao trên
                smartphone?
              </Menu.Item>
              <Menu.Item key="5" style={{ paddingLeft: 0, margin: "20px 0px" }}>
                <Avatar src="" alt="5" size="default">
                  5
                </Avatar>
                Đồng hồ thông minh smartwatch là gì? Có nên mua đồng hồ đeo tay
                thông minh không?
              </Menu.Item>
            </Menu>
          </div>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={17}>
          <Card
            hoverable
            style={{ width: "100%" }}
            cover={
              <img
                alt="example"
                src="https://images.fpt.shop/unsafe/fit-in/300x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/8/12/637644095545558638_faceplay.jpg"
              />
            }
          >
            <p className="news-title-tabs">Thủ Thuật - Mẹo Vặt</p>
            <Meta
              title="FacePlay: Cách tải miễn phí app ghép mặt vào video cổ trang trên Android"
              description="Nếu bạn đang quan tâm tới FacePlay, bài viết sẽ cung cấp cho bạn cách tải về app ghép mặt vào video cổ trang Trung Quốc đang rất hot trên mạng hiện nay."
            />
          </Card>
          <Card
            hoverable
            style={{ width: "100%" }}
            cover={
              <img
                alt="example"
                src="https://images.fpt.shop/unsafe/fit-in/300x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/8/12/637644095545558638_faceplay.jpg"
              />
            }
          >
            <p className="news-title-tabs">Thủ Thuật - Mẹo Vặt</p>
            <Meta
              title="FacePlay: Cách tải miễn phí app ghép mặt vào video cổ trang trên Android"
              description="Nếu bạn đang quan tâm tới FacePlay, bài viết sẽ cung cấp cho bạn cách tải về app ghép mặt vào video cổ trang Trung Quốc đang rất hot trên mạng hiện nay."
            />
          </Card>
        </Col>
      </Row>
    </TabPane>
    <TabPane tab="KHUYẾN MÃI" key="2">
      KHUYẾN MÃI
    </TabPane>
    <TabPane tab="THỦ THUẬT" key="3">
      THỦ THUẬT
    </TabPane>
    <TabPane tab="FOR GAMERS" key="4">
      FOR GAMERS
    </TabPane>
    <TabPane tab="VIDEO HOT" key="5">
      VIDEO HOT
    </TabPane>
    <TabPane tab="ĐÁNG GIÁ - TƯ VẤN" key="6">
      ĐÁNG GIÁ - TƯ VẤN
    </TabPane>
    <TabPane tab="APP & GAME" key="7">
      APP & GAME
    </TabPane>
    <TabPane tab="SỰ KIỆN" key="8">
      SỰ KIỆN
    </TabPane>
  </Tabs>
);
function News(props) {
  // const [openKeys, setOpenKeys] = React.useState(['sub1']);
  return (
    <NewsPage>
      <div className="news-title">
        <p className="TIN MỚI">TIN MỚi</p>
      </div>
      <Demo />
    </NewsPage>
  );
}

News.propTypes = {};

export default News;
