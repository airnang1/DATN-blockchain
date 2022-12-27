/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import NewsOpitons from './NewsOpitons';
import NewsDescription from './NewsDescription';

function DashboardNews(props) {
    const [showTabletProduct, setShowTabletProduct] = useState(false);
    const handleShowTableProduct = (item) => {
        setShowTabletProduct(true);
    };

    return (
        <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
            <div className="row">
                <ol className="breadcrumb">
                    <li>
                        <a href="#">
                            <em className="fa fa-home" />
                        </a>
                    </li>
                    <li className="active">News</li>
                </ol>
            </div>
            {/*/.row*/}
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">News</h1>
                </div>
            </div>
            {/*/.row*/}
            <div className="row">
                <NewsOpitons handleShowTableProduct={handleShowTableProduct} />
                <NewsDescription showTabletProduct={showTabletProduct} />
            </div>
        </div>
    );
}

DashboardNews.propTypes = {};

export default DashboardNews;
