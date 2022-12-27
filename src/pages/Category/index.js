import { useEffect } from 'react';
import {
    data10,
    data2,
    data3,
    data4,
    data5,
    data6,
    data7,
    data8,
    data9,
    slide_mobile,
} from '../../assets/fake-data';
import CategoryPage from '../../Components/Product/Mobile/CategoryPage';
import { useHistory, useParams } from 'react-router';
import {
    categorySelector,
    handleSetLoadingCategory,
    handleSetProducts,
    useGetAllCategoryQuery,
} from '../../Store/Reducer/categoryReducer';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

function Category(props) {
    const { category, keyWork } = useParams();

    const history = useHistory();
    const dispatch = useDispatch();
    const productsCategory = useSelector(categorySelector);
    const { products, isload, total, count, trademark } = productsCategory;

    const num = history.location.search.slice(6) || 1;
    const { error, isLoading, data } = useGetAllCategoryQuery({
        category,
        keyword: keyWork,
        numPage: num ? num : 1,
    });

    useEffect(() => {
        if (data) {
            dispatch(handleSetLoadingCategory(isLoading));
            dispatch(handleSetProducts(data));
        }
    }, [data, isLoading, dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(`get category fail 😓`);
        }
    }, [error]);

    return (
        <CategoryPage
            products={products}
            data10={data10}
            data2={data2}
            data3={data3}
            data4={data4}
            data5={data5}
            data6={data6}
            data7={data7}
            data8={data8}
            data9={data9}
            slide_mobile={slide_mobile}
            category1="common"
            category2="landline"
            category={category}
            title="Mobile"
            slideStatus="block"
            isload={isload}
            total={total}
            count={count}
            keyword={keyWork}
            trademark={trademark}
        />
    );
}

Category.propTypes = {};

export default Category;
