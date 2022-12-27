import React from 'react';
import { Badge } from 'antd';

function NewsProductItem(props) {
    const { item, handleShowDescriptionNews } = props;
    return (
        <div
            className="col-lg-4"
            style={{ marginTop: 15 }}
            onClick={() => handleShowDescriptionNews(item.id)}
        >
            <div className="cart-new-products">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="new-product-image">
                            <img alt="" src={item.image} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="new-product-name">
                            <p className="">{item.title}</p>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <p className="">{item.trankmake}</p>
                    </div>
                </div>
                {/* <hr /> */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="new-product-date">
                            <p className="">{item.date}</p>
                        </div>
                    </div>
                </div>
                <Badge
                    className="site-badge-count-109"
                    count={'new'}
                    style={{ backgroundColor: '#52c41a' }}
                />
            </div>
        </div>
    );
}

NewsProductItem.propTypes = {};

export default NewsProductItem;
