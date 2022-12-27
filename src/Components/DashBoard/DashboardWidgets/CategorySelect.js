import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

function CategorySelect(props) {
    const { product } = props;
    return (
        <Select
            showSearch
            style={{ width: 300, margin: '10px 0' }}
            placeholder="Chọn Giá Trị Phù Hợp"
            optionFilterProp="children"
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
                optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
            }
        >
            {product.map((item, index) => (
                <Option value={index} key={index}>
                    {item}
                </Option>
            ))}
        </Select>
    );
}

CategorySelect.propTypes = {};

export default CategorySelect;
