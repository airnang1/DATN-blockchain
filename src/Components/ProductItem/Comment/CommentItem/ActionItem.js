import React, { useState } from 'react';
import { Tooltip } from 'antd';
import {
    LikeFilled,
    LikeOutlined,
} from '@ant-design/icons';

function ActionItem(props) {
    const { item } = props;
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    const like = (like) => {
        likes <= like ? setLikes(likes + 1) : setLikes(likes);
        // eslint-disable-next-line no-unused-expressions
        action === 'disliked' ? setDislikes(dislikes - 1) : '';
        setAction('liked');
    };

    return [
        <div style={{ marginRight: '20px' }} key={1}>
            <Tooltip key="comment-basic-like" title="Like">
                <span
                    onClick={() => like(item.like)}
                    style={{ marginRight: '7px', cursor: 'pointer' }}
                >
                    {React.createElement(
                        action === 'liked' ? LikeFilled : LikeOutlined,
                    )}
                    <span className="comment-action">{likes ? likes : 0}</span>
                </span>
            </Tooltip>
        </div>,
    ];
}

ActionItem.propTypes = {};

export default ActionItem;
