export const checkImage = (file) => {
    let err = '';
    if (!file) return (err = 'file does not exist.');

    if (file.size > 1024 * 1024) return (err = 'the largest image is 1mb'); // 1mb;

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return (err = 'image format is incorrect');

    return err;
};

export const imagesUpload = async (images) => {
    let imgArr = [];
    for (const item of images) {
        const formDataImg = new FormData();

        if (item.camera) {
            formDataImg.append('file', item.camera);
        } else {
            formDataImg.append('file', item);
        }
        formDataImg.append('upload_preset', 'bjy8aues');
        formDataImg.append('cloud_name', 'hoang-long');

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/hoang-long/upload',
            {
                method: 'POST',
                body: formDataImg,
            },
        );

        const data = await res.json();
        imgArr.push({ url: data.secure_url });
    }
    return imgArr;
};

export const imageUpload = async (image) => {
    if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'bjy8aues');
        formData.append('cloud_name', 'hoang-long');

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/hoang-long/upload',
            {
                method: 'POST',
                body: formData,
            },
        );
        const data = await res.json();
        return data.secure_url;
    }
};

export const imageShow = (src) => {
    return <img className="shareImg img-thumbnail" src={src} alt="posts" />;
};

export const videoShow = (src) => {
    return (
        <video
            controls
            className="shareImg img-thumbnail"
            src={src}
            alt="posts"
        />
    );
};
