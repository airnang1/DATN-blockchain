import React from 'react';
import { SectionBody } from '../../Section';
import { category_search } from '../../../assets/fake-data';
import Grid from '../../Grid';
import { Link } from 'react-router-dom';

function CategorySearch(props) {
    const { handleHiddenFormSearch } = props;
    return (
        <div className="header__menu__item__search-category">
            <p className="header__menu__item__search-category-title">
                Danh Mục Nổi Bật
            </p>
            <SectionBody>
                <Grid col={4} mdCol={2} smCol={1} gap={10}>
                    {category_search.map((item, index) => (
                        <Link
                            to={item.active ? item.keyWord : '#'}
                            key={index}
                            onClick={() => handleHiddenFormSearch(item.active)}
                        >
                            <div className="header__menu__item__search-category-item">
                                <div className="header__menu__item__search-category-item-img">
                                    <img alt="iphone" src={item.image} />
                                </div>
                                <p className="header__menu__item__search-category-item-name">
                                    {item.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </Grid>
            </SectionBody>
        </div>
    );
}

CategorySearch.propTypes = {};

export default CategorySearch;
