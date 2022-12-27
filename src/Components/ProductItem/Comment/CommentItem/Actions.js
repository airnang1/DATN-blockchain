import React, { useEffect } from 'react';
import { Button, Rate, Tooltip } from 'antd';
import {
    LikeFilled,
    LikeOutlined,
} from '@ant-design/icons';

function Actions(props) {
    const {
        comment,
        handleStatus,
        user,
        handleLikeAndUnLike,
        setIsLike,
        isLike,
    } = props;

    useEffect(() => {
        if (user) {
            if (comment.likes.length) {
                comment.likes.forEach((like) => {
                    if (like._id === user._id) {
                        setIsLike(true);
                    }
                });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comment.likes, user]);

    return [
        <Tooltip key="comment-basic-Star" title="Star">
            <span className="comment-star" style={{ marginRight: '20px' }}>
                <Rate defaultValue={comment.star} disabled />
            </span>
        </Tooltip>,
        <div style={{ marginRight: '20px' }} key={1}>
            <Tooltip key="comment-basic-like" title="Like">
                <span
                    onClick={handleLikeAndUnLike}
                    style={{ marginRight: '7px', cursor: 'pointer' }}
                >
                    {React.createElement(isLike ? LikeFilled : LikeOutlined)}
                    <span className="comment-action">
                        {comment.likes ? comment.likes.length : 0}
                    </span>
                </span>
            </Tooltip>
        </div>,
        <Button key="comment-basic-reply-to" type="link" onClick={handleStatus}>
            Reply to
        </Button>,
    ];
}

Actions.propTypes = {};

export default Actions;
