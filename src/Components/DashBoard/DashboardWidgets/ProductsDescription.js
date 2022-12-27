/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { forwardRef, memo } from 'react';
import ProductsDescriptionSetting from './ProductsDescriptionSetting';
import ProductDesInsert from './ProductDesInsert';
import ProductDescriptionList from './ProductDescriptionList';
import { Link, Switch, Route } from 'react-router-dom';

const ProductsDescription = forwardRef((props, ref) => {
    const {
        handleShowProductDesSetting,
        isShowProductDes,
        total,
        products,
        passingInputArray,
        input_feild,
        handleRemoveTagInput,
        importImg,
        image_field,
        handleEditInputValue,
        handleRemoveImage,
        handlePassingDataObj,
        select_field,
        handleRemoveOption,
        handlePassingEditOptions,
        handleCreateProductList,
        isShow,
        handleOkProductConfig,
        handleCancelProductConfig,
        isModalVisible,
        varation,
        setVaration,
        product_config,
        setProductVaratior,
        productVaratior,
        handleImportImgPush,
        indexProduct,
        setIndexProduct,
        hanldeImportProductToDB,
        formHarlObject,
        handleResetProductConfig,
        setVal,
        setDescription,
        setInputConfig,
        setLogo,
        addData,
        description,
        inputConfig,
        logo,
        handleRemoveProductItem,
        handleSetImageField,
        comments_users,
        handleEditProduct,
        handleSetValueInputFieldUpdate,
        handlePassingSelectProductConfig,
        setVisible,
        visible,
        product,
        active,
        setActive,
        handleOnNavigation,
        handleSearchInputToProduct,
        searchSimilar,
        totalCmt,
        isEdit,
        setIndexCategory,
        indexCategory,
        isCheckCreate,
        setIsCheckCreate,
    } = props;

    const handeRenderTitle = () => {
        if (isShowProductDes === 'setting') {
            return 'Chỉnh Sửa Các Tùy Chọn';
        } else if (isShowProductDes === 'list') {
            return 'Chi Tiết Sản Phẩm';
        } else {
            return 'Thêm Sản Phẩm Vào Danh Sách';
        }
    };
    return (
        <div className={`col-md-12}`}>
            <div className="panel panel-default">
                <div className="panel-heading">
                    {handeRenderTitle()}
                    <Link to="/dashboard/widgets/config-product">
                        <span
                            className="pull-right clickable panel-toggle panel-button-tab-left"
                            onClick={() =>
                                handleShowProductDesSetting('setting')
                            }
                        >
                            <em className="fa fa-cogs" />
                        </span>{' '}
                    </Link>
                    <Link to="/dashboard/widgets/list-all">
                        <span
                            className="pull-right clickable panel-toggle panel-button-tab-left"
                            onClick={() => handleShowProductDesSetting('list')}
                        >
                            <i className="fad fa-list-alt"></i>
                        </span>
                    </Link>
                    <Link to="/dashboard/widgets/create-product">
                        <span
                            className="pull-right clickable panel-toggle insert panel-button-tab-left"
                            onClick={() =>
                                handleShowProductDesSetting('insert')
                            }
                        >
                            <i className="fad fa-plus"></i>
                        </span>
                    </Link>
                </div>
                <Switch>
                    {
                        <Route path="/dashboard/widgets/list-all">
                            <ProductDescriptionList
                                total={total}
                                products={products}
                                handleRemoveProductItem={
                                    handleRemoveProductItem
                                }
                                comments_users={comments_users}
                                handleEditProduct={handleEditProduct}
                                setVisible={setVisible}
                                visible={visible}
                                product={product}
                                active={active}
                                setActive={setActive}
                                handleOnNavigation={handleOnNavigation}
                                handleSearchInputToProduct={
                                    handleSearchInputToProduct
                                }
                                searchSimilar={searchSimilar}
                                totalCmt={totalCmt}
                            />
                        </Route>
                    }
                    {
                        <Route
                            path={[
                                '/dashboard/widgets/create-product',
                                '/dashboard/widgets/update-product',
                            ]}
                        >
                            <ProductDesInsert
                                isShow={isShow}
                                input_feild={input_feild}
                                select_field={select_field}
                                image_field={image_field}
                                handleCreateProductList={
                                    handleCreateProductList
                                }
                                handleOkProductConfig={handleOkProductConfig}
                                handleCancelProductConfig={
                                    handleCancelProductConfig
                                }
                                isModalVisible={isModalVisible}
                                varation={varation}
                                setVaration={setVaration}
                                product_config={product_config}
                                setProductVaratior={setProductVaratior}
                                productVaratior={productVaratior}
                                handleImportImgPush={handleImportImgPush}
                                indexProduct={indexProduct}
                                setIndexProduct={setIndexProduct}
                                hanldeImportProductToDB={
                                    hanldeImportProductToDB
                                }
                                formHarlObject={formHarlObject}
                                handleResetProductConfig={
                                    handleResetProductConfig
                                }
                                setVal={setVal}
                                setDescription={setDescription}
                                setInputConfig={setInputConfig}
                                setLogo={setLogo}
                                addData={addData}
                                description={description}
                                inputConfig={inputConfig}
                                logo={logo}
                                handleSetImageField={handleSetImageField}
                                handleSetValueInputFieldUpdate={
                                    handleSetValueInputFieldUpdate
                                }
                                handlePassingSelectProductConfig={
                                    handlePassingSelectProductConfig
                                }
                                isEdit={isEdit}
                                setIndexCategory={setIndexCategory}
                                indexCategory={indexCategory}
                                isCheckCreate={isCheckCreate}
                                setIsCheckCreate={setIsCheckCreate}
                            />
                        </Route>
                    }
                    {
                        <Route path="/dashboard/widgets/config-product">
                            <ProductsDescriptionSetting
                                passingInputArray={passingInputArray}
                                input_feild={input_feild}
                                handleRemoveTagInput={handleRemoveTagInput}
                                importImg={importImg}
                                image_field={image_field}
                                handleEditInputValue={handleEditInputValue}
                                handleRemoveImage={handleRemoveImage}
                                handlePassingDataObj={handlePassingDataObj}
                                select_field={select_field}
                                handleRemoveOption={handleRemoveOption}
                                handlePassingEditOptions={
                                    handlePassingEditOptions
                                }
                            />
                        </Route>
                    }
                </Switch>
            </div>
        </div>
    );
});

export default memo(ProductsDescription);
