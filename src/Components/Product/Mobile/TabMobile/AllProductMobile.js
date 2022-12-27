import React from 'react';
import { SectionBody } from '../../../Section';
import ProductCart from '../../../ProductCart';
import Grid from '../../../Grid';
import styled from 'styled-components';
import DividerComponent from '../Divider';
import { Empty, Spin } from 'antd';

const AllMobile = styled.div`
    .ant-rate-star:not(:last-child) {
        margin-right: -6px;
    }
    .product-cart__image {
        padding-top: 75%;
    }
`;
function AllProductMobile({ isload, products }) {
    return (
        <AllMobile>
            <DividerComponent
                title="Tất Cả Sản Phẩm"
                transformY="0"
                icon=""
                position="center"
            />
            <SectionBody>
                {isload ? (
                    <div className="loading-spin">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        <Grid col={4} mdCol={2} smCol={1} gap={20}>
                            {products.map((item, index) => (
                                <ProductCart
                                    key={index}
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    status={false}
                                    star={item.star}
                                    amount={item.amount}
                                    category={item.category}
                                    product={item}
                                    capacity={item.capacity}
                                    varation={item.varation}
                                    image={item.image}
                                    description={item.description}
                                    priceOld={item.priceOld}
                                    height="300"
                                    img_width="100%"
                                />
                            ))}
                        </Grid>
                        {products.length ? '' : <Empty />}
                    </>
                )}
            </SectionBody>
        </AllMobile>
    );
}

AllProductMobile.propTypes = {};

export default AllProductMobile;
