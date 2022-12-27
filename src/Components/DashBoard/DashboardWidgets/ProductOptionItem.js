/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function ProductOptionItem(props) {
    const {
        item,
        handleShowTableProduct,
        index,
        timeActive,
        someHandler,
        handleRemoveCategory,
        arrayData,
    } = props;

    const handleRenderToCategory = () => {
        if (arrayData) {
            const result = arrayData.filter((obj) => {
                return obj.category === item.title.toLowerCase();
            });
            return result.length;
        }
    };

    return (
        <div
            className="row product-hunt"
            id="product-hunt"
            onClick={() => handleShowTableProduct(item.title)}
            // onMouseEnter={() => someHandler(index)}
        >
            <div className="col-xs-2 col-md-2 date">
                <img alt="" src={item.image} style={{ width: '180%' }} />
            </div>
            <div className="col-xs-8 col-md-8">
                <h4>
                    <a>{item.title}</a>
                </h4>
                <p>
                    Hiện trong kho có tất cả {handleRenderToCategory()}{' '}
                    {item.title}
                </p>
            </div>

            <div className="col-xs-2 col-md-2">
                {index === timeActive ? (
                    <i
                        className="fal fa-times-square"
                        onClick={() => handleRemoveCategory(item)}
                    ></i>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

ProductOptionItem.propTypes = {};

export default ProductOptionItem;
