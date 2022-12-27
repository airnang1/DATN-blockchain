import React from 'react';
import { Input } from 'antd';
import { numberWithCommas } from '../../../utils';

export default function CompleteSearch(props) {
    const {
        handleSearchInputToProduct,
        searchSimilar,
        handleImportProductToTablet,
        setIsActive,
        isActive,
        setInputSearch,
        inputSearch,
    } = props;

    const handleChangeInputSearch = (e) => {
        const value = e.target.value;
        setInputSearch(value);
        value.trim() ? setIsActive(true) : setIsActive(false);
        handleSearchInputToProduct(value);
    };

    return (
        <div className="input-search-list-products" style={{ width: 400 }}>
            <Input
                size="large"
                placeholder="search product ..."
                value={inputSearch}
                enterButton
                onChange={(e) => handleChangeInputSearch(e)}
            />
            <div
                className={`input-search-list-products-table ${
                    isActive ? 'active' : ''
                }`}
            >
                {searchSimilar.length
                    ? searchSimilar.map((item, index) => (
                          <div
                              className="input-search-list-products-table-item"
                              key={index}
                              onClick={() => handleImportProductToTablet(item)}
                          >
                              <div className="search-image-product">
                                  <img
                                      src={item.varation[0].image || ''}
                                      alt={item.name}
                                  />
                              </div>
                              <div className="search-content">
                                  <div className="search-name-product">
                                      <span>{item.name}</span>
                                  </div>
                                  <div className="search-price">
                                      {numberWithCommas(item.price)}
                                      <sup> đ</sup>
                                  </div>
                              </div>
                          </div>
                      ))
                    : ''}
            </div>
        </div>
    );
}
