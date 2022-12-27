import React, { useCallback, useEffect, useRef, useState } from "react";
import heroSlides, {
  skeletonProduct,
  slide_home,
} from "../../assets/fake-data";
import police from "../../assets/fake-data/policeCartApi";

import Helmet from "../../Components/Helmet";
import HeroSlides from "../../Components/HeroSlides.js";
import PoliceCart from "../../Components/PoliceCart";
import Section, { SectionBody, SectionTitle } from "../../Components/Section";
import Grid from "../../Components/Grid";
import ProductCart from "../../Components/ProductCart";
import { Carousel, Col, Divider, Row } from "antd";
import Sidebar from "../../Components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import GenuineBrand from "../../Components/GenuineBrand";
import SriceShock from "../../Components/SriceShock";
import CategorySelect from "../../Components/CategorySelect";

import AOS from "aos";
// import EvaluateWebs from "../../Components/EvaluateWebs";
import {
  handleSetLoadingSkeleton,
  productsSelector,
  useGetAllProductsQuery,
} from "../../Store/Reducer/productsReducer";
import { setLoadingAction } from "../../Store/Reducer/loadingReducer";
import SkeletonProducts from "../../Components/SkeletonProducts";
import { toast } from "react-toastify";
import { getProducts } from "../../utils";

