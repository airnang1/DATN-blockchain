import React from 'react';
 
import EditItem from './EditItem';
import { Avatar, Comment } from 'antd';

function CommentItemChildren(props) {
    const { onChange, onSubmit, submitting, value } = props;
    return (
        <Comment
            avatar={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                />
            }
            content={
                <EditItem
                    onChange={onChange}
                    onSubmit={onSubmit}
                    submitting={submitting}
                    value={value}
                />
            }
        />
    );
}

CommentItemChildren.propTypes = {};

export default CommentItemChildren;
