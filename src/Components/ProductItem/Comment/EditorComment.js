import React, { memo } from 'react';
import UploadItem from './Upload';
import { desc } from '../../../assets/fake-data';
import { Form, Button, Input, Rate } from 'antd';
const { TextArea } = Input;

function EditorComment({
    onChange,
    onSubmit,
    submitting,
    value,
    star,
    handleChangeStar,
    img,
    video,
    user,
    importImg,
}) {
    return (
        <>
            <p className="comment_author-name">{user.displayName}</p>
            <Rate tooltips={desc} onChange={handleChangeStar} value={star} />
            {star ? (
                <span className="ant-rate-text">{desc[star - 1]}</span>
            ) : (
                ''
            )}
            <Form.Item>
                <TextArea
                    rows={4}
                    onChange={onChange}
                    value={value}
                    placeholder="Nhập bình luận của bạn..."
                />
            </Form.Item>
            <UploadItem importImg={importImg} img={img} video={video} />
            <Form.Item>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                    style={{ color: '#fff' }}
                >
                    Add Comment
                </Button>
            </Form.Item>
        </>
    );
}

export default memo(EditorComment);
