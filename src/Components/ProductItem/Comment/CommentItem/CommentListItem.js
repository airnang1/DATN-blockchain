/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
 
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';

function CommentListItem({ comment }) {
    const renderUI = () =>
        comment.map((item, i) => (
            <Comment
                key={i}
                author={<a>{item.author}</a>}
                avatar={<Avatar src={item.avatar} alt={item.author} />}
                content={item.content}
                datetime={
                    item.date ? (
                        <Tooltip title={item.date}>
                            <span>{item.datetime}</span>
                        </Tooltip>
                    ) : (
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{item.datetime}</span>
                        </Tooltip>
                    )
                }
            ></Comment>
        ));

    return { renderUI };
}

CommentListItem.propTypes = {};

export default CommentListItem;
