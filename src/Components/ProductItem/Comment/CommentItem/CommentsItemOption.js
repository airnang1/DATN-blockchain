import React, { memo, useRef, useState } from "react";

import Actions from "./Actions";
import EditItem from "./EditItem";
import CommentItemProduct from "./CommentItemProduct";
import { humanImg } from "../../../../assets/fake-data/human";
import { Comment, Tooltip, Avatar, Dropdown, Menu } from "antd";
import moment from "moment";
import styled from "styled-components";
import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  likeComment,
  unLikeComment,
} from "../../../../Store/Reducer/comments_user";

const UploadStyle = styled.div`
  .ant-image {
    margin-right: 10px;
  }
  .ant-comment-nested {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .ant-comment-nested {
    display: grid !important;
  }
  .ant-comment-content-detail {
    font-size: 16px;
    color: #646464;
  }
  .list-comment-item {
    height: 5px;
    overflow: hidden;
  }
  button.ant-btn.ant-btn-link {
    width: 50px;
  }
`;

function CommentsItemOption({
  styleCommentItem,
  comment,
  handleStatus,
  handleSetActiveCmt,
  handleSetIndex,
  handleSetImgshow,
  commentMediaUrl,
  mediaShowActive,
  index,
  user,
  idAuthor,
  handleInSertCmt,
  setValue,
  value,
  product,
  tokenAuth,
  replyComment,
  setReplyComment,
  axiosJWT,
}) {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [isLike, setIsLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const handleLikeAndUnLike = () => {
    if (loadLike) return;
    if (isLike) {
      setIsLike(false);
      setLoadLike(true);
      dispatch(
        unLikeComment({ comment, product, tokenAuth, user, dispatch, axiosJWT })
      );
      setLoadLike(false);
    } else {
      setIsLike(true);
      setLoadLike(true);
      dispatch(
        likeComment({ comment, product, tokenAuth, user, dispatch, axiosJWT })
      );
      setLoadLike(false);
    }
  };

  const handleUnLike = () => {};

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item
        key="1"
        icon={<EditOutlined />}
        onClick={() => setOnEdit(true)}
      >
        Chỉnh sửa bình luận của bạn
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />}>
        Xóa bình luận của bạn
      </Menu.Item>
    </Menu>
  );

  function handleMenuClick(e) {
    console.log("click", e);
  }

  function handleButtonClick(e) {
    console.log("click left button", e);
  }

  return (
    <UploadStyle key={comment._id}>
      <Comment
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        author={<a href="#">{comment.user && comment.user.username}</a>}
        avatar={
          <Avatar
            src={
              comment.user && comment.user.profilePicture
                ? comment.user.profilePicture
                : humanImg
            }
            alt={comment.user && comment.user.username}
          />
        }
        content={
          onEdit ? (
            <textarea
              rows={5}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            ></textarea>
          ) : (
            <span>{comment.content}</span>
          )
        }
        datetime={
          <Tooltip title={comment.createdAt}>
            <span>{moment(comment.createdAt).fromNow()}</span>
          </Tooltip>
        }
        style={styleCommentItem}
      >
        <div
          className="comment-actions"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "baseline",
            transform: "translateY(-10px)",
          }}
        >
          <Actions
            comment={comment}
            handleStatus={() => {
              if (comment) {
                return handleStatus(comment, comment._id);
              }
            }}
            handleLikeAndUnLike={handleLikeAndUnLike}
            handleUnLike={handleUnLike}
            user={user}
            setIsLike={setIsLike}
            isLike={isLike}
          />
          {user && comment.user && comment.user._id === user._id ? (
            <Dropdown.Button
              onClick={handleButtonClick}
              overlay={menu}
              type="text"
            />
          ) : (
            ""
          )}
        </div>

        <div
          className="comment-actions-check"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "baseline",
            transform: "translateY(-10px)",
          }}
        >
          <div className="comment-media">
            {comment.media && comment.media.image.length
              ? comment.media.image.map((img, i) => (
                  <div
                    className="comment-media-item"
                    key={i}
                    onClick={() => handleSetImgshow(img, comment._id)}
                  >
                    <img
                      src={img.url}
                      alt=""
                      style={{
                        border:
                          commentMediaUrl === img.url
                            ? "1px solid #c0c0c0"
                            : "",
                      }}
                    />
                  </div>
                ))
              : ""}
            {comment.media && comment.media.video.length
              ? comment.media.video.map((vid, i) => (
                  <div
                    className="comment-media-item"
                    key={i}
                    onClick={() => handleSetImgshow(vid, comment._id)}
                  >
                    <video
                      style={{
                        display: "none",
                      }}
                      ref={videoRef}
                    >
                      <source src={vid.url} type="video/mp4" />
                    </video>
                    <img
                      controls
                      src={
                        "https://www.pngall.com/wp-content/uploads/5/Video-Player-PNG-Picture.png"
                      }
                      className="d-block w-100"
                      alt={vid.url}
                    />
                    <span className="media-video-currentime">
                      {videoRef.current && videoRef.current.duration}
                    </span>
                  </div>
                ))
              : ""}
          </div>
          <div
            className="comment-media-show"
            style={{
              transition: "0.5s ease-in-out",
              display: mediaShowActive === comment._id ? "block" : "none",
              position: "relative",
            }}
          >
            <CloseOutlined
              onClick={() => handleSetImgshow("", "none")}
              style={{ zIndex: 1, position: "absolute", top: 35, right: 20 }}
            />
            {commentMediaUrl?.match(/video/i) ? (
              <video
                controls
                src={commentMediaUrl}
                className="d-block w-100"
                alt={commentMediaUrl}
              />
            ) : (
              <img
                src={commentMediaUrl}
                className="d-block w-100"
                alt={commentMediaUrl}
              />
            )}
          </div>
        </div>
        <CommentItemProduct
          replyComment={replyComment.filter(
            (item) => item.reply === comment._id
          )}
        />
        {comment._id === index ? (
          <Comment
            avatar={
              <Avatar
                src={user.profilePicture || humanImg}
                alt={user.username}
              />
            }
            content={
              <EditItem
                idAuthor={idAuthor}
                handleSetIndex={handleSetIndex}
                handleInSertCmt={handleInSertCmt}
                comment={comment}
                handleSetActiveCmt={handleSetActiveCmt}
                user={user}
                product={product}
                setReplyComment={setReplyComment}
              />
            }
          />
        ) : (
          ""
        )}
      </Comment>
    </UploadStyle>
  );
}

CommentsItemOption.propTypes = {};

export default memo(CommentsItemOption);
