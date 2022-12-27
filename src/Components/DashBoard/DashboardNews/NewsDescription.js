/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Button, Collapse } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import CompleteSearch from '../DashboardWidgets/SearchProduct';
import CategorySelect from '../DashboardWidgets/CategorySelect';
import ShowNewsProduct from './ShowNewsProduct';
import Navigation from '../DashboardWidgets/Navigation';

const { Panel } = Collapse;

const genExtra = () => (
    <SettingOutlined
        onClick={(event) => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
        }}
    />
);

function callback(key) {
    console.log(key);
}

const category_product = ['All', 'Mobile', 'Laptop', 'Tablet'];
const trademark = ['Apple', 'Oppo', 'SamSung', 'Nokia'];

function NewsDescription(props) {
    const { showTabletProduct } = props;
    const [visible, setVisible] = useState(false);

    const handleSetVisible = () => {
        setVisible(false);
    };

    const handleShowDescriptionNews = (key) => {
        setVisible(true);
    };

    return (
        <div className="col-md-8">
            <div className="panel panel-default">
                <div className="panel-heading">
                    Product Description
                    <span className="pull-right clickable panel-toggle panel-button-tab-left">
                        <i className="fad fa-plus"></i>
                    </span>
                </div>
                {showTabletProduct ? (
                    <div className="panel-body">
                        <Collapse
                            onChange={callback}
                            expandIconPosition="right"
                        >
                            <Panel
                                header="Tìm Kiếm Sản Phẩm"
                                key="1"
                                extra={genExtra()}
                            >
                                <div>
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <p
                                                className=""
                                                style={{ margin: '27px 0' }}
                                            >
                                                Nhập Giá Trị Cần Tìm :
                                            </p>
                                            <p
                                                className=""
                                                style={{ margin: '27px 0' }}
                                            >
                                                Thể Loại Sản Phẩm :
                                            </p>
                                            <p
                                                className=""
                                                style={{ margin: '27px 0' }}
                                            >
                                                Thương Hiệu :
                                            </p>
                                        </div>
                                        <div className="col-lg-6">
                                            <CompleteSearch />
                                            <CategorySelect
                                                product={category_product}
                                            />
                                            <CategorySelect
                                                product={trademark}
                                            />
                                            <Button
                                                type="primary"
                                                style={{ margin: '27px 0' }}
                                            >
                                                Tìm Kiếm
                                            </Button>
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
                                <ShowNewsProduct
                                    handleShowDescriptionNews={
                                        handleShowDescriptionNews
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
            <Navigation visible={visible} handleSetVisible={handleSetVisible} />
        </div>
    );
}

NewsDescription.propTypes = {};

export default NewsDescription;
