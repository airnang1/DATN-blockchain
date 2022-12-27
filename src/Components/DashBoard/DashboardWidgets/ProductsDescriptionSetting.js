import React, { useState } from 'react';
import EditableTagGroup from './EditableTagGroup';
import SelectOptions from './SelectOptions';
import OptionsSelect from './OptionsSelect';
import { Input, Modal } from 'antd';
import { imageUpload } from '../../../utils/imageUpload';
import { useDispatch } from 'react-redux';
import { setLoadingAction } from '../../../Store/Reducer/loadingReducer';

export default function ProductsDescriptionSetting(props) {
    const {
        passingInputArray,
        input_feild,
        handleRemoveTagInput,
        importImg,
        image_field,
        handleEditInputValue,
        handleRemoveImage,
        handlePassingDataObj,
        select_field,
        handleRemoveOption,
        handlePassingEditOptions,
    } = props;
    const dispatch = useDispatch();
    const [isShowTableOptions, setisShowTableOptions] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageULR, setImageULR] = useState('');

    const handleIsShowTableOptions = (index) => {
        setisShowTableOptions(index);
        setIsShow(!isShow);
    };
    const handleCancelTableOptions = () => {
        setisShowTableOptions(null);
        setIsShow(!isShow);
    };
    const showModal = () => {
        setIsModalVisible(true);
        setImageULR('');
    };

    const handleOk = () => {
        setIsModalVisible(false);
        image_field && importImg(imageULR, image_field.id);
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
        <div className="product-description-setting">
            <div className="panel-body">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="input-options">
                            <div className="col-lg-12 panel-heading">
                                Thêm trường nhập dữ liệu
                            </div>
                            <div className="input-options-content">
                                <EditableTagGroup
                                    passingInputArray={passingInputArray}
                                    input_feild={input_feild}
                                    handleRemoveTagInput={handleRemoveTagInput}
                                    handleEditInputValue={handleEditInputValue}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="image-category-options">
                            <div className="col-lg-12 panel-heading">
                                Thêm hình ảnh danh mục sản phẩm
                            </div>
                            <div className="input-options-content">
                                <div className="file-img-setting">
                                    <label
                                        className="popup__upload config-img"
                                        onClick={showModal}
                                    >
                                        <div className="popup__photos">
                                            <i
                                                className="fad fa-file-image"
                                                id="file-image"
                                            ></i>
                                        </div>
                                    </label>
                                    <Modal
                                        title="Tải hình ảnh"
                                        visible={isModalVisible}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                    >
                                        <div className="row">
                                            <div className="col-md-8">
                                                <div className="text-title">
                                                    Tải hình ảnh bằng địa chỉ
                                                    URL
                                                </div>
                                                <div className="popup__img-url">
                                                    <Input
                                                        className="popup__img-url-input"
                                                        value={imageULR}
                                                        onChange={(e) =>
                                                            setImageULR(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="text-title">
                                                    Tải hình ảnh từ máy người
                                                    dùng
                                                </div>
                                                <label
                                                    className="popup__upload config-img"
                                                    htmlFor="imgCategoryId"
                                                >
                                                    <div
                                                        className="popup__photos"
                                                        style={{
                                                            width: '100px',
                                                            height: '100px',
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
                                                        id="imgCategoryId"
                                                        className="upload"
                                                        onChange={
                                                            handleImportImg
                                                        }
                                                    />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="text-title">
                                                    Demo hình ảnh
                                                </div>
                                                {imageULR && (
                                                    <img
                                                        src={imageULR}
                                                        alt=""
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                        }}
                                                        onError={(e) => {
                                                            e.target.onerror =
                                                                null;
                                                            e.target.src =
                                                                'https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg';
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </Modal>
                                    {image_field &&
                                        image_field.map((item) => (
                                            <div
                                                className="image-files"
                                                key={item.id}
                                            >
                                                <img
                                                    alt="example"
                                                    style={{ width: '100%' }}
                                                    src={item.value}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src =
                                                            'https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg';
                                                    }}
                                                />
                                                <i
                                                    className="fad fa-times-square"
                                                    onClick={() =>
                                                        handleRemoveImage(item)
                                                    }
                                                ></i>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="col-lg-12 panel-heading">
                            Danh sách các trường tùy chọn
                        </div>
                        <div className="select-options">
                            <div className="select-options-content-box">
                                <div className="row">
                                    {select_field &&
                                        select_field.map((item, index) => (
                                            <div
                                                className="col-md-2"
                                                key={item.id}
                                            >
                                                <OptionsSelect
                                                    item={item}
                                                    index={index}
                                                    handleIsShowTableOptions={
                                                        handleIsShowTableOptions
                                                    }
                                                    isShowTableOptions={
                                                        isShowTableOptions
                                                    }
                                                    handleCancelTableOptions={
                                                        handleCancelTableOptions
                                                    }
                                                    handleRemoveOption={
                                                        handleRemoveOption
                                                    }
                                                    isShow={isShow}
                                                    handlePassingEditOptions={
                                                        handlePassingEditOptions
                                                    }
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="col-lg-12 panel-heading">
                                Tạo trường tùy chọn
                            </div>
                            <div className="select-options-content">
                                <SelectOptions
                                    handlePassingDataObj={handlePassingDataObj}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
