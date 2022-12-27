import React from 'react';
import styled from 'styled-components';
import { Badge, Empty } from 'antd';
import { Link } from 'react-router-dom';

const CategoryHighlights = styled.div`
    .table-highlight {
        width: 100%;
        max-height: 320px;
        padding: 20px;
        margin-top: 24px;
        overflow-y: auto;
        box-shadow: 0px 0px 8px 1px #eaeaea;
    }
    .category-product-item {
        list-style: none;
        margin: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:hover {
            color: #255cd8;
        }
    }
    .category-product-item-li {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
    }
`;
function TableCategoryHighlights(props) {
    const { data, isShow } = props;

    const handleConvertStringToLink = (item) => {
        return item.replace(/\//g, '-');
    };

    return (
        <div className="col-sm-6 ">
            <CategoryHighlights>
                <div className="category-product">
                    <div className="title-category">Nổi Bật</div>
                </div>
                {isShow ? (
                    <div className="table-highlight">
                        {data.data.map((item, index) => (
                            <Link
                                to={`/category/${
                                    data.title
                                }/${handleConvertStringToLink(item)}`}
                                key={index}
                            >
                                <div
                                    className="category-product-item"
                                    key={index}
                                >
                                    <li
                                        key={index}
                                        className="category-product-item-li"
                                    >
                                        {item}
                                    </li>
                                    <Badge count={25} />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                            marginTop: 24,
                        }}
                        description={<span>No Data</span>}
                    ></Empty>
                )}
            </CategoryHighlights>
        </div>
    );
}

TableCategoryHighlights.propTypes = {};

export default TableCategoryHighlights;
