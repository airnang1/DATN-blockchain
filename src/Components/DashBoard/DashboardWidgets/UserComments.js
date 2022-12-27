/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { createElement, useEffect, useState } from 'react';
import { Comment, Tooltip, Avatar, Rate, Button, Image } from 'antd';
import moment from 'moment';
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
    CaretUpOutlined,
    CaretDownOutlined,
} from '@ant-design/icons';
import { humanImg } from '../../../assets/fake-data/human';
import ActionItem from '../../ProductItem/Comment/CommentItem/ActionItem';

function UserComments(props) {
    const { comment, replyComment, comments } = props;
    const [action, setAction] = useState(null);
    const [statusHeight, setStatusHeight] = useState(false);
    const [commentsReply, setCommentsReply] = useState([]);

    useEffect(() => {
        if (comments) {
            const commentReply = [];
            comments.forEach((commentItem) => {
                if (commentItem.reply === comment._id) {
                    commentReply.push(commentItem);
                }
            });
            setCommentsReply(commentReply);
        }
    }, [comment, comments]);

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{comment.likes.length}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span>
                {React.createElement(
                    action === 'disliked' ? DislikeFilled : DislikeOutlined,
                )}
                <span className="comment-action">
                    {comment.dislikes.length}
                </span>
            </span>
        </Tooltip>,
    ];

    const ExampleComment = ({ children }) => (
        <Comment
            actions={actions}
            author={<a>{comment.user && comment.user.username}</a>}
            avatar={
                <Avatar
                    src={comment.user && comment.user.profilePicture}
                    alt="user picture"
                />
            }
            content={<p>{comment.content}</p>}
            datetime={
                <Tooltip title={comment.createdAt}>
                    <span>{comment.createdAt}</span>
                </Tooltip>
            }
        >
            <div className="rate-comment">
                <Rate disabled value={comment.star} />
            </div>
            {children}
        </Comment>
    );

    const handleCommentsList = (key) => {
        setStatusHeight(!statusHeight);
    };

    return (
        <div className="user-comments">
            <ExampleComment>
                <div className="comments-media">
                    {comment.media.image.map((item, index) => (
                        <div className="image-comment" key={index}>
                            <Image width={100} src={item.url} key={item._id} />
                        </div>
                    ))}
                    {comment.media.video.map((item, index) => (
                        <div key={index}>
                            <video
                                controls
                                src={item.url}
                                className="d-block w-100"
                                alt={item.url}
                                style={{ width: '200px' }}
                            />
                        </div>
                    ))}
                </div>
                {commentsReply.length ? (
                    <Button
                        type="link"
                        icon={
                            statusHeight ? (
                                <CaretUpOutlined />
                            ) : (
                                <CaretDownOutlined />
                            )
                        }
                        onClick={handleCommentsList}
                    >
                        {!statusHeight ? 'Xem' : 'Ẩn'} {commentsReply.length}{' '}
                        câu trả lời
                    </Button>
                ) : (
                    ''
                )}

                {commentsReply.length
                    ? commentsReply.map((itemCmt, i) => (
                          <div
                              className="list-comment-item"
                              key={i}
                              style={{
                                  height: statusHeight ? 'auto' : '0px',
                                  display: statusHeight ? 'block' : 'none',
                              }}
                          >
                              <Comment
                                  author={<a href="#">{itemCmt.user?.username}</a>}
                                  avatar={
                                      <Avatar
                                          src={
                                              itemCmt.user?.profilePicture ||
                                              humanImg
                                          }
                                          alt={itemCmt.user?.username}
                                      />
                                  }
                                  content={itemCmt.content}
                                  datetime={
                                      <Tooltip title={itemCmt.createdAt}>
                                          <span>
                                              {moment(
                                                  itemCmt.createdAt,
                                              ).fromNow()}
                                          </span>
                                      </Tooltip>
                                  }
                              >
                                  <div
                                      className="comment-actions"
                                      style={{
                                          display: 'flex',
                                          justifyContent: 'flex-start',
                                          alignItems: 'baseline',
                                          transform: 'translateY(-10px)',
                                      }}
                                  >
                                      <ActionItem item={itemCmt} />
                                  </div>
                              </Comment>
                          </div>
                      ))
                    : ''}
                <hr />
            </ExampleComment>
        </div>
    );
}

UserComments.propTypes = {};

export default UserComments;
