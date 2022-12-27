import React from 'react';
import NewsProductItem from './NewsProductItem';
import { render_news_item } from '../../../assets/fake-data';

function ShowNewsProduct(props) {
    const { handleShowDescriptionNews } = props;
    return (
        <div className="news-product-list">
            <div className="row">
                {render_news_item.map((item, index) => (
                    <NewsProductItem
                        key={index}
                        item={item}
                        handleShowDescriptionNews={handleShowDescriptionNews}
                    />
                ))}
            </div>
        </div>
    );
}

ShowNewsProduct.propTypes = {};

export default ShowNewsProduct;
