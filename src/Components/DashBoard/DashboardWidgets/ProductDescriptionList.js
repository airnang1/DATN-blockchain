import React, { useEffect, useState } from 'react';
import TableProduct from './TableProduct';
import CompleteSearch from './SearchProduct';
import { Collapse } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

const genExtra = () => (
    <SettingOutlined
        onClick={(event) => {
            event.stopPropagation();
        }}
    />
);

function callback(key) {}

function ProductDescriptionList(props) {
    const {
        total,
        products,
        handleRemoveProductItem,
        comments_users,
        handleEditProduct,
        setVisible,
        visible,
        product,
        active,
        setActive,
        handleOnNavigation,
        handleSearchInputToProduct,
        searchSimilar,
        totalCmt,
    } = props;
    const [productsSearch, setProductsSearch] = useState([]);
    const [inputSearch, setInputSearch] = useState('');
    const [isActive, setIsActive] = useState(false);

    const handleImportProductToTablet = (product) => {
        setProductsSearch([product]);
        setIsActive(false);
    };

    useEffect(() => {
        if (!inputSearch) {
            setProductsSearch([]);
        }
    }, [inputSearch]);

    return (
        <div className="panel-body">
            <Collapse onChange={callback} expandIconPosition="right">
                <Panel header="Tìm Kiếm Sản Phẩm" key="1" extra={genExtra()}>
                    <div>
                        <div className="row">
                            <div className="col-lg-5">
                                <p className="" style={{ margin: '27px 0' }}>
                                    Nhập Giá Trị Cần Tìm :
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <CompleteSearch
                                    handleSearchInputToProduct={
                                        handleSearchInputToProduct
                                    }
                                    searchSimilar={searchSimilar}
                                    handleImportProductToTablet={
                                        handleImportProductToTablet
                                    }
                                    isActive={isActive}
                                    setIsActive={setIsActive}
                                    setProductsSearch={setProductsSearch}
                                    setInputSearch={setInputSearch}
                                    inputSearch={inputSearch}
                                />
                            </div>
                        </div>
                    </div>
                </Panel>
            </Collapse>
            <div className="row">
                <div className="col-lg-12 panel-heading">
                    Sản Phẩm Trong Kho
                </div>
                <div className="col-lg-12">
                    <TableProduct
                        total={total}
                        products={products}
                        handleRemoveProductItem={handleRemoveProductItem}
                        comments_users={comments_users}
                        handleEditProduct={handleEditProduct}
                        setVisible={setVisible}
                        visible={visible}
                        product={product}
                        active={active}
                        setActive={setActive}
                        handleOnNavigation={handleOnNavigation}
                        productsSearch={productsSearch}
                        totalCmt={totalCmt}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductDescriptionList;
