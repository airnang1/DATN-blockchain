import React from 'react';
import { Skeleton } from 'antd';

function SkeletonProducts(props) {
    return (
        <div className="skeleton-products">
            <Skeleton.Button size={'default'} block={false} active />
            <Skeleton.Image active />
            <Skeleton.Input active size={'default'} />
        </div>
    );
}

SkeletonProducts.propTypes = {};

export default SkeletonProducts;
