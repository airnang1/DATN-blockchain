import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function EditableTagGroup(props) {
    const {
        passingInputArray,
        input_feild,
        handleRemoveTagInput,
        handleEditInputValue,
    } = props;

    const [state, setState] = useState({
        tags: [],
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
    });

    useEffect(() => {
        setState((state) => ({ ...state, tags: input_feild }));
    }, [input_feild]);

    const handleClose = (removedTagId) => {
        handleRemoveTagInput(removedTagId);
    };

    const showInput = () => {
        setState((state) => ({ ...state, inputVisible: true }));
    };

    const handleInputChange = (e) => {
        setState({ ...state, inputValue: e.target.value });
    };

    const handleInputConfirm = () => {
        const { inputValue } = state;
        let { tags } = state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        inputValue.length && passingInputArray(tags);

        setState({
            ...state,
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    const handleEditInputChange = (e) => {
        setState((state) => ({ ...state, editInputValue: e.target.value }));
    };

    const handleEditInputConfirm = () => {
        setState(({ tags, editInputIndex, editInputValue, ...state }) => {
            editInputValue.length === 0
                ? handleRemoveTagInput(tags[editInputIndex]._id)
                : handleEditInputValue(
                      tags[editInputIndex]._id,
                      editInputValue,
                  );

            return {
                ...state,
                tags: tags,
                editInputIndex: -1,
                editInputValue: '',
            };
        });
    };

    const inputRef = useRef(null);
    const saveInputRef = useCallback((input) => {
        inputRef.current = input;
    }, []);

    const editInput = useRef(null);
    const saveEditInputRef = (input) => {
        editInput.current = input;
    };
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } =
        state;

    useEffect(() => {
        if (state.inputVisible) {
            inputRef.current.focus();
        }
    }, [state, saveInputRef]);

    return (
        <>
            {tags.length
                ? tags.map((tag, index) => {
                      if (editInputIndex === index) {
                          return (
                              <Input
                                  ref={saveEditInputRef}
                                  key={index}
                                  size="small"
                                  className="tag-input"
                                  value={editInputValue}
                                  onChange={handleEditInputChange}
                                  onBlur={handleEditInputConfirm}
                                  onPressEnter={handleEditInputConfirm}
                              />
                          );
                      }

                      const isLongTag = tag.value && tag.value.length > 20;

                      const tagElem = (
                          <Tag
                              className="edit-tag"
                              key={tag._id}
                              closable={
                                  index !== 0 && index !== 1 && index !== 2
                              }
                              onClose={() => handleClose(tag._id)}
                          >
                              <span
                                  onDoubleClick={(e) => {
                                      if (index !== 0) {
                                          setState((state) => ({
                                              ...state,
                                              editInputIndex: index,
                                              editInputValue: tag.value,
                                          }));
                                          e.preventDefault();
                                      }
                                  }}
                              >
                                  {isLongTag
                                      ? `${tag.value.slice(0, 20)}...`
                                      : tag.value}
                              </span>
                          </Tag>
                      );
                      return isLongTag ? (
                          <Tooltip title={tag.value} key={tag._id}>
                              {tagElem}
                          </Tooltip>
                      ) : (
                          tagElem
                      );
                  })
                : ''}
            {inputVisible && (
                <Input
                    ref={saveInputRef}
                    type="text"
                    size="small"
                    className="tag-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                <Tag className="site-tag-plus" onClick={showInput}>
                    <PlusOutlined /> Thêm trường nhập dữ liệu
                </Tag>
            )}
        </>
    );
}
