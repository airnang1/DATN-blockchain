 
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Col, Row, Tabs } from 'antd';
import Helmet from '../../Helmet';
import ProductPortfolio from './CustomSearch/ProductPortfolio';
import AllProductMobile from './TabMobile/AllProductMobile';
import ProductHot from './TabMobile/ProductHot';
import { useDispatch } from 'react-redux';
import {
    getSearchProductCategoryApi,
    handleSetIsLoad,
} from '../../../Store/Reducer/searchProductCategory';
import Paginations from '../../ProductItem/Comment/Pagination';
import { sortHightToLow, sortLowToHight } from '../../../utils';
const { TabPane } = Tabs;

function CategoryPage(props) {
    const {
        data1,
        data2,
        data3,
        data4,
        data5,
        data6,
        data7,
        data8,
        data10,
        data9,
        products,
        slide_mobile,
        title,
        slideStatus,
        keyword,
        isload,
        total,
        count,
        category,
        trademark,
    } = props;

    const dispatch = useDispatch();
    const [productAll, setProductAll] = useState([]);
    const [productCurrent, setProductCurrent] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const changeProductSmartPhone = () => {
        // const product_smart_phone = products.filter(
        //     (item) => item.description.format !== category1,
        // );
        // setProductAll(product_smart_phone);
        // setProductCurrent(product_smart_phone);
    };

    useEffect(() => {
        if (products) changeAllProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    const changeProductCommonPhone = () => {
        // const product_smart_phone = products.filter(
        //     (item) => item.description.format === category1,
        // );
        // setProductAll(product_smart_phone);
        // setProductCurrent(product_smart_phone);
    };

    const changeAllProduct = () => {
        setProductAll(products);
        setProductCurrent(products);
    };

    const changeProductLandline = () => {
        // const product_smart_phone = products.filter(
        //     (item) => item.description.format === category2,
        // );
        // setProductAll(product_smart_phone);
        // setProductCurrent(product_smart_phone);
    };

    const changeSearchTrademark = (value) => {
        if (value === 'Tất Cả') {
            setProductAll(productCurrent);
        } else {
            const productTrademarkEvoder = productCurrent.filter(
                (item) => item.description.trademark === value,
            );
            setProductAll(productTrademarkEvoder);
        }
    };

    const handlePagination = (numPage) => {
        dispatch(handleSetIsLoad(true));
        dispatch(getSearchProductCategoryApi({ keyword, numPage }));
    };

    return (
        <Helmet title={title}>
            <div className='MobileLayout'>
                <div className="mobile-source">
                    <p>
                        Home <i className="fal fa-chevron-right"></i> {title}
                    </p>
                </div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <ProductPortfolio
                        data1={data1}
                        data2={data2}
                        data3={data3}
                        data4={data4}
                        data5={data5}
                        data6={data6}
                        data7={data7}
                        data8={data8}
                        data9={data9}
                        data10={data10}
                        changeProductSmartPhone={changeProductSmartPhone}
                        changeProductCommonPhone={changeProductCommonPhone}
                        changeAllProduct={changeAllProduct}
                        changeProductLandline={changeProductLandline}
                        changeSearchTrademark={changeSearchTrademark}
                        keyword={keyword}
                        category={category}
                        trademark={trademark}
                    />
                    <Col className="gutter-row" span={19}>
                        <div className="mobile-title">
                            Điện Thoại:
                            <p>{count}</p> kết quả
                        </div>
                        <div className="product-slides">
                            <div
                                style={{
                                    width: '100%',
                                    display: slideStatus,
                                }}
                            >
                                <Slider {...settings}>
                                    {slide_mobile.map((item, index) => (
                                        <div
                                            className="product-slide-item"
                                            key={index}
                                        >
                                            <img
                                                alt=""
                                                style={{ width: '100%' }}
                                                src={item}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        <Tabs defaultActiveKey="1" className="mobile-tabs">
                            <TabPane tab="Tất Cả" key="1">
                                <AllProductMobile
                                    products={productAll}
                                    isload={isload}
                                />
                            </TabPane>
                            <TabPane tab="Bán Chạy" key="2">
                                <ProductHot products={productAll} />
                            </TabPane>
                            <TabPane tab="Hàng Mới" key="3">
                                <AllProductMobile products={productAll} />
                            </TabPane>
                            <TabPane tab="Từ Thấp Đến Cao" key="4">
                                <AllProductMobile
                                    products={sortLowToHight(productAll)}
                                />
                            </TabPane>
                            <TabPane tab="Từ Cao Đến Thấp" key="5">
                                <AllProductMobile
                                    products={sortHightToLow(productAll)}
                                />
                            </TabPane>
                        </Tabs>
                        {productAll.length ? (
                            <Paginations
                                total={total}
                                callBack={handlePagination}
                            />
                        ) : (
                            ''
                        )}
                    </Col>
                </Row>
            </div>
        </Helmet>
    );
}

CategoryPage.propTypes = {};

export default CategoryPage;
