import React from 'react';
import { Form, Button, Input, Rate } from 'antd';
import UploadItem from './Upload';
import { desc } from '../../../assets/fake-data';
const { TextArea } = Input;

export const Editor = ({
    onChange,
    onSubmit,
    submitting,
    value,
    star,
    handleChangeStar,
}) => (
    <>
        <p className="comment_author-name">Phạm Công Tuấn</p>
        <Rate tooltips={desc} onChange={handleChangeStar} defaultValue={star} />
        {star ? <span className="ant-rate-text">{desc[star - 1]}</span> : ''}
        <Form.Item>
            <TextArea
                rows={4}
                onChange={onChange}
                defaultValue={value}
                placeholder="Nhập bình luận của bạn..."
            />
        </Form.Item>
        <UploadItem />
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
