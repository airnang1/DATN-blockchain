import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'antd';
import { event_category } from '../../../../assets/fake-data';

const CategoryEvent = styled.div`
    .table-event {
        width: 146px;
        height: 350px;
        margin-top: 24px;
        img {
            width: 100%;
        }
    }
`;

// const contentStyle = {
//     height: '100%',
//     color: '#fff',
//     lineHeight: '160px',
//     textAlign: 'center',
//   };

function TableCategoryEvent(props) {
    return (
        <div className="col-sm-3">
            <CategoryEvent>
                <div className="category-product">
                    <div className="title-category">Sự Kiện</div>
                </div>
                <div className="table-event">
                    <Carousel autoplay>
                        {event_category.map((item, index) => (
                            <img alt="" src={item} key={index} />
                        ))}
                    </Carousel>
                </div>
            </CategoryEvent>
        </div>
    );
}

TableCategoryEvent.propTypes = {};

export default TableCategoryEvent;
