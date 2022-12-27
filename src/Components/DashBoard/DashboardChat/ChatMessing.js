import React from 'react';
import { toast } from 'react-toastify';
import { imageShow, videoShow } from '../../../utils/imageUpload';

function ChatMessing(props) {
    const { handleSubmitMessage, message, setMessage, setMedia, media } = props;

    const handleChangeMedia = (e) => {
        const files = [...e.target.files];
        let err = '';
        let newMedia = [];

        files.forEach(file => {
            if (!file) {
                return err = 'File does not exist';
            }

            if (file.size > 1024 * 1024 * 5) {
                return err = 'the image/video largest is 5mb'
            }

            return newMedia.push(file)
        });

        if (err) {
            toast.warning(err);
        }
        setMedia([...media, ...newMedia]);
    }

    return (
        <div>
            <div className='show-media'>
                {media.map(item => (
                    <div>
                        {item.type.match(/video/i)
                            ? videoShow(URL.createObjectURL(item))
                            : imageShow(URL.createObjectURL(item))
                        }
                    </div>
                ))}
            </div>
            <div className="row chat-messing">
                <div className="col-lg-1">
                    <i className="fad fa-plus-circle"></i>
                </div>
                <div className="col-lg-1 image-file">
                    <i className="fad fa-file-image"></i>
                    <input type="file" className="image-file-input" name="file" id="file" multiple accept='image/*,video/*' onChange={handleChangeMedia} />
                </div>
                <div className="col-lg-1">
                    <i className="fad fa-photo-video"></i>
                </div>
                <div className="col-lg-8">
                    <div className="input-form">
                        <input
                            placeholder="Nhập tin nhắn của bạn ..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-lg-1" onClick={handleSubmitMessage}>
                    <i className="fad fa-paper-plane"></i>
                </div>
            </div>
        </div>

    );
}

ChatMessing.propTypes = {};

export default ChatMessing;
