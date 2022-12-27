import React, { useEffect, useState } from "react";

import { Col, List, Button, Rate, InputNumber, Checkbox, Radio } from "antd";
import ModalAddress from "../ModalAdress";
import { useDispatch } from "react-redux";
import {
  changeRateStar,
  handleSetIsLoad,
  onChangePriceProduct,
} from "../../../../Store/Reducer/searchProductCategory";
import {
  handleSetLoadingCategory,
  handleSetProducts,
  useGetProductsToPriceMutation,
  useGetProductsToStarMutation,
  useGetProductsToTrademarkQuery,
} from "../../../../Store/Reducer/categoryReducer";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

function ProductPortfolio(props) {
  const dispatch = useDispatch();
  const [activeButton, setactiveButton] = useState(0);
  const [activeSearch, setactiveSearch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [priceBelow, setPriceBelow] = useState(0);
  const [priceHight, setPriceHight] = useState(0);
  const [isSetAddress, setIsSetAddress] = useState(false);

  const {
    data1,
    data2,
    data3,
    data4,
    data5,
    data10,
    changeProductSmartPhone,
    changeProductCommonPhone,
    changeAllProduct,
    changeProductLandline,
    trademark,
    keyword,
    category,
  } = props;

  const [trademarkData, setTrademarkData] = useState({
    trademarkName: "",
    category: "",
    numPage: 1,
  });
  const [getProductsToStar, { error }] = useGetProductsToStarMutation();
  const history = useHistory();
  const [getProductsToPrice, { error2 }] = useGetProductsToPriceMutation();

  // eslint-disable-next-line no-unused-vars
  const { error3, isLoading, data } = useGetProductsToTrademarkQuery(
    trademarkData,
    {
      skip: trademarkData.trademarkName === "" && trademarkData.category === "",
    }
  );

  useEffect(() => {
    if (data) {
      dispatch(handleSetProducts(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error || error2 || error3) {
      toast.error(`Fail 😓`);
    }
  }, [error, error2, error3]);

  function onChangeCheckBox(e, item, index) {
    history.push(`?page=${1}`);
    const numPage = history.location.search.slice(6) || 1;
    dispatch(handleSetLoadingCategory(true));
    setactiveSearch(index);
    setTrademarkData({ trademarkName: item, category, numPage });
  }

  function onChange(e) {}

  function onChangePriceBelow(value) {
    setPriceBelow(value);
  }

  function onChangePriceHight(value) {
    setPriceHight(value);
  }

  const ChangePriceButtonInput = (x, y) => {
    if (category) {
      dispatch(handleSetLoadingCategory(true));
      getProductsToPrice({
        price: {
          minPrice: x,
          maxPrice: y,
        },
        keyword,
        category,
      });
    } else {
      dispatch(handleSetIsLoad(true));
      dispatch(
        onChangePriceProduct({
          price: {
            minPrice: x,
            maxPrice: y,
          },
          keyword,
        })
      );
    }
  };

  const changeStatusButton = (item, index) => {
    if (data1.length === 4) {
      switch (item) {
        case data1[0]:
          setactiveButton(index);
          changeAllProduct();
          break;
        case data1[1]:
          changeProductSmartPhone();
          setactiveButton(index);
          break;
        case data1[2]:
          changeProductCommonPhone();
          setactiveButton(index);
          break;
        case data1[3]:
          changeProductLandline();
          setactiveButton(index);
          break;
        default:
          break;
      }
    } else {
      switch (item) {
        case data1[0]:
          setactiveButton(index);
          changeAllProduct();
          break;
        case data1[1]:
          changeProductCommonPhone();
          setactiveButton(index);
          break;
        case data1[2]:
          changeProductLandline();
          setactiveButton(index);
          break;
        default:
          break;
      }
    }
  };

  const changeEvaluate = (title, index) => {
    if (category) {
      if (keyword) {
        switch (title) {
          case "Từ 5 sao":
            dispatch(handleSetLoadingCategory(true));
            getProductsToStar({ star: 5, keyword, category });
            break;
          case "Từ 4 sao":
            dispatch(handleSetLoadingCategory(true));
            getProductsToStar({ star: 4, keyword, category });
            break;
          case "Dưới 3 sao":
            dispatch(handleSetLoadingCategory(true));
            getProductsToStar({ star: 3, keyword, category });
            break;
          default:
            break;
        }
      }
    } else {
      if (keyword) {
        switch (title) {
          case "Từ 5 sao":
            dispatch(handleSetIsLoad(true));
            dispatch(changeRateStar({ star: 5, keyword, category }));
            break;
          case "Từ 4 sao":
            dispatch(handleSetIsLoad(true));
            dispatch(changeRateStar({ star: 4, keyword, category }));
            break;
          case "Dưới 3 sao":
            dispatch(handleSetIsLoad(true));
            dispatch(changeRateStar({ star: 3, keyword, category }));
            break;
          default:
            break;
        }
      }
    }
  };

  const changePriceButton = (item, index) => {
    if (category) {
      if (keyword) {
        switch (item.title) {
          case "Dưới 500.000":
            dispatch(handleSetLoadingCategory(true));
            getProductsToPrice({
              price: item.price,
              keyword,
              category,
            });

            break;
          case "Từ 500.000 đến 5.000.000":
            dispatch(handleSetLoadingCategory(true));
            getProductsToPrice({
              price: item.price,
              keyword,
              category,
            });
            break;
          case "Từ 5.000.000 đến 22.500.000":
            dispatch(handleSetLoadingCategory(true));
            getProductsToPrice({
              price: item.price,
              keyword,
              category,
            });
            break;
          case "Trên 22.500.000":
            dispatch(handleSetLoadingCategory(true));
            getProductsToPrice({
              price: item.price,
              keyword,
              category,
            });
            break;
          default:
            break;
        }
      }
    } else {
      if (keyword) {
        switch (item.title) {
          case "Dưới 500.000":
            dispatch(handleSetIsLoad(true));
            dispatch(
              onChangePriceProduct({
                price: item.price,
                keyword,
              })
            );
            break;
          case "Từ 500.000 đến 5.000.000":
            dispatch(handleSetIsLoad(true));
            dispatch(
              onChangePriceProduct({
                price: item.price,
                keyword,
              })
            );
            break;
          case "Từ 5.000.000 đến 22.500.000":
            dispatch(handleSetIsLoad(true));
            dispatch(
              onChangePriceProduct({
                price: item.price,
                keyword,
              })
            );
            break;
          case "Trên 22.500.000":
            dispatch(handleSetIsLoad(true));
            dispatch(
              onChangePriceProduct({
                price: item.price,
                keyword,
              })
            );
            break;
          default:
            break;
        }
      }
    }
  };
  // Add Adress

  const onChangeRadio = (e) => {
    setIsSetAddress(!e.target.value);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
    setIsSetAddress(false);
  };

  const ChangePriceReset = (x, y) => {
    setPriceBelow(x);
    setPriceHight(y);
    // ChangePriceButtonInput(x, y);
  };
  return (
    <Col
      className="gutter-row product-optional"
      span={5}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRight: "1px solid #eee",
      }}
    >
      <List
        size="small"
        header={<div>DANH MỤC SẢN PHẨM</div>}
        bordered
        dataSource={data1}
        renderItem={(item, index) => (
          <List.Item>
            <Button
              type="text"
              onClick={() => changeStatusButton(item, index)}
              disabled={index === activeButton ? true : false}
            >
              {item}
            </Button>
          </List.Item>
        )}
      />
      <List
        size="small"
        header={<div>ĐỊA CHỈ NHẬN HÀNG</div>}
        bordered
        className="mobile-address"
        dataSource={data2}
        renderItem={(item) => (
          <List.Item>
            {item}
            <Button type="link" onClick={showModal}>
              NHẬP ĐỊA CHỈ
            </Button>
          </List.Item>
        )}
      />
      <ModalAddress
        visible={visible}
        loading={loading}
        handleCancel={handleCancel}
        handleOk={handleOk}
        onChangeRadio={onChangeRadio}
        isSetAddress={isSetAddress}
      />
      <List
        size="small"
        header={<div>DỊCH VỤ</div>}
        bordered
        className="mobile-service"
        dataSource={data3}
        renderItem={(item) => (
          <List.Item>
            <Checkbox onChange={onChange}>{item}</Checkbox>
          </List.Item>
        )}
      />
      <List
        size="small"
        header={<div>ĐÁNH GIÁ</div>}
        bordered
        className="mobile-evaluate"
        dataSource={data4}
        renderItem={(item, index) => (
          <List.Item onClick={() => changeEvaluate(item.title, index)}>
            <Rate disabled defaultValue={item.rate} />
            <p>{item.title}</p>
          </List.Item>
        )}
      />
      <List
        size="small"
        header={<div>GIÁ</div>}
        bordered
        className="mobile-price"
        dataSource={data5}
        renderItem={(item, index) => (
          <List.Item>
            <Button
              type="dashed"
              onClick={() => changePriceButton(item, index)}
            >
              {item.title}
            </Button>
          </List.Item>
        )}
      />
      <div className="mobile-price-clause">
        <p>Chọn Khoảng Giá</p>
        <InputNumber
          style={{
            width: 150,
          }}
          defaultValue="0"
          min="0"
          max="100000000"
          onChange={onChangePriceBelow}
          stringMode
          value={priceBelow}
        />
        ~
        <InputNumber
          style={{
            width: 150,
          }}
          defaultValue="100000"
          min="100000"
          max="1000000000"
          onChange={onChangePriceHight}
          stringMode
          value={priceHight}
        />
        <Button onClick={() => ChangePriceButtonInput(priceBelow, priceHight)}>
          Áp Dụng
        </Button>
        <Button onClick={() => ChangePriceReset(0, 0)}>Đặt Lại</Button>
      </div>

      {keyword === "all" ? (
        <List
          size="small"
          header={<div>THƯƠNG HIỆU</div>}
          bordered
          className="mobile-ROM"
          dataSource={trademark !== null ? trademark : []}
          renderItem={(item, index) => (
            <List.Item>
              <Checkbox
                onChange={(e) => onChangeCheckBox(e, item._id, index)}
                checked={index === activeSearch ? true : false}
              >
                {item._id}
              </Checkbox>
            </List.Item>
          )}
        />
      ) : (
        ""
      )}

      <List
        size="small"
        header={<div>GIAO HÀNG</div>}
        bordered
        className="mobile-delivery"
        dataSource={data10}
        renderItem={(item) => (
          <List.Item>
            <Radio>{item}</Radio>
          </List.Item>
        )}
      />
    </Col>
  );
}

ProductPortfolio.propTypes = {};

export default ProductPortfolio;
