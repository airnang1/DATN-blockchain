import React, { useCallback, useEffect } from "react";
import { Col, Modal, Row } from "antd";
import ImgProduct from "../ProductItem/ImgProduct";
import SelectPay from "../ProductItem/SelectPay";
import { useDispatch, useSelector } from "react-redux";
import {
  handleProduct,
  imgImportSelector,
} from "../../Store/Reducer/handleImgPrd";
import { loadingSelector } from "../../Store/Reducer/loadingReducer";
import { authSelector } from "../../Store/Reducer/authReducer";
import {
  cartSelector,
  handleAddProductToCart,
  handleAddProductToCartBuyAction,
} from "../../Store/Reducer/cartReducer";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { handleProductStatus } from "../../Store/Reducer/current_product";
import { createAxiosJWT } from "../../pages/App/App";

function QuickViewModal(props) {
  const {
    title,
    visible,
    onCancel,
    data: { id, image, product },
  } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const productObj = useSelector(imgImportSelector);
  const loading = useSelector(loadingSelector);
  const user = useSelector(authSelector);
  const cart = useSelector(cartSelector);
  const auth = useSelector(authSelector);

  const axiosJWT = createAxiosJWT({ tokenAuth: auth.tokenAuth, history, dispatch });

  const handleProductToCart = (obj) => {
    if (user.user && user.tokenAuth) {
      dispatch(
        handleAddProductToCart({
          cart,
          obj: { ...obj, image: obj.image.image },
          amout: 1,
          user,
          axiosJWT,
        })
      );
    } else {
      toast.warning("Bạn cần phải đăng nhập để sử dụng dịch vụ này");
      history.push("/buyer/signin");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(handleProduct({}));
    };
  }, [dispatch]);

  const handleProductToBuy = (obj) => {
    if (user.user && user.tokenAuth) {
      dispatch(
        handleAddProductToCartBuyAction({
          cart,
          obj: { ...obj, image: obj.image.image },
          amout: 1,
          user,
          isChecked: true,
          axiosJWT,
        })
      );
    } else {
      toast.warning("Bạn cần phải đăng nhập để sử dụng dịch vụ này");
      history.push("/buyer/signin");
    }
  };

  const handleImportProduct = useCallback(
    (product) => {
      dispatch(handleProduct(product));
      dispatch(handleProductStatus(product));
    },
    [dispatch]
  );

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={1200}
      className="product-style"
    >
      <Row>
        <Col
          lg={10}
          xs={24}
          md={24}
          style={{ padding: 0 }}
          className="image-box-product"
        >
          <ImgProduct
            productImg={image.length && image}
            imageArr={productObj.image && productObj.image}
            loading={loading}
            auth={user}
            productId={id}
          />
        </Col>
        <Col lg={12} xs={24} md={18} className="content-box-product">
          <SelectPay
            product={product}
            handleImportProduct={handleImportProduct}
            productObj={productObj}
            handleProductToCart={handleProductToCart}
            handleProductToBuy={handleProductToBuy}
            loading={loading}
            user={user.user}
            totalCmt={0}
          />
        </Col>
      </Row>
    </Modal>
  );
}

QuickViewModal.propTypes = {};

export default QuickViewModal;
