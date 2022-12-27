import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    data10,
    data2,
    data3,
    data4,
    data5,
    data6,
    data8,
    data9,
    slide_mobile,
} from '../../assets/fake-data';
import CategoryPage from '../../Components/Product/Mobile/CategoryPage';
import { useParams } from 'react-router-dom';
import {
    getSearchProductCategoryApi,
    handleSetIsLoad,
    searchProductCategorySelector,
} from '../../Store/Reducer/searchProductCategory';
import { useHistory } from 'react-router-dom';

function Search(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { keyword } = useParams();
    const productsCategory = useSelector(searchProductCategorySelector);
    const { products, isload, total, count } = productsCategory;

    useEffect(() => {
        const num = history.location.search.slice(6) || 1;
        if (keyword) {
            dispatch(handleSetIsLoad(true));
            dispatch(
                getSearchProductCategoryApi({
                    keyword,
                    numPage: num ? num : 1,
                }),
            );
        }
    }, [dispatch, history.location.search, keyword]);

    return (
        <CategoryPage
            products={products}
            data10={data10}
            data2={data2}
            data3={data3}
            data4={data4}
            data5={data5}
            data6={data6}
            data8={data8}
            data9={data9}
            slide_mobile={slide_mobile}
            category1="common"
            category2="landline"
            title={keyword}
            slideStatus="none"
            keyword={keyword}
            isload={isload}
            total={total}
            count={count}
        />
    );
}

Search.propTypes = {};

export default Search;