export default function Home() {
  const dispatch = useDispatch();
  const height = "auto";
  const products_api = useSelector(productsSelector);
  const [mobileAndTablet, setMobileAndTablet] = useState([]);
  const [productsSelect, setProductsSelect] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const observer = useRef(null);
  const { error, isLoading } = useGetAllProductsQuery({ pageNum, limitNum: 5 });

  useEffect(() => {
    if (error) {
      toast.error("Get product failure");
    }
  }, [error]);

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  useEffect(() => {
    dispatch(setLoadingAction(isLoading));
  }, [dispatch, isLoading, pageNum]);

  useEffect(() => {
    if (products_api.products) {
      const mobileAndTablet = products_api.products.filter(
        (product) =>
          product.category === "Mobile" || product.category === "Tablet"
      );
      setMobileAndTablet(mobileAndTablet);
    }
  }, [products_api.products]);

  useEffect(() => {
    handleImportProduct(products_api.products);
  }, [products_api.products]);

  const handleImportProduct = (products) => {
    setProductsSelect(products);
  };

  const lastProductCart = useCallback(
    (node) => {
      if (products_api.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && products_api.hasMore) {
          if (products_api.count > products_api.products.length) {
            dispatch(handleSetLoadingSkeleton(true));
            setPageNum((prevPageNum) => prevPageNum + 1);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [
      dispatch,
      products_api.count,
      products_api.hasMore,
      products_api.loading,
      products_api.products,
    ]
  );

  const handleFilerLogoProducts = () => {
    const result = [];

    if (products_api.products) {
      products_api.products.forEach((item) => {
        if (item.description.trademark) {
          const found = result.some(
            (el) => el.title === item.description.trademark.toLowerCase()
          );
          if (!found) {
            result.push({
              title: item.description.trademark.toLowerCase(),
              image: item.logo,
            });
          }
        }
      });
    }
    return result;
  };

  const handleFilterCategoryProducts = (key) => {
    if (products_api.products) {
      return products_api.products.filter(
        (product) => product.category === key
      );
    }
  };

  return (
    <Helmet title="Home">
      <div className="Home">
        <HeroSlides
          data={heroSlides}
          control={true}
          auto={true}
          timeOut={6000}
        />
        <Section>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {police.map((item, index) => (
                <PoliceCart
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                  key={index}
                  // onClick={handleShowMessage}
                />
              ))}
            </Grid>
          </SectionBody>
        </Section>
        <SriceShock slideStatus={true} mobile_api={products_api.products} />
        <GenuineBrand />
        <Section data-aos="fade-up">
          <SectionTitle icon="crown">MUA NHIỀU NHẤT</SectionTitle>
          <Divider
            orientation="center"
            style={{
              transform: "translateY(30px)",
              color: "#c3c3c3",
            }}
          >
            <i className="fad fa-mobile" /> IPHONE + TABLET
          </Divider>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {getProducts(4, mobileAndTablet).map((item, index) => (
                <div data-aos="fade-up" key={index}>
                  <ProductCart
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    status={item.status}
                    star={item.star}
                    amount={item.amount}
                    category={item.category}
                    product={item}
                    capacity={item.capacity}
                    varation={item.varation}
                    image={item.image}
                    description={item.description}
                    priceOld={item.priceOld}
                    height="390"
                    img_width="100%"
                    right="11px"
                    sold={item.sold}
                  />
                </div>
              ))}
            </Grid>
          </SectionBody>
          {handleFilterCategoryProducts("Laptop")?.length && (
            <>
              <Divider
                orientation="center"
                style={{
                  transform: "translateY(30px)",
                  color: "#c3c3c3",
                }}
              >
                <i className="fad fa-laptop" /> LAPTOP
              </Divider>
              <SectionBody>
                <Grid col={4} mdCol={2} smCol={1} gap={20}>
                  {getProducts(4, handleFilterCategoryProducts("Laptop")).map(
                    (item) => (
                      <div data-aos="fade-up" key={item._id}>
                        <ProductCart
                          data-aos="fade-up"
                          id={item._id}
                          name={item.name}
                          price={+item.price}
                          status={item.status}
                          star={item.star}
                          product={item}
                          amount={item.amount}
                          category={item.category}
                          capacity={item.capacity}
                          varation={item.varation}
                          image={item.image}
                          description={item.description}
                          priceOld={item.priceOld}
                          height="410"
                          img_width="95%"
                          right="11px"
                          sold={item.sold}
                        />
                      </div>
                    )
                  )}
                </Grid>
              </SectionBody>
            </>
          )}
        </Section>
        <CategorySelect
          handleImportProduct={handleImportProduct}
          productAll={products_api.products}
          handleFilerLogoProducts={handleFilerLogoProducts}
        />
        <SectionBody>
          <div
            className="cart-products"
            style={{ height: height, overflow: "hidden" }}
          >
            <Grid col={5} mdCol={3} smCol={1} gap={0}>
              {productsSelect &&
                productsSelect.map((item, index) => {
                  const isShow = productsSelect.length === index + 1;
                  return (
                    <div
                      data-aos="fade-up"
                      key={index}
                      ref={isShow ? lastProductCart : null}
                    >
                      <ProductCart
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        status={item.status}
                        star={item.star}
                        amount={item.amount}
                        category={item.category}
                        capacity={item.capacity}
                        product={item}
                        varation={item.varation}
                        image={item.image}
                        description={item.description}
                        priceOld={item.priceOld}
                        height="350"
                        img_width="90%"
                        right="5px"
                        sold={item.sold}
                      />
                    </div>
                  );
                })}
            </Grid>

            <Grid col={5} mdCol={2} smCol={1} gap={0}>
              {products_api.loading &&
                skeletonProduct.map((item, index) => (
                  <SkeletonProducts key={index} />
                ))}
            </Grid>
          </div>
        </SectionBody>

        <Sidebar />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12} data-aos="fade-right">
            <Carousel autoplay>
              {slide_home.map((item, index) => (
                <div key={index}>
                  <img alt={item.title} src={item.img} />
                </div>
              ))}
            </Carousel>
          </Col>
          <Col className="gutter-row" span={12} data-aos="fade-left">
            <iframe
              style={{ width: "100%", height: "100%" }}
              src="https://www.youtube.com/embed/ikzXR2iV7Zs"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Col>
        </Row>
        {/* <EvaluateWebs /> */}
        {/* <BoxChat /> */}
      </div>
    </Helmet>
  );
}
