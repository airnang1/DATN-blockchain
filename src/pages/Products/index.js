import React, { useCallback, useEffect, useState } from "react";
import Helmet from "../../Components/Helmet";
import { useParams } from "react-router-dom";
import { Col, Row } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductApi,
  handleUpdateProduct,
  productItemSelector,
} from "../../Store/Reducer/product";
import ImgProduct from "../../Components/ProductItem/ImgProduct";
import SelectPay from "../../Components/ProductItem/SelectPay";
import Shop from "../../Components/ProductItem/Shop";
import ProductsCommand from "../../Components/ProductItem/ProductsCommans";
import {
  handleProduct,
  imgImportSelector,
} from "../../Store/Reducer/handleImgPrd";
import {
  commentsUserSelector,
  insertCmt,
} from "../../Store/Reducer/comments_user";
import { handleProductStatus } from "../../Store/Reducer/current_product";
import { authSelector } from "../../Store/Reducer/authReducer";
import {
  loadingSelector,
  setLoadingAction,
} from "../../Store/Reducer/loadingReducer";
import {
  cartSelector,
  handleAddProductToCart,
  handleAddProductToCartBuyAction,
} from "../../Store/Reducer/cartReducer";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { humanImg } from "../../assets/fake-data/human";
import { useGetAllProductsQuery } from "../../Store/Reducer/productsReducer";

export default function Products({ axiosJWT }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const productStore = useSelector(productItemSelector);
  const loading = useSelector(loadingSelector);
  const productObj = useSelector(imgImportSelector);
  const user = useSelector(authSelector);
  const comments_user = useSelector(commentsUserSelector);
  const cart = useSelector(cartSelector);
  const [productObjChange, setProductObjChange] = useState(null);
  const [amout, setAmout] = useState(1);

  const { product, totalCmt } = productStore;

  const handleNumAmount = (num) => {
    setAmout(num);
  };

  const { data } = useGetAllProductsQuery({ pageNum: 1, limitNum: 5 });

  useEffect(() => {
    if (product?.description) {
      Object.keys(productObj).length !== 0 &&
        setProductObjChange({
          ...productObj,
          trademark: product.description.trademark,
          category: product.category,
          capacity: product.description,
          sizeInformation: {
            height: product.height,
            length: product.length,
            weight: product.weight,
            width: product.width,
          },
        });
    }
  }, [productObj, product]);

  useEffect(() => {
    if (id) {
      dispatch(setLoadingAction(true));
      dispatch(getProductApi({ id }));
      setTimeout(() => {
        dispatch(setLoadingAction(false));
      }, 500);
    }
    return () => dispatch(handleUpdateProduct({}));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      const productCount = {
        _id: product._id,
        count: 0,
        name: product.name,
        image: product.image && product.image[0].image,
        price: product.price,
        priceOld: product.priceOld,
        capacity: product.capacity,
      };
      dispatch(handleProduct(productCount));
      dispatch(handleProductStatus(productCount));
    }

    return () => {
      dispatch(handleProduct({}));
    };
  }, [dispatch, product]);

  const handleImportProduct = useCallback(
    (product) => {
      dispatch(handleProduct(product));
      dispatch(handleProductStatus(product));
    },
    [dispatch]
  );

  const handleInSertCmt = (obj) => {
    const newComment = {
      ...obj,
      user: {
        ...obj.user,
        profilePicture: obj.user.profilePicture
          ? obj.user.profilePicture
          : humanImg,
      },
      likes: [],
      createdAt: new Date().toISOString(),
      productId: product._id,
    };

    if (product) {
      const newProduct = {
        ...product,
        comments: [newComment, ...product.comments],
      };
      dispatch(handleUpdateProduct(newProduct));
    }
    dispatch(
      insertCmt({ auth: user, newComment, dispatch, product, axiosJWT })
    );
  };

  const handleProductToCart = (obj) => {
    if (user.user && user.tokenAuth) {
      dispatch(handleAddProductToCart({ cart, obj, amout, user, axiosJWT }));
    } else {
      toast.warning("Bạn cần phải đăng nhập để sử dụng dịch vụ này");
      history.push("/buyer/signin");
    }
  };

  const handleProductToBuy = (obj) => {
    if (user.user && user.tokenAuth) {
      dispatch(
        handleAddProductToCartBuyAction({
          cart,
          obj,
          amout,
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

  return (
    <Helmet title={product?.name}>
      <div className="product-style">
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{
            background: "#fff",
            boxShadow: "0 0 2px 2px rgb(227 227 227)",
          }}
        >
          <Col className="gutter-row" span={10}>
            <ImgProduct
              productImg={product?.image && product?.image}
              imageArr={productObj.image && productObj.image}
              loading={loading}
              likes={product?.likes}
              auth={user}
              productId={product._id}
              product={product}
              axiosJWT={axiosJWT}
            />
          </Col>
          <Col
            className="gutter-row"
            span={14}
            style={{ paddingBottom: "20px" }}
          >
            <SelectPay
              product={product}
              handleImportProduct={handleImportProduct}
              productObj={productObj}
              handleProductToCart={handleProductToCart}
              handleNumAmount={handleNumAmount}
              handleProductToBuy={handleProductToBuy}
              loading={loading}
              comments_user={comments_user}
              user={user.user}
              productObjChange={productObjChange}
              totalCmt={totalCmt}
            />
          </Col>
        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          className="product-shop"
          style={{
            padding: "10px",
            background: "#fff",
            boxShadow: "0 0 2px 2px rgb(227 227 227)",
            marginTop: "20px",
          }}
        >
          <Shop product={product} loading={loading} />
        </Row>
      </div>
      <ProductsCommand
        product={product}
        products_api={data}
        commentsUser={comments_user}
        handleInSertCmt={handleInSertCmt}
        user={user.user}
        tokenAuth={user.tokenAuth}
        axiosJWT={axiosJWT}
      />
    </Helmet>
  );
}
