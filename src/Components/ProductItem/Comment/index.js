import React, { memo, useCallback, useEffect, useState } from 'react';
import Paginations from './Pagination/index';
import { Avatar, Comment} from 'antd';
import CommentItem from './CommentItem';
import { toast } from 'react-toastify';
import { imagesUpload } from '../../../utils/imageUpload';
import EditorComment from './EditorComment';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCommentsToProduct,
    productItemSelector,
} from '../../../Store/Reducer/product';
import { humanImg } from '../../../assets/fake-data/human';
import { setLoadingAction } from '../../../Store/Reducer/loadingReducer';

function Comments(props) {
    const { commentsUser, product, handleInSertCmt, user, tokenAuth,axiosJWT } = props;
    const history = useHistory();
    const dispatch = useDispatch();

    const totalComments = useSelector(productItemSelector);

    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const [star, setStar] = useState(0);
    const [img, setimg] = useState([]);
    const [video, setvideo] = useState([]);

    const { search } = history.location;

    const { total } = totalComments;

    useEffect(() => {
        setComments(commentsUser);
    }, [commentsUser]);

    useEffect(() => {
        if (!product) {
            dispatch(getCommentsToProduct({ productId: product._id, search }));
        }
    }, [dispatch, product, search]);

    const handleSubmit = async (e) => {
        if (value) {
            e.preventDefault();
            setSubmitting(true);
            const imgURL = [];
            const videoURL = [];
            let imageMedia = [];
            let videoMedia = [];
            if (img.length) {
                img.forEach((el) => {
                    if (el.thumbUrl) {
                        imgURL.push(el.thumbUrl);
                    }
                });
                imageMedia = await imagesUpload(imgURL);
            }
            if (video.length) {
                video.forEach(async (el) => {
                    if (el.originFileObj) {
                        videoURL.push(el.originFileObj);
                    }
                });
                videoMedia = await imagesUpload(videoURL);
            }

            setTimeout(() => {
                setSubmitting(false);
                setValue('');
                setStar(0);
                handleInSertCmt({
                    user: user,
                    star: star,
                    content: value.trim(),
                    tag: {},
                    media: {
                        image: imageMedia,
                        video: videoMedia,
                    },
                });

                setimg([]);
                setvideo([]);
            }, 1000);
        } else {
            toast.warning('Bạn chưa nhập nội dung vào trường này');
        }
    };

    const handleChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const handleChangeStar = (value) => {
        setStar(value);
    };

    const importImg = useCallback((media) => {
        media.forEach(async (element) => {
            if (element.type === 'video/mp4') {
                setvideo([element]);
            } else if (element.type === 'image/jpeg' || element.type === 'image/png') {
                setimg(media);
            }
        });
    }, []);

    const handlePagination = (num) => {
        dispatch(setLoadingAction(true));
        const search = `?page=${num}`;
        dispatch(getCommentsToProduct({ productId: product._id, search }));
        dispatch(setLoadingAction(false));
    };

    return (
        <>
            {user && tokenAuth && (
                <Comment
                    avatar={<Avatar src={user.profilePicture || humanImg} alt={user.username} size={30} />}
                    content={
                        <EditorComment
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                            star={star}
                            handleChangeStar={handleChangeStar}
                            importImg={importImg}
                            img={img}
                            video={video}
                            user={user}
                        />
                    }
                />
            )}
            <CommentItem
                comments={comments}
                handleInSertCmt={handleInSertCmt}
                user={user}
                product={product}
                setValue={setValue}
                value={value}
                tokenAuth={tokenAuth}
                axiosJWT={axiosJWT}
            />
            <Paginations total={total} callBack={handlePagination} />
            <br />
        </>
    );
}

Comments.propTypes = {};

export default memo(Comments);
