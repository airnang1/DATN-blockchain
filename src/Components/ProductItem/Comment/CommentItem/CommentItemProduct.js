/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Avatar, Button, Comment, Tooltip } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import ActionItem from './ActionItem';
import moment from 'moment';
import { humanImg } from '../../../../assets/fake-data/human';

function CommentItemProduct(props) {
    const { replyComment } = props;
    const [showCmt, setShowCmt] = useState(null);
    const [statusHeight, setStatusHeight] = useState(false);

    const handleCommentsList = (key) => {
        setShowCmt(key);
        setStatusHeight(!statusHeight);
    };

    return (
        <>
            {replyComment.length ? (
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
                    {!statusHeight ? 'Xem' : 'Ẩn'} {replyComment.length} câu trả
                    lời
                </Button>
            ) : (
                ''
            )}
            {replyComment.length
                ? replyComment.map((itemCmt, i) => (
                      <div
                          className="list-comment-item"
                          key={i}
                          style={{
                              height: statusHeight ? 'auto' : '0px',
                          }}
                      >
                          <Comment
                              author={<a>{itemCmt.user?.username}</a>}
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
                                          {moment(itemCmt.createdAt).fromNow()}
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
        </>
    );
}

CommentItemProduct.propTypes = {};

export default CommentItemProduct;
