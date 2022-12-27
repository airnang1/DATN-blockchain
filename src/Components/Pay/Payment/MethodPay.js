import React, { useState } from "react";
import { Button, Col, Row, Tooltip } from "antd";
import { content_pay_btn } from "../../../assets/fake-data";

const handleTextInfoBtn = (i) => {
  if (i === 2) {
    return (
      <span>
        Nhấp vào để thanh toán Online <i className="fad fa-hand-pointer"></i>
      </span>
    );
  } else if (i === 3) {
    return (
      <span>
        Nhấp vào để thanh toán khi nhận hàng{" "}
        <i className="fad fa-hand-pointer"></i>
      </span>
    );
  } else {
    return <span>Đã vô hiệu hóa</span>;
  }
};
function MethodPay(props) {
  const { handleChangeMethodPayProduct, handleShowPayTable, payMethodActive } =
    props;

  const [activeBtn, setActiveBtn] = useState(null);

  const handleBtnCheckPay = (i, method) => {
    setActiveBtn(i);
    handleChangeMethodPayProduct(method);
    handleShowPayTable(method);
  };

  const handleRenderUiBtnPay = content_pay_btn.map((item, index) => (
    <Col className="gutter-row products-pay__col" span={4} key={index}>
      <Tooltip
        placement="top"
        title={() => handleTextInfoBtn(index)}
        color={"#2db7f5"}
      >
        <Button
          size="large"
          style={{
            width: index === 3 ? 227 : 200,
            background: activeBtn === index && "rgb(0 100 172)",
            color: activeBtn === index && "#fff",
          }}
          className="btn-active"
          disabled={index === 1 || index === 0 ? true : false}
          onClick={() => handleBtnCheckPay(index, item)}
        >
          {payMethodActive && payMethodActive.key === item ? (
            <img
              alt=""
              src={payMethodActive.image}
              className="method-payment"
            />
          ) : (
            item
          )}
        </Button>
      </Tooltip>
    </Col>
  ));
  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      className="payment__row-method"
    >
      <Col className="gutter-row" span={5}>
        <p className="payment__name">Phương thức thanh toán</p>
      </Col>
      {handleRenderUiBtnPay}
    </Row>
  );
}

MethodPay.propTypes = {};

export default MethodPay;
