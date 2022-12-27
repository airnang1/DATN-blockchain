/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';
import ProductOptionItem from './ProductOptionItem';
import CategorySetting from './CategorySetting';

function ProductOptions(props) {
    const {
        handleShowTableProduct,
        handleShowCategorySetting,
        isShowCategory,
        handleImportObjCategorySetting,
        handlePushValueCategory,
        category,
        image,
        input,
        timeActive,
        someHandler,
        handleRemoveCategory,
        arrayData,
    } = props;

    const renderProductOptions = category.map((item, index) => (
        <ProductOptionItem
            item={item}
            key={index}
            handleShowTableProduct={handleShowTableProduct}
            index={index}
            timeActive={timeActive}
            someHandler={someHandler}
            handleRemoveCategory={handleRemoveCategory}
            arrayData={arrayData}
        />
    ));

    return (
        <div className="col-md-4">
            <div className="panel panel-default articles">
                <div className="panel-heading">
                    Product Options
                    <span
                        className="pull-right panel-settings panel-button-tab-right"
                        onClick={handleShowCategorySetting}
                    >
                        <i className="fad fa-plus"></i>
                    </span>
                    <span
                        className="pull-right clickable panel-toggle panel-button-tab-left"
                        onClick={handlePushValueCategory}
                    >
                        <i className="fad fa-check"></i>
                    </span>
                </div>
                <div className="panel-body articles-container">
                    <div className="article border-bottom">
                        <div className="col-xs-12">
                            <CategorySetting
                                isShowCategory={isShowCategory}
                                handleImportObjCategorySetting={
                                    handleImportObjCategorySetting
                                }
                                image={image}
                                input={input}
                            />
                        </div>
                        <div className="col-xs-12">{renderProductOptions}</div>
                        <div className="clear" />
                    </div>
                </div>
            </div>
            {/*End .articles*/}
        </div>
    );
}

ProductOptions.propTypes = {};

export default memo(ProductOptions);
