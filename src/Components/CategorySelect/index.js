/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Affix, Button, Col, Row } from 'antd';
import { getProducts } from '../../utils';

const importantCategory = {
    title: 'Dành cho bạn',
    image: 'https://salt.tikicdn.com/cache/w100/ts/upload/6d/56/64/3c4a8a3a7475311d8c6892d9ede8ead7.png.webp',
};

function CategorySelect(props) {
    const { productAll, handleImportProduct, handleFilerLogoProducts } = props;
    const [productState, setProductState] = useState([]);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        setProductState(productAll);
    }, [productAll]);

    useEffect(() => {
        const slicedArray = handleFilerLogoProducts().slice(0, 7);
        setCategoryProducts(slicedArray);
        const onChangeCategorySearch = setInterval(() => {
            setCategoryProducts(getProducts(7, handleFilerLogoProducts()));
            setActive(0);
            handleProductAll();
        }, 60000);
        return () => {
            clearInterval(onChangeCategorySearch);
        };
    }, [handleFilerLogoProducts]);

    const handleCategory = (name) => {
        const productHandle = productAll.filter(
            (item) => {
                return item.description.trademark?.toLowerCase() === name.toLowerCase();
            }
        );

        handleImportProduct(productHandle);
    };

    const handleProductAll = () => {
        handleImportProduct(productState);
    };

    const handleActiveCategory = (name, index) => {
        if (name === 'Dành cho bạn') {
            handleProductAll();
        } else {
            handleCategory(name);
        }
        setActive(index);
    };


    const renderCategoryProduct = () =>
        [importantCategory, ...categoryProducts].map((item, index) => (
            <Col
                className="gutter-row"
                span={3}
                style={{ padding: 0 }}
                key={index}
            >
                <div
                    className={
                        active === index
                            ? 'category-select-card active'
                            : 'category-select-card'
                    }
                    onClick={() => handleActiveCategory(item.title, index)}
                >
                    <div className="category-select-img">
                        <img alt="" src={item.image} />
                    </div>
                    <Button type="link">{item.title}</Button>
                </div>
            </Col>
        ));
    return (
        <Affix offsetTop={80}>
            <div className='category-style'>
                <div className="category-select-title">
                    <i className="fad fa-lightbulb-on"></i> Gợi Ý Hôm Nay
                </div>
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{
                        margin: 0,
                        borderTop: ' 5px solid #f8f8f8',
                        borderBottom: ' 5px solid #f8f8f8',
                        borderRadius: '5px',
                    }}
                >
                    {renderCategoryProduct()}
                </Row>
            </div>
        </Affix>
    );
}

CategorySelect.propTypes = {};

export default CategorySelect;
