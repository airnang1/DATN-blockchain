import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import SelectEditOptions from './SelectEditOptions';

function OptionsSelect(props) {
    const {
        item,
        index,
        handleIsShowTableOptions,
        isShowTableOptions,
        handleCancelTableOptions,
        handleRemoveOption,
        isShow,
        handlePassingEditOptions,
    } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [objData, setObjData] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        handlePassingEditOptions(objData);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSendOptions = (data) => {
        setObjData(data);
    };

    return (
        <div className="options">
            <Modal
                title="Basic Modal"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <SelectEditOptions
                    item={item}
                    handleSendOptions={handleSendOptions}
                />
            </Modal>
            <div
                className="options-box"
                onClick={() => handleIsShowTableOptions(index)}
            >
                <div className="options__title">
                    <p>{item && item.name}</p>
                </div>
                <div className="options__icon">
                    {isShow && isShowTableOptions === index ? (
                        <i className="fal fa-chevron-down"></i>
                    ) : (
                        <i className="fal fa-chevron-up"></i>
                    )}
                </div>
            </div>
            {isShow && isShowTableOptions === index && (
                <div
                    className={`options__content ${
                        isShowTableOptions === index ? 'active' : ''
                    }`}
                >
                    <div className="options__content-item">
                        <div className="row options__content-item-row">
                            <div className="row">
                                {item &&
                                    item.options.map((option, index) => (
                                        <div className="col-md-3" key={index}>
                                            <div
                                                className="select-options-content-box"
                                                key={index}
                                            >
                                                <span className="options__content-item-box">
                                                    {option}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="options__content-action">
                        <Button
                            type="dashed"
                            style={{ marginRight: 20 }}
                            onClick={showModal}
                        >
                            Update
                        </Button>
                        {item && item.name !== 'category' ? (
                            <Button
                                type="dashed"
                                danger
                                onClick={() => handleRemoveOption(item._id)}
                            >
                                Delete
                            </Button>
                        ) : (
                            ''
                        )}
                    </div>
                    <div
                        className="options-cancel"
                        onClick={handleCancelTableOptions}
                    >
                        <i className="fal fa-times"></i>
                    </div>
                </div>
            )}
        </div>
    );
}

OptionsSelect.propTypes = {};

export default OptionsSelect;
