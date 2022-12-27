/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import ProductsDescription from "./ProductsDescription";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { mobilesSelector } from "../../../Store/Reducer/mobile_api";
import { laptopsSelector } from "../../../Store/Reducer/laptop_api";
import { tabletsSelector } from "../../../Store/Reducer/tablet_api";
import {
  deleteInputFieldApi,
  getInputField,
  InputFieldsSelector,
  insertInputField,
  updateInputField,
} from "../../../Store/Reducer/input_field";

import {
  deleteImageFieldApi,
  getImageField,
  ImageFieldsSelector,
  insertImageField,
} from "../../../Store/Reducer/config_input_image";
import {
  deleteSelectFieldApi,
  getSelectField,
  insertSelectField,
  SelectFieldsSelector,
  updateSelectField,
} from "../../../Store/Reducer/select_field";
import {
  handleCreateProductConfig,
  handleInsertDataToProductConfig,
  handleInsertProductConfig,
  handlePushImgProductConfig,
  handleResetProductConfigChange,
  handleUpdateProductConfigChange,
  productConfigSelector,
} from "../../../Store/Reducer/productConfig";
import { message } from "antd";
import { useParams } from "react-router-dom";

import {
  commentsUserSelector,
  getCommentsToStore,
} from "../../../Store/Reducer/comments_user";
import {
  searchProductToDB,
  searchSimilarSelector,
} from "../../../Store/Reducer/searchSimilar";
// import { handleInsertProduct } from '../../../Store/Reducer/productsReducer';
import { setLoadingAction } from "../../../Store/Reducer/loadingReducer";
import { usePostProductMutation } from "../../../Store/Reducer/productsReducer";
import { toast } from "react-toastify";
import {
  getProductToPagination,
  productsDBSelector,
  removeProductByID,
  updateDataProductToDB,
} from "../../../Store/Reducer/productsDBReducer";
import {
  getProductApi,
  handleUpdateIsLoading,
  productItemSelector,
} from "../../../Store/Reducer/product";
import { useExitPrompt } from "../../../Hooks/useExitPrompt";
import {
  isEmptyObjectAll,
  messageInfoToast,
  newObjectId,
} from "../../../utils";
import { ethSelector } from "../../../Store/Reducer/ethReducer";
import useDeployContractToTruffle from "../../../Hooks";
import Web3 from "web3";

