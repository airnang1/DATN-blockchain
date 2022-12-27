import React, { memo, useState } from 'react';
import { Input, Modal } from 'antd';
import SliderImgToProduct from './SliderImgToProduct';
import { useDispatch } from 'react-redux';
import { setLoadingAction } from '../../../Store/Reducer/loadingReducer';
import { isEmptyObjectAll } from '../../../utils';
import { imageUpload } from '../../../utils/imageUpload';

function UploadImageCategory(props) {
    const {
        importImg,
        image_field,
        handleRemoveImage,
        styleChange,
        handleSetImageField,
        imageId,
    } = props;
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageULR, setImageULR] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
        setImageULR('');
    };

    const handleOk = () => {
        setIsModalVisible(false);
        image_field && importImg(imageULR, image_field._id);
        setImageULR('');
    };


    const handleCancel = () => {
        setIsModalVisible(false);
        setImageULR('');
    };

    const handleImportImg = async (e) => {
        const file = e.target.files[0];
        dispatch(setLoadingAction(true));
        if (file) {
            const media = await imageUpload(file);
            setImageULR(media);
            dispatch(setLoadingAction(false));
            e.target.value = null;
        } else {
            alert('Upload file failed! ');
        }
    };

    return (
        <div className="file-img-setting">
            <label className="popup__upload config-img" onClick={showModal}>
                <div className="popup__photos">
                    <i className="fad fa-file-image" id="file-image"></i>
                </div>
            </label>
            <SliderImgToProduct
                image_field={image_field}
                handleRemoveImage={handleRemoveImage}
                handleSetImageField={handleSetImageField}
            />
            <Modal
                title="Tải hình ảnh"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{
                    disabled: isEmptyObjectAll({ status: imageULR }),
                }}
            >
                <div className="row">
                    <div className="col-md-8">
                        <div className="text-title">
                            Tải hình ảnh bằng địa chỉ URL
                        </div>
                        <div className="popup__img-url">
                            <Input
                                className="popup__img-url-input"
                                value={imageULR}
                                onChange={(e) => setImageULR(e.target.value)}
                            />
                        </div>
                        <div className="text-title">
                            Tải hình ảnh từ máy người dùng
                        </div>
                        <label
                            className="popup__upload config-img"
                            htmlFor={imageId}
                        >
                            <div
                                className="popup__photos"
                                style={{
                                    width: styleChange.width,
                                    height: styleChange.height,
                                }}
                            >
                                <i
                                    className="fad fa-file-image"
                                    id="file-image"
                                ></i>
                            </div>
                            <input
                                type="file"
                                name=""
                                id={imageId}
                                className="upload"
                                onChange={handleImportImg}
                            />
                        </label>
                    </div>
                    <div className="col-md-4">
                        <div className="text-title">Demo hình ảnh</div>
                        {imageULR && (
                            <img
                                src={imageULR}
                                alt=""
                                style={{ width: '100%', height: '100%' }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        'https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg';
                                }}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

UploadImageCategory.propTypes = {};

export default memo(UploadImageCategory);
