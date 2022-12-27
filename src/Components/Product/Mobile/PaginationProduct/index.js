import React from 'react';
import { Pagination } from 'antd';

function PaginationProduct(props) {
    function onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
    }
    return (
        <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={500}
            style={{ padding: '20px', marginLeft: '30%' }}
        />
    );
}

PaginationProduct.propTypes = {};

export default PaginationProduct;
