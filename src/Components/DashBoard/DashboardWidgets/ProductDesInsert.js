/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import {
  Affix,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Tooltip,
} from "antd";
import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import UploadImageCategory from "./UploadImageCategory";
import Slider from "react-slick";
import { Link, Prompt } from "react-router-dom";
import { setLoadingAction } from "../../../Store/Reducer/loadingReducer";
import {
  handleUpdateIsEdit,
  handleUpdateLogoToProduct,
  updateDetailToProduct,
} from "../../../Store/Reducer/productConfig";
import { imageUpload } from "../../../utils/imageUpload";
import { isEmptyObjectAll, newObjectId, numberWithCommas } from "../../../utils";

const clone = (obj) => Object.assign({}, obj);

const renameKey = (object, key, newKey) => {
  const clonedObj = clone(object);
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;

  return clonedObj;
};

function ProductDesInsert(props) {
  const {
    input_feild,
    select_field,
    image_field,
    handleCreateProductList,
    isShow,
    handleOkProductConfig,
    handleCancelProductConfig,
    isModalVisible,
    setVaration,
    varation,
    product_config,
    setProductVaratior,
    productVaratior,
    handleImportImgPush,
    setVal,
    setDescription,
    setInputConfig,
    setLogo,
    indexProduct,
    setIndexProduct,
    hanldeImportProductToDB,
    formHarlObject,
    handleResetProductConfig,
    addData,
    description,
    inputConfig,
    handleSetImageField,
    handleSetValueInputFieldUpdate,
    handlePassingSelectProductConfig,
    isEdit,
    setIndexCategory,
    indexCategory,
    isCheckCreate,
    setIsCheckCreate,
  } = props;

  const dispatch = useDispatch();
  const [componentSize, setComponentSize] = useState("default");
  const [activeImg, setactiveImg] = useState(null);
  const [isShowInput, setIsShowInput] = useState(false);
  const [isShowSelect, setIsShowSelect] = useState(false);
  const [isShowImage, setIsShowImage] = useState(false);
  const [categoryProduct, setCategoryProduct] = useState(null);
  const [inputElement, setInputElement] = useState("");

  const inputRef = useRef([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: product_config.image[indexProduct]
      ? product_config.image[indexProduct].image.length <= 3
        ? product_config.image[indexProduct].image.length
        : 3
      : 3,
    slidesToScroll: 3,
  };

  useEffect(() => {
    return () => {
      handleResetProductConfig();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      dispatch(handleUpdateIsEdit());
    };
  }, [dispatch]);

  useEffect(() => {
    setactiveImg(indexProduct);
  }, [indexProduct]);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleSetActiveCategoryImg = (index) => {
    setIndexCategory(index);
    setLogo(image_field[index].value);
    setProductVaratior({
      ...productVaratior,
      logo: image_field[index].value,
    });
    dispatch(handleUpdateLogoToProduct(image_field[index].value));
  };

  const handleChangeDesProduct = (e, editor) => {
    const data = editor.getData();
    setVal(data);
    dispatch(updateDetailToProduct(data));
  };

  const handleImportImg = async (e) => {
    const file = e.target.files[0];
    dispatch(setLoadingAction(true));
    if (file) {
      const media = await imageUpload(file);
      setVaration({ ...varation, image: media });
      dispatch(setLoadingAction(false));
      e.target.value = null;
    } else {
      alert("Upload file failed! ");
    }
  };

  useEffect(() => {
    const options = [...input_feild, ...select_field];
    const optionsChecked = [...resultInputConfig, ...resultDescription];
    const check = options.length === optionsChecked.length;
    if (
      product_config.image.length &&
      check &&
      product_config.logo &&
      product_config.detail
    ) {
      setIsCheckCreate(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    input_feild,
    product_config,
    resultDescription,
    resultInputConfig,
    select_field,
  ]);

  const handleSetValueInputField = (e, key) => {
    const contact = renameKey(
      {
        key: e.target.value.trim(),
      },
      "key",
      key
    );

    setInputConfig({ ...inputConfig, ...contact });
  };

  const handleChangeSelect = (value, key) => {
    if (product_config.status === "update") {
      handlePassingSelectProductConfig(key, value);
    }
    const contact = renameKey(
      {
        key: value,
      },
      "key",
      key
    );
    if (key === "category") {
      setCategoryProduct(value);
    }
    setDescription({ ...description, ...contact });
  };

  var resultInputConfig = Object.keys(inputConfig).map((key) => [
    key,
    inputConfig[key],
  ]);

  var resultDescription = Object.keys(description).map((key) => [
    key,
    description[key],
  ]);

  const importImg = (img, id) => {
    product_config.image.forEach((item) => {
      if (item._id === id) {
        handleImportImgPush({
          _id: id,
          image: [...item.image, { _id: newObjectId(), data: img }],
        });
      }
    });
  };

  const handleRemoveImage = (item, idImg) => {
    const result = product_config.image[indexProduct].image.filter(
      (ar) => ar._id !== item._id
    );
    handleImportImgPush({
      _id: idImg,
      image: result,
    });
    item.image && URL.revokeObjectURL(item.image);
  };

  const handleSetIndexProduct = (index) => {
    setIndexProduct(index);
    setactiveImg(index);
  };

  function cancel(e) {}

  const handleFilterPropertyValues = () => {
    const defaultTitle = [];
    const descTitle = [];

    if (product_config.status === "update") {
      var resultInputConfig = Object.keys(product_config).map((key) => [
        key,
        product_config[key],
      ]);

      var resultInputFeild = input_feild.map((item) => {
        const result = [item.value, ""];
        return result;
      });

      function remove_duplicates_safe(arr) {
        var seen = {};
        var ret_arr = [];
        for (var i = 0; i < arr.length; i++) {
          if (!(arr[i][0] in seen)) {
            ret_arr.push(arr[i]);
            seen[arr[i][0]] = true;
          }
        }
        return ret_arr;
      }

      remove_duplicates_safe([
        ...resultInputConfig,
        ...resultInputFeild,
      ]).forEach((item) => {
        if (
          item[0] !== "_id" &&
          item[0] !== "description" &&
          item[0] !== "detail" &&
          item[0] !== "varation" &&
          item[0] !== "shop" &&
          item[0] !== "likes" &&
          item[0] !== "dislikes" &&
          item[0] !== "star" &&
          item[0] !== "sold" &&
          item[0] !== "createdAt" &&
          item[0] !== "updatedAt" &&
          item[0] !== "comments" &&
          item[0] !== "status" &&
          item[0] !== "logo" &&
          item[0] !== "__v" &&
          item[0] !== "image"
        ) {
          defaultTitle.push(item);
        } else if (item[0] === "description") {
          descTitle.push(
            Object.keys(item[1]).map((key) => [key, item[1][key]])
          );
        }
      });

      return { defaultTitle: defaultTitle, descTitle: descTitle };
    }
  };

  const value = handleFilterPropertyValues();

  const handleFocusInputChange = (e, name) => {
    setInputElement(name);
  };

  const handleRenderUIInputConfig = () => {
    if (isShowInput) {
      if (product_config.status === "update") {
        if (value.defaultTitle.length) {
          return value.defaultTitle.map((item, index) => (
            <Form.Item label={item[0]} key={index}>
              <Input
                value={item[1]}
                onChange={(e) => handleSetValueInputFieldUpdate(e, item[0])}
                onFocus={(e) => handleFocusInputChange(e, item[0])}
                id={item[0]}
              />
            </Form.Item>
          ));
        }
      }
      if (input_feild.length) {
        return input_feild.map((item, index) => (
          <Form.Item label={item.value} key={index}>
            <Input
              placeholder={item.value}
              onChange={(e) => handleSetValueInputField(e, item.value)}
              onFocus={(e) => handleFocusInputChange(e, item.value)}
              id={item.value}
            />
          </Form.Item>
        ));
      }
    }
  };

  const handleRenderUIInputSelectDemo = () => {
    if (product_config.status === "update") {
      const inputConfigSelectConfig = [
        ...value.defaultTitle,
        ...value.descTitle[0],
      ];
      return demoInputSelectUI(inputConfigSelectConfig);
    } else {
      return demoInputSelectUI([...resultInputConfig, ...resultDescription]);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      const arrayCheck = [];
      if (product_config.status === "update") {
        const inputConfigSelectConfig = [
          ...value.defaultTitle,
          ...value.descTitle[0],
        ];
        arrayCheck.push(inputConfigSelectConfig);
      } else {
        arrayCheck.push([...resultInputConfig, ...resultDescription]);
      }

      if (arrayCheck[0].length) {
        inputRef.current = inputRef.current.slice(0, arrayCheck[0].length);
        inputRef.current.forEach((ele) => {
          if (ele) {
            const inputId = ele.getAttribute("id");
            if (inputId === inputElement) {
              ele.style.color = "#f63c3c";
              ele.style.border = "1px solid";
              ele.style.borderRadius = "3px";
              ele.style.padding = "3px";
              ele.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
              });
              ele.style.transition = "0.25s";
            } else {
              ele.style.color = "black";
              ele.style.border = "none";
              ele.style.padding = "0px";
            }
          }
        });
      }
    }
  }, [
    product_config.status,
    resultDescription,
    resultInputConfig,
    value,
    inputElement,
  ]);

  const demoInputSelectUI = (data) => {
    return data.map((item, index) =>
      item[1] ? (
        <div key={index} className="slider-product-config">
          {item[0] === "price" || item[0] === "priceOld" ? (
            <>
              <p
                className="key"
                id={item[0]}
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
              >
                {item[0]}:
              </p>
              <p className="value">
                {numberWithCommas(+item[1])}
                <sup
                  style={{
                    marginTop: "20px",
                  }}
                >
                  đ
                </sup>
              </p>
            </>
          ) : (
            <>
              <p
                className="key"
                id={item[0]}
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
              >
                {item[0]}:
              </p>
              <p className="value">{item[1]}</p>
            </>
          )}
        </div>
      ) : (
        ""
      )
    );
  };

  const handleLinkUpdateProduct = () => {
    if (product_config.status === "update") {
      return "/dashboard/widgets/list-all";
    } else {
      return "#";
    }
  };

  const handleRenderUiSelectConfig = () => {
    if (product_config.status === "update") {
      if (isShowSelect) {
        if (select_field.length) {
          if (value.descTitle[0].length) {
            return value.descTitle[0].map((des) =>
              select_field.map(
                (item, index) =>
                  des[0] === item.name && (
                    <Form.Item label={item.name} key={index}>
                      <Select
                        placeholder={item.description}
                        onChange={(value) =>
                          handleChangeSelect(value, item.name)
                        }
                        defaultValue={des[1]}
                        id={des[0]}
                        ref={(el) => (inputRef.current[index] = el)}
                        onFocus={(e) => handleFocusInputChange(e, des[0])}
                      >
                        {item &&
                          item.options.map((option, index) => (
                            <Select.Option key={index} value={option}>
                              {option}
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  )
              )
            );
          }
        }
      }
    } else {
      if (isShowSelect) {
        if (select_field.length) {
          return select_field.map((item, index) => (
            <Form.Item label={item.name} key={index}>
              <Select
                placeholder={item.description}
                onChange={(value) => handleChangeSelect(value, item.name)}
                id={item.name}
                onFocus={(e) => handleFocusInputChange(e, item.name)}
                ref={(el) => (inputRef.current[index] = el)}
              >
                {item &&
                  item.options.map((option, index) => (
                    <Select.Option key={index} value={option}>
                      {option}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          ));
        }
      }
    }
  };

  return (
    <div className="product-description-insert">
      <Prompt
        when={isEdit}
        message={(location, action) => {
          if (product_config.status === "update") {
            return location.pathname.startsWith(
              "/dashboard/widgets/update-product"
            )
              ? true
              : JSON.stringify({
                  header: "Confirm",
                  content:
                    "Dữ liệu sẽ không được lưu lại, Bạn có chắc muốn rời trang này không?",
                });
          } else {
            return location.pathname.startsWith(
              "/dashboard/widgets/create-product"
            )
              ? true
              : JSON.stringify({
                  header: "Confirm",
                  content:
                    "Dữ liệu sẽ không được lưu lại, Bạn có chắc muốn rời trang này không?",
                });
          }
        }}
      />
      <div className="panel-body">
        <div className="row">
          <div className="col-lg-6 panel-heading">Nhập thông tin sản phẩm</div>
          <div className="col-lg-6 panel-heading">Phần giao diện sản phẩm</div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              initialValues={{
                size: componentSize,
              }}
              onValuesChange={onFormLayoutChange}
              size="large"
            >
              <p className="input-field">Danh Sách Sản Phẩm</p>
              <Form.Item>
                {product_config.varation &&
                  product_config.varation.map((item, index) => (
                    <Tooltip
                      placement="top"
                      title={<span>{item.title}</span>}
                      key={index}
                    >
                      <div
                        className={`list-product-item-plus-list ${
                          activeImg === index ? "active" : ""
                        }`}
                        onClick={() => handleSetIndexProduct(index)}
                      >
                        <img
                          alt={item.title}
                          src={item.image}
                          style={{
                            width: "100%",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg";
                          }}
                        />
                      </div>
                    </Tooltip>
                  ))}
                <div
                  className="list-product-item-plus-list"
                  onClick={handleCreateProductList}
                >
                  <i className="fal fa-plus"></i>
                </div>
              </Form.Item>
              <Modal
                title="Tạo Danh Sách Sản Phẩm"
                visible={isModalVisible}
                onOk={handleOkProductConfig}
                onCancel={handleCancelProductConfig}
                okButtonProps={{
                  disabled: isEmptyObjectAll(varation),
                }}
              >
                <div className="row">
                  <div className="col-md-12">
                    <div className="text-title">
                      Nhập tên sản phẩm tượng trưng
                    </div>
                    <div className="product-config-title">
                      <Input
                        onChange={(e) =>
                          setVaration({
                            ...varation,
                            title: e.target.value,
                          })
                        }
                        value={varation.title}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="text-title">
                      Tải hình ảnh bằng địa chỉ URL
                    </div>
                    <div className="popup__img-url">
                      <Input
                        className="popup__img-url-input"
                        value={varation.image}
                        onChange={(e) =>
                          setVaration({
                            ...varation,
                            image: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="text-title">
                      Tải hình ảnh từ máy người dùng
                    </div>
                    <label
                      className="popup__upload config-img"
                      htmlFor="firstimg"
                    >
                      <div className="popup__photos">
                        <i className="fad fa-file-image" id="file-image"></i>
                      </div>
                      <input
                        type="file"
                        name=""
                        id="firstimg"
                        className="upload"
                        onChange={handleImportImg}
                      />
                    </label>
                  </div>
                  <div className="col-md-4">
                    <div className="text-title">Demo hình ảnh</div>
                    {varation.image && (
                      <img
                        src={varation.image}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg";
                        }}
                      />
                    )}
                  </div>
                </div>
              </Modal>
              {isShow ? (
                <>
                  <div
                    className="options-change"
                    onClick={() => setIsShowImage(!isShowImage)}
                  >
                    <p className="input-field">Hình Ảnh Sản Phẩm</p>
                    <i
                      className={`fal fa-chevron-${
                        isShowImage ? "down" : "up"
                      }`}
                    ></i>
                  </div>
                  {isShowImage ? (
                    <Form.Item>
                      <UploadImageCategory
                        importImg={importImg}
                        image_field={product_config.image[indexProduct]}
                        handleRemoveImage={handleRemoveImage}
                        styleChange={{
                          width: "100px",
                          height: "100px",
                        }}
                        handleSetImageField={handleSetImageField}
                        imageId="imageProductsId"
                      />
                    </Form.Item>
                  ) : (
                    ""
                  )}

                  <div
                    className="options-change"
                    onClick={() => setIsShowInput(!isShowInput)}
                  >
                    <p className="input-field">Phần Input</p>
                    <i
                      className={`fal fa-chevron-${
                        isShowInput ? "down" : "up"
                      }`}
                    ></i>
                  </div>
                  {handleRenderUIInputConfig()}

                  <div
                    className="options-change"
                    onClick={() => setIsShowSelect(!isShowSelect)}
                  >
                    <p className="input-field">Phần Options</p>
                    <i
                      className={`fal fa-chevron-${
                        isShowSelect ? "down" : "up"
                      }`}
                    ></i>
                  </div>
                  {handleRenderUiSelectConfig()}

                  <p className="input-field">Phần Hình Ảnh Category</p>
                  <Form.Item label="Danh mục hình ảnh">
                    {image_field.map((item, index) => (
                      <div
                        className="list-product-item-plus"
                        key={index}
                        style={{
                          border:
                            product_config.logo === item.value
                              ? "5px solid #0a8bba"
                              : indexCategory === index
                              ? "5px solid #0a8bba"
                              : "",
                        }}
                        onClick={() => handleSetActiveCategoryImg(index)}
                      >
                        <img
                          alt=""
                          src={item.value}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg";
                          }}
                        />
                      </div>
                    ))}
                  </Form.Item>
                  <p className="input-field">Phần Mô Tả Sản Phẩm</p>
                  <div className="show-box-description-product">
                    <div className="box-description-product">
                      <CKEditor
                        editor={ClassicEditor}
                        data={product_config.detail || addData}
                        onChange={handleChangeDesProduct}
                      />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </Form>
          </div>
          <div className="col-lg-6">
            {isShow && (
              <Affix offsetTop={60}>
                <div className="demo-config-product">
                  <p className="input-field">Danh Sách Sản Phẩm</p>
                  <Button
                    type="primary"
                    style={{
                      position: "absolute",
                      top: "3%",
                      right: "10%",
                      zIndex: 1,
                    }}
                    onClick={() =>
                      hanldeImportProductToDB({
                        category: categoryProduct,
                        status: product_config.status,
                      })
                    }
                    disabled={
                      product_config.status === "update"
                        ? !isEdit
                        : !isCheckCreate
                    }
                  >
                    <Link to={handleLinkUpdateProduct()}>
                      {product_config.status === "update"
                        ? "Cập nhật sản phẩm"
                        : "Chốt sản phẩm"}
                    </Link>
                  </Button>
                  {product_config.status === "update" ? (
                    <Button
                      type="ghost"
                      style={{
                        position: "absolute",
                        top: "3%",
                        right: "32%",
                        marginRight: 20,
                        zIndex: 1,
                      }}
                    >
                      <Link to="/dashboard/widgets/list-all">
                        Quay lại trang sản phẩm
                      </Link>
                    </Button>
                  ) : (
                    <Popconfirm
                      title="Bạn có đồng ý Reset lại sản phẩm này ?"
                      onConfirm={handleResetProductConfig}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="ghost"
                        danger
                        style={{
                          position: "absolute",
                          top: "3%",
                          right: "32%",
                          marginRight: 20,
                          zIndex: 1,
                        }}
                      >
                        Reset sản phẩm
                      </Button>
                    </Popconfirm>
                  )}

                  <div className="list-product-varation">
                    {product_config.varation &&
                      product_config.varation.map((item, index) => (
                        <div
                          className={`list-product ${
                            activeImg === index ? "active" : ""
                          }`}
                          key={index}
                          onClick={() => handleSetIndexProduct(index)}
                        >
                          <img
                            alt={item.title}
                            src={item.image}
                            className="image-file-input-varation"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg";
                            }}
                          />
                        </div>
                      ))}
                  </div>

                  <p className="input-field">Danh Sách Hình Ảnh</p>
                  <Slider {...settings}>
                    {product_config.image[indexProduct] &&
                      product_config.image[indexProduct].image.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="slider-product-config"
                            style={{}}
                          >
                            <img
                              alt=""
                              src={item.data}
                              style={{
                                width: "80%",
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg";
                              }}
                            />
                          </div>
                        )
                      )}
                  </Slider>
                  <p className="input-field">Thông Tin Sản Phẩm</p>
                  {handleRenderUIInputSelectDemo()}
                  <p className="input-field">Thông Tin Sản Phẩm Chi Tiết</p>
                  <div className="product-detail">
                    {parse(product_config.detail || addData)}
                  </div>
                </div>
              </Affix>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductDesInsert);
