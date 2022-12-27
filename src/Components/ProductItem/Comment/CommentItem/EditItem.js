import React, { useState } from 'react';
import { Button, Form } from 'antd';
import styled from 'styled-components';

const Edit = styled.div`
    input.input-cmt-product-chidlren {
        outline: none;
        border: none;
        border-bottom: 1px dotted;
        width: 400px;
    }
`;

function EditItem(props) {
    const {
        handleSetIndex,
        handleInSertCmt,
        comment,
        handleSetActiveCmt,
        user,
    } = props;
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        if (!value) {
            return;
        }
        setSubmitting(true);

        let newComment = {
            content: value.trim(),
            likes: [],
            user,
            star: 0,
            reply: comment._id,
            tag: comment.user,
        };

        setTimeout(() => {
            setSubmitting(false);
            setValue('');
            handleSetIndex(null);
            handleInSertCmt(newComment);
        }, 1000);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <Edit>
            <p className="comment_author-name">{user.username}</p>
            <Form.Item>
                <span className="reply-user">@{comment.user.username}:</span>{' '}
                <input
                    className="input-cmt-product-chidlren"
                    placeholder="Phản hồi công khai..."
                    onChange={handleChange}
                    defaultValue={value}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type=""
                    style={{ color: '#333', marginLeft: 200 }}
                    onClick={handleSetActiveCmt}
                >
                    Huỷ
                </Button>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={handleSubmit}
                    type="primary"
                    disabled={value ? false : true}
                    style={{ color: '#333', marginLeft: 20 }}
                >
                    Add Comment
                </Button>
            </Form.Item>
        </Edit>
    );
}

EditItem.propTypes = {};

export default EditItem;
