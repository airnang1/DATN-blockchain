import React, { useEffect } from 'react';
function CategorySetting(props) {
    const { isShowCategory, handleImportObjCategorySetting, image, input } =
        props;

    // useEffect(() => {
    //     return () => {
    //         image && URL.revokeObjectURL(image.preview);
    //     };
    // }, [image]);

    const handleImportImg = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        handleImportObjCategorySetting({ image: file.preview, title: input });
    };

    const handleChangeInput = (e) => {
        handleImportObjCategorySetting({ image: image, title: e.target.value });
    };

    return (
        <>
            {isShowCategory && (
                <div
                    className="row product-hunt"
                    style={{ alignItems: 'flex-start' }}
                >
                    <div
                        className="col-xs-2 col-md-2 date"
                        style={{ height: 70, padding: 10 }}
                    >
                        <label className="popup__upload" htmlFor="firstimg">
                            <div className="popup__photos">
                                <i
                                    className="fad fa-file-image"
                                    id="file-image"
                                ></i>
                            </div>
                            <input
                                type="file"
                                name=""
                                id="firstimg"
                                className="upload"
                                onChange={handleImportImg}
                            />
                            {image && (
                                <img id="displayImg" alt="" src={image} />
                            )}
                        </label>
                    </div>
                    <div className="col-xs-10 col-md-10">
                        <input
                            type="text"
                            className="input-title"
                            placeholder="nhập danh mục sản phẩm"
                            value={input}
                            onChange={handleChangeInput}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

CategorySetting.propTypes = {};

export default CategorySetting;
