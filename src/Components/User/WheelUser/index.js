/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Col, Image, Row, Card } from "antd";
import {
  AliwangwangOutlined,
  GiftOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";

const WheetUserItem = styled.div`
  font-family: sans-serif;
  text-align: center;
  background: #7794ff;
  .frame,
  .sticks {
    fill: #fff;
  }

  .winIndicator {
    fill: #fff;
  }

  .wheelMiddle {
    fill: $middleColor;
  }

  .luckywheel {
    margin: 40px auto;
    width: 50%;
    height: 50%;
  }

  .btn,
  .btn:visited {
    font-weight: 800;
    margin: 10px;
    height: 40px;
    width: 140px;
    box-shadow: 4px 4px 20px 0 #cc4c45;
    border-radius: 0;
    border: 2px solid #000;
    background-color: #fff;
    color: #000;
  }

  .btn:hover,
  .btn:active {
    color: #fff;
    background-color: #000;
    border: none;
    text-decoration: none;
    box-shadow: 4px 4px 5px 0 #cc4c45;
  }
  i {
    font-size: 60px;
    transform: rotate(91deg);
    color: #fff;
    top: 13%;
    z-index: 18;
    position: absolute;
    left: 30%;
    text-shadow: 2px 2px #0000004f;
  }
`;
function WheelUser(props) {
  const [modal, setModal] = useState(false);
  const [list, setList] = useState([
    "Macbook Air Pro",
    "Tai Nghe Asus",
    "Iphone 12 Pro Max",
    "Chuột Asus",
    "Sale 50%",
    "Tai Nghe Asus",
    "Macbook Air Pro",
    "Tai Nghe Asus",
    "Iphone 12 Pro Max",
    "Chuột Asus",
    "Iphone 12 Pro Max",
    "Bàn Phím ASUS",
  ]);
  const [rotate, setRotate] = useState(0);
  const [easeOut, setEaseOut] = useState(0);
  const [angle, setAngle] = useState(0);
  const [top, setTop] = useState(null);
  const [offset, setOffset] = useState(null);
  // const [net, setNet] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    renderWheel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setModalVisible = (modalVisible) => {
    setModal(modalVisible);
  };

  const renderWheel = () => {
    let numOptions = list.length;

    let arcSize = (2 * Math.PI) / numOptions;

    setAngle({
      angle: arcSize,
    });

    topPosition(numOptions, arcSize);

    // let angle = 0;
    // for (let i = 0; i < numOptions; i++) {
    //     let text = list[i];
    //     // renderSector(i + 1, text, angle, arcSize, getColor());
    //     angle += arcSize;
    // }
  };

  const topPosition = (num, angle) => {
    let topSpot = null;
    let degreesOff = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    setTop({
      top: topSpot - 1,
    });
    setOffset({
      offset: degreesOff,
    });
  };

  const spin = () => {
    let randomSpin = Math.floor(Math.random() * 900) + 500;

    setRotate({
      rotate: randomSpin,
    });
    setEaseOut({
      easeOut: 5,
    });
    setSpinning({
      spinning: true,
    });

    setTimeout(() => {
      getResult(randomSpin);
    }, 5000);
  };
  const getResult = (spin) => {
    let netRotation = ((spin % 360) * Math.PI) / 180;
    let travel = netRotation + offset.offset;
    let count = top.top + 1;
    while (travel > 0) {
      travel = travel - angle.angle;
      count--;
    }
    let result;
    if (count >= 0) {
      result = count;
    } else {
      result = list.length + count;
    }

    // setNet(netRotation);
    setResult(result);
  };
  const reset = () => {
    setRotate({
      rotate: 0,
    });
    setEaseOut({
      easeOut: 0,
    });
    setResult(null);
    setSpinning({
      spinning: false,
    });
  };

  const getResultArray = () => {
    return (
      <Modal
        title="Chi Tiết Giải Thưởng"
        centered
        style={{ top: 20 }}
        visible={result}
        onOk={() => setResult(null)}
        onCancel={() => setResult(null)}
      >
        <span id="result">{list[result]}</span>
      </Modal>
    );
  };

  return (
    <WheetUserItem>
      <Modal
        title="Chi Tiết Giải Thưởng"
        centered
        style={{ top: 20 }}
        visible={modal}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="Ịphone 12 Pro Max"
              bordered={false}
              style={{ background: "#14c187" }}
            >
              <Image
                width={100}
                src="https://pngimg.com/uploads/iphone_12/small/iphone_12_PNG36.png"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Macbook Art Pro"
              bordered={false}
              style={{ background: "#ba4d4e" }}
            >
              <Image
                width={100}
                src="http://pngimg.com/uploads/macbook/small/macbook_PNG101753.png"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Tai Nghe Asus"
              bordered={false}
              style={{ background: "#1592e8" }}
            >
              <Image
                width={100}
                src="http://pngimg.com/uploads/headphones/small/headphones_PNG101964.png"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "15px" }}>
          <Col span={8}>
            <Card
              title="Chuột Asus"
              bordered={false}
              style={{ background: "#fc7800" }}
            >
              <Image
                width={100}
                src="http://pngimg.com/uploads/computer_mouse/small/computer_mouse_PNG7699.png"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Bàn Phím Asus"
              bordered={false}
              style={{ background: "#b015e8" }}
            >
              <Image
                width={100}
                src="http://pngimg.com/uploads/keyboard/small/keyboard_PNG101839.png"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Sale 50%"
              bordered={false}
              style={{ background: "#aac114" }}
            >
              <Image
                width={100}
                src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-sale-and-special-offer-png-image_3556966.jpg"
              />
            </Card>
          </Col>
        </Row>
      </Modal>
      <div className="luckywheel">
        <i className="fas fa-location-arrow"></i>
        <svg
          viewBox="0 0 730 730"
          style={{
            WebkitTransform: `rotate(${rotate.rotate}deg)`,
            WebkitTransition: `-webkit-transform ${easeOut.easeOut}s ease-out`,
          }}
        >
          <g className="wheel">
            <circle className="frame" cx={365} cy={365} r="347.6" />
            <g className="sticks">
              <rect x="360.4" width="9.3" height="24.33" rx={4} ry={4} />
              <rect
                x="352.8"
                y="713.2"
                width="24.3"
                height="9.27"
                rx={4}
                ry={4}
                transform="translate(1082.8 352.8) rotate(90)"
              />
              <rect
                x="176.4"
                y="54.8"
                width="24.3"
                height="9.27"
                rx={4}
                ry={4}
                transform="translate(145.8 -133.6) rotate(60)"
              />
              <rect
                x="529.2"
                y="665.9"
                width="24.3"
                height="9.27"
                rx={4}
                ry={4}
                transform="translate(851.4 -133.6) rotate(60)"
              />
              <rect
                x="47.3"
                y="183.9"
                width="24.3"
                height="9.27"
                rx={4}
                ry={4}
                transform="translate(102.3 -4.5) rotate(30)"
              />
              <rect
                x="658.4"
                y="536.8"
                width="24.3"
                height="9.27"
                rx={4}
                ry={4}
                transform="translate(360.5 -262.7) rotate(30)"
              />
              <rect y="360.4" width="24.3" height="9.27" rx={4} ry={4} />
              <rect
                x="705.7"
                y="360.4"
                width="24.3"
                height="9.27"
                rx={4}
                ry={4}
              />
              <rect
                x="47.3"
                y="536.8"
                width="24.3"
                height="9.27"
                rx={4}
                ry={4}
                transform="translate(-262.7 102.3) rotate(-30)"
              />
              <rect
                x="658.4"
                y="183.9"
                width="24.3"
                height="9.27"
                rx={4}
                ry={4}
                transform="translate(-4.5 360.5) rotate(-30)"
              />
              <rect
                x="176.4"
                y="665.9"
                width="24.3"
                height="9.27"
                rx={4}
                ry={4}
                transform="translate(-486.4 498.6) rotate(-60)"
              />
              <rect
                x="529.2"
                y="54.8"
                width="24.3"
                height="9.27"
                rx={4}
                ry={4}
                transform="translate(219.2 498.6) rotate(-60)"
              />
            </g>
            <g className="sectors">
              <path
                id="_1"
                d="M365,365V35.9A328.1,328.1,0,0,0,200.5,80Z"
                transform="translate(0)"
              ></path>
              <path
                id="_2"
                d="M365,365,529.5,80A328.1,328.1,0,0,0,365,35.9Z"
                transform="translate(0)"
              />
              <path
                id="_3"
                d="M365,365,650,200.5A328.5,328.5,0,0,0,529.5,80Z"
                transform="translate(0)"
              />
              <path
                id="_4"
                d="M365,365H694.1A328.1,328.1,0,0,0,650,200.5Z"
                transform="translate(0)"
              />
              <path
                id="_5"
                d="M365,365,650,529.5A328.1,328.1,0,0,0,694.1,365Z"
                transform="translate(0)"
              />
              <path
                id="_6"
                d="M365,365,529.5,650A328.5,328.5,0,0,0,650,529.5Z"
                transform="translate(0)"
              />
              <path
                id="_7"
                d="M365,365V694.1A328.1,328.1,0,0,0,529.5,650Z"
                transform="translate(0)"
              />
              <path
                id="_8"
                d="M365,365,200.5,650A328.1,328.1,0,0,0,365,694.1Z"
                transform="translate(0)"
              />
              <path
                id="_9"
                d="M365,365,80,529.5A328.5,328.5,0,0,0,200.5,650Z"
                transform="translate(0)"
              />
              <path
                id="_10"
                d="M365,365H35.9A328.1,328.1,0,0,0,80,529.5Z"
                transform="translate(0)"
              />
              <path
                id="_11"
                d="M365,365,80,200.5A328.1,328.1,0,0,0,35.9,365Z"
                transform="translate(0)"
              />
              <path
                id="_12"
                d="M365,365,200.5,80A328.5,328.5,0,0,0,80,200.5Z"
                transform="translate(0)"
              />
            </g>
            <g className="middle">
              <g id="shadow-1" opacity="0.2">
                <circle cx="368.5" cy="368.5" r="54.5" />
              </g>
              <g className="wheelMiddle">
                <circle cx={365} cy={365} r="54.5" fill="#fff" />
              </g>
              <circle id="middle-3" cx={365} cy={365} r="11.6" fill="#ccc" />
            </g>
          </g>
          <g id="shadow-2" opacity="0.15">
            <path
              d="M46.9,372.5c0-181.7,147.4-329,329.1-329A327.3,327.3,0,0,1,556.3,97.2,327.3,327.3,0,0,0,365,35.9C183.3,35.9,35.9,183.3,35.9,365c0,115.2,59.2,216.5,148.8,275.3C101.3,580.6,46.9,482.9,46.9,372.5Z"
              transform="translate(0)"
            />
          </g>
        </svg>
      </div>
      <div className="btn-group" style={{ marginBottom: "20px" }}>
        {spinning.spinning ? (
          <Button
            type="danger"
            size="large"
            id="reset"
            icon={<RedoOutlined />}
            style={{ width: "100px" }}
            onClick={reset}
          >
            Đặt lại
          </Button>
        ) : (
          <Button
            id="spin"
            size="large"
            icon={<AliwangwangOutlined />}
            style={{ width: "100px" }}
            onClick={spin}
          >
            Quay
          </Button>
        )}
        <Button
          icon={<GiftOutlined />}
          type="primary"
          size="large"
          onClick={() => setModalVisible(true)}
          style={{ marginLeft: "20px" }}
        >
          Chi tiết quà tặng
        </Button>
      </div>
      {result ? getResultArray() : ""}
    </WheetUserItem>
  );
}

WheelUser.propTypes = {};

export default WheelUser;
