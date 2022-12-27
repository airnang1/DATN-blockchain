import React, {useState } from 'react';
import styled from 'styled-components';
import { Avatar, Spin } from 'antd';
import { humanImg } from '../../../../assets/fake-data/human';
import { imageUpload } from '../../../../utils/imageUpload';

const FileUserEdit = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    input[type='file'] {
        display: none;
    }
    label.file-custom {
        color: #fff;
        height: 45px;
        width: 120px;
        background: #45a8ff;
        margin: auto;
        font-size: 17px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        cursor: pointer;
        box-shadow: 1px 0px 5px 1px #c8c8c8;
        transform: translateY(10px);
    }
    i {
        font-size: 16px;
        margin-right: 8px;
    }
`;

function UploadFileImg(props) {
    const { photoURL, importImg } = props;
    const [imgUser, setImgUser] = useState('');
    const [isLoadingImage, setIsLoadingImage] = useState(false);

    const chooseFileImg = async (e) => {
        setIsLoadingImage(true);
        const fileInput = e.target;
        if (fileInput.files && fileInput.files[0]) {
            const imageURL = await imageUpload(fileInput.files[0]);
            setImgUser(imageURL);
            importImg(imageURL);
        }
        setIsLoadingImage(false);
    };

    return (
        <FileUserEdit className="file-user-edit">
            {isLoadingImage ? (
                <div className="example-image-loading">
                    <Spin />
                </div>
            ) : (
                <Avatar
                    size={150}
                    src={imgUser ? imgUser : photoURL ? photoURL : humanImg}
                />
            )}

            <input
                type="file"
                onChange={(e) => chooseFileImg(e)}
                accept="image/gif, image/jpeg, image/png"
                id="file"
            />
            <label className="file-custom" htmlFor="file">
                <i className="fas fa-file-image"></i>Tải ảnh lên
            </label>
        </FileUserEdit>
    );
}

UploadFileImg.propTypes = {};

export default UploadFileImg;