function DashboardWidgets({ url }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { keyProducts } = useParams();
  const paginateRef = useRef(null);
  const mobile_api = useSelector(mobilesSelector);
  const laptop_api = useSelector(laptopsSelector);
  const tablet_api = useSelector(tabletsSelector);
  const input_feild = useSelector(InputFieldsSelector);
  const select_field = useSelector(SelectFieldsSelector);
  const image_field = useSelector(ImageFieldsSelector);
  const productConfigSlt = useSelector(productConfigSelector);
  const comments_users = useSelector(commentsUserSelector);
  const searchDBProducts = useSelector(searchSimilarSelector);
  const productsDBStore = useSelector(productsDBSelector);
  const [showTabletProduct, setShowTabletProduct] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [input, setInput] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productVaratior, setProductVaratior] = useState({});
  const { productConfig, isEdit } = productConfigSlt;
  const [indexProduct, setIndexProduct] = useState(
    productConfig.varation.length - 1
  );

  const ether = useSelector(ethSelector);
  useDeployContractToTruffle();

  const [varation, setVaration] = useState({
    count: 0,
    title: "",
    image: "",
  });
  const { searchSimilar } = searchDBProducts;

  const [arrayData, setArrayData] = useState(null);
  const indexOfLastProducts = currentPage * productsPerPage;
  const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
  const currentProducts =
    productsDB && productsDB.slice(indexOfFirstProducts, indexOfLastProducts);
  const [isShowProductDes, setIsShowProductDes] = useState("list");
  const [isShowCategoryOptions, setIsShowCategoryOptions] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
  const [addData, setVal] = useState("");
  const [description, setDescription] = useState({});
  const [inputConfig, setInputConfig] = useState({});
  const [logo, setLogo] = useState("");
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(null);
  const productStore = useSelector(productItemSelector);
  const [indexCategory, setIndexCategory] = useState(null);
  const [isCheckCreate, setIsCheckCreate] = useState(false);

  const [postProduct, { isLoading, data, error }] = usePostProductMutation();

  const { product } = productStore;
  const { productsDB, total } = productsDBStore;

  useEffect(() => {
    if (error) {
      toast.error("Insert product failure");
    }
  }, [error]);
  const numPage = history.location.search.slice(6) || 1;

  const handleShowProductDesSetting = (info) => {
    if (!formHarlObject) {
      if (info === "list") {
        setIsShowCategoryOptions(!isShowCategoryOptions);
      } else {
        setIsShowCategoryOptions(false);
      }
      setIsShowProductDes(info);
    }
  };

  useEffect(() => {
    setShowExitPrompt(isEdit);
  }, [isEdit, setShowExitPrompt]);

  useEffect(() => {
    dispatch(setLoadingAction(true));
    dispatch(getInputField());
    dispatch(getImageField());
    dispatch(getSelectField());
    dispatch(getProductToPagination({ search: `?page=${numPage}` }));
    dispatch(getCommentsToStore());
    setTimeout(() => {
      dispatch(setLoadingAction(false));
    }, 500);
  }, [dispatch, numPage]);

  useEffect(() => {
    setArrayData([...mobile_api, ...laptop_api, ...tablet_api]);
  }, [laptop_api, mobile_api, tablet_api]);

  useEffect(() => {
    productConfig.varation.length &&
      setIndexProduct(productConfig.varation.length - 1);
  }, [productConfig.varation.length]);

  useEffect(() => {
    keyProducts
      ? handleShowTableProduct(keyProducts)
      : handleShowTableProduct("Mobile");
  }, [keyProducts]);

  const handleOnNavigation = (index, item) => {
    dispatch(handleUpdateIsLoading());
    setVisible(true);
    setActive(index);
    dispatch(getProductApi({ id: item._id }));
  };

  const importImg = useCallback(
    (img) => {
      dispatch(insertImageField(img));
    },
    [dispatch]
  );

  const handleShowTableProduct = (item) => {
    setShowTabletProduct(true);
    setIsShowCategoryOptions(false);
    setCategoryProducts(item);
    setCurrentPage(1);
  };

  const handleResetProductConfig = () => {
    dispatch(handleResetProductConfigChange());
    setIsShow(false);
    handleResetStateConfig();
    setIndexCategory(null);
    setIsCheckCreate(false);
    dispatch(setLoadingAction(false));
  };

  const handleResetStateConfig = () => {
    setVal("");
    setDescription({});
    setInputConfig({});
    setLogo({});
  };

  const passingInputArray = (tags) => {
    dispatch(insertInputField(tags[tags.length - 1]));
  };

  const handleRemoveTagInput = (tagId) => {
    dispatch(deleteInputFieldApi(tagId));
  };

  const handleEditInputValue = (id, value) => {
    const newInputField = {
      _id: id,
      value,
    };
    dispatch(updateInputField(newInputField));
  };

  const handleRemoveImage = (item) => {
    dispatch(deleteImageFieldApi(item._id));
    item.value && URL.revokeObjectURL(item.value);
  };

  const handlePassingDataObj = (obj) => {
    const isEmptyObj = isEmptyObjectAll(obj);
    if (!isEmptyObj) {
      dispatch(insertSelectField(obj));
    } else {
      messageInfoToast(false, "Bạn chưa nhập đầy đủ dữ kiện");
    }
  };

  const handleRemoveOption = (id) => {
    dispatch(deleteSelectFieldApi(id));
  };

  const handlePassingEditOptions = (obj) => {
    const result = obj.options.filter(function (el) {
      return el !== "";
    });
    dispatch(updateSelectField({ ...obj, options: result }));
  };

  useEffect(() => {
    handleInsertProductConfig(productVaratior);
  }, [productVaratior]);

  const handleCreateProductList = useCallback(() => {
    setIsModalVisible(true);
    setVaration({
      count: varation.count + 1,
      title: "",
      image: "",
    });
  }, [varation.count]);

  useEffect(() => {
    if (history.location.pathname === "/dashboard/widgets/create-product") {
      if (productConfig.status === "update") {
        handleResetProductConfig();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname, productConfig.status]);

  const handleOkProductConfig = useCallback(() => {
    setIsShow(true);
    setIsModalVisible(false);
    dispatch(
      handleCreateProductConfig({
        ...varation,
        count: varation.count + 1,
        image: varation.image,
      })
    );
  }, [dispatch, varation]);

  const handleCancelProductConfig = () => {
    setIsModalVisible(false);
  };

  const handleImportImgPush = (img) => {
    dispatch(handlePushImgProductConfig(img));
  };

  const handleRemoveProductItem = (product) => {
    dispatch(removeProductByID({ productID: product._id }));
  };

  const hanldeImportProductToDB = async (data) => {
    const tokenEth = newObjectId();

    const result = {
      ...productVaratior,
      ...inputConfig,
      category: description.category,
      description: description,
      detail: addData,
      logo: logo,
      varation: productConfig.varation,
      image: productConfig.image,
      shop: {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzeqIvRaVq68013nRoOCQAoezYI4nnpPDUG2eiVTbJ7egWB0zwqrhHR2FYnIykkwbEKg&usqp=CAU",
        address: "68 Lý Thường Kiệt - Tam Đảo - Đà Nẵng",
        name: "Phạm Công Tuấn Shop",
        evaluate: 73000,
        response_rate: 35,
        response_time: 2,
        participation: 46,
        monitor: 1700,
      },
      tokenEth,
    };

    if (productConfig.status === "update") {
      dispatch(
        updateDataProductToDB({
          productID: productConfig._id,
          data: productConfig,
        })
      );
    } else {
      if (!ether.contracts) {
        message.error("Không thể kết nối tới Metamask");
        return null;
      }
      const {
        contracts: { myMarketplaceInstance },
        accounts,
      } = ether;
      dispatch(setLoadingAction(true));

      if (myMarketplaceInstance) {
        try {
          myMarketplaceInstance?.methods
            .createProduct(
              "iphone 12 pro",
              Web3.utils.toWei("1", "Ether"),
              tokenEth
            )
            .send({ from: accounts[0] })
            .once("receipt", (receipt) => {
              console.log("error payment", receipt);
            });
          postProduct(result);
          dispatch(setLoadingAction(false));
        } catch (err) {
          console.log("create products err:", err);
          dispatch(setLoadingAction(false));
        }
      }
    }
    handleResetProductConfig();
  };

  const handleSetImageField = (img) => {
    img && dispatch(handlePushImgProductConfig(img));
  };

  const handleEditProduct = (data) => {
    data &&
      dispatch(handleInsertDataToProductConfig({ ...data, status: "update" }));
  };

  useEffect(() => {
    if (productConfig.status === "update") {
      setIsShow(true);
    }
  }, [input, productConfig.status]);

  const handleSetValueInputFieldUpdate = (e, key) => {
    dispatch(
      handleUpdateProductConfigChange({
        key: key,
        value: e.target.value,
      })
    );
  };

  const handlePassingSelectProductConfig = (key, value) => {
    dispatch(
      handleUpdateProductConfigChange({
        key: key,
        value: value,
        des: "description",
      })
    );
  };
  const formHarlObject =
    Object.values(productConfig.varation).filter((item) => item && item !== "")
      ?.length > 0;

  const handleSearchInputToProduct = (value) => {
    if (value) {
      if (productsDB) {
        dispatch(searchProductToDB({ keys: value }));
      }
    }
  };

  return (
    <>
      <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
        <div className="row">
          <ol className="breadcrumb">
            <li>
              <p>
                <em className="fa fa-home" />
              </p>
            </li>
            <li className="active">Widgets</li>
          </ol>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">
              Widgets /{" "}
              {keyProducts
                ? keyProducts.charAt(0).toUpperCase() + keyProducts.slice(1)
                : url
                ? url
                : ""}{" "}
              {productConfig.status ? productConfig.status : ""}
            </h1>
          </div>
        </div>
        <div className="row">
          <ProductsDescription
            showTabletProduct={showTabletProduct}
            total={total}
            products={productsDB}
            ref={paginateRef}
            isShowProductDes={isShowProductDes}
            passingInputArray={passingInputArray}
            input_feild={input_feild}
            formHarlObject={formHarlObject}
            handleRemoveTagInput={handleRemoveTagInput}
            importImg={importImg}
            image_field={image_field}
            handleEditInputValue={handleEditInputValue}
            handleRemoveImage={handleRemoveImage}
            handlePassingDataObj={handlePassingDataObj}
            select_field={select_field}
            handleRemoveOption={handleRemoveOption}
            handlePassingEditOptions={handlePassingEditOptions}
            handleCreateProductList={handleCreateProductList}
            isShow={isShow}
            handleOkProductConfig={handleOkProductConfig}
            handleCancelProductConfig={handleCancelProductConfig}
            isModalVisible={isModalVisible}
            varation={varation}
            setVaration={setVaration}
            product_config={productConfig}
            setProductVaratior={setProductVaratior}
            productVaratior={productVaratior}
            handleImportImgPush={handleImportImgPush}
            indexProduct={indexProduct}
            setIndexProduct={setIndexProduct}
            hanldeImportProductToDB={hanldeImportProductToDB}
            handleResetProductConfig={handleResetProductConfig}
            setVal={setVal}
            setDescription={setDescription}
            setInputConfig={setInputConfig}
            setLogo={setLogo}
            addData={addData}
            description={description}
            inputConfig={inputConfig}
            logo={logo}
            handleRemoveProductItem={handleRemoveProductItem}
            handleSetImageField={handleSetImageField}
            comments_users={comments_users}
            handleEditProduct={handleEditProduct}
            handleSetValueInputFieldUpdate={handleSetValueInputFieldUpdate}
            handlePassingSelectProductConfig={handlePassingSelectProductConfig}
            setVisible={setVisible}
            visible={visible}
            product={product}
            active={active}
            setActive={setActive}
            handleOnNavigation={handleOnNavigation}
            handleSearchInputToProduct={handleSearchInputToProduct}
            searchSimilar={searchSimilar}
            totalCmt={productStore.totalCmt}
            isEdit={isEdit}
            handleShowProductDesSetting={handleShowProductDesSetting}
            setIndexCategory={setIndexCategory}
            indexCategory={indexCategory}
            isCheckCreate={isCheckCreate}
            setIsCheckCreate={setIsCheckCreate}
          />
        </div>
      </div>
    </>
  );
}

DashboardWidgets.propTypes = {};

export default memo(DashboardWidgets);
