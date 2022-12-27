import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { useDispatch } from 'react-redux';
import { putUpdateLikeProduct } from '../../../../Store/Reducer/product';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

function ProductLike(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, likes, auth, productId, axiosJWT } = props;
    const [like, setLike] = useState(false);

    useEffect(() => {
        if (auth.user) {
            if (likes) {
                setLike(likes.includes(auth.user._id));
            }
        }
    }, [likes, auth.user]);

    const handleUpdateLikeProduct = () => {
        if (auth.user && auth.tokenAuth) {
            dispatch(putUpdateLikeProduct({ auth, productId, axiosJWT }));
        } else {
            toast.warning('Bạn cần phải đăng nhập để sử dụng dịch vụ này');
            history.push('/buyer/signin');
        }
    };

    const renderHearlActive = () =>
        !like ? (
            <i className="fal fa-heart" onClick={handleUpdateLikeProduct}></i>
        ) : (
            <i
                className="fas fa-heart"
                onClick={() =>
                    dispatch(putUpdateLikeProduct({ auth, productId, axiosJWT }))
                }
            ></i>
        );
    return (
        <>
            {loading ? (
                <Skeleton.Button
                    active={true}
                    size="large"
                    shape="default"
                    block={false}
                    style={{ width: 140 }}
                />
            ) : (
                <div className="product-like">
                    {renderHearlActive()}
                    <p className="product-cmt">
                        {like ? 'Đã Thích' : 'Thích'} ({likes?.length})
                    </p>
                </div>
            )}
        </>
    );
}

ProductLike.propTypes = {};

export default ProductLike;
