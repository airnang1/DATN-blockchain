import React from 'react';
import { Col } from 'antd';

function AmountProduct(props) {
    const { handleRemoveNum, onHandleValueNum, handleSumNum } = props;
    
    return (
        <Col className="gutter-row" span={4}>
            <div className="buttons_added">
                <button
                    className="minus is-form"
                    type="button"
                    onClick={() => handleRemoveNum()}
                    style={{
                        width: '35px',
                        height: '35px',
                        background: '#fff',
                    }}
                >
                    <i className="far fa-minus"></i>
                </button>
                <input
                    aria-label="quantity"
                    className="input-qty"
                    max="Số tối đa"
                    min="Số tối thiểu"
                    name=""
                    type="number"
                    placeholder={onHandleValueNum()}
                    style={{
                        width: '70px',
                        height: '35px',
                        background: '#fff',
                        fontSize: 17,
                    }}
                />
                <button
                    className="plus is-form"
                    type="button"
                    onClick={() => handleSumNum()}
                    style={{
                        width: '35px',
                        height: '35px',
                        background: '#fff',
                    }}
                >
                    <i className="fad fa-plus"></i>
                </button>
            </div>
        </Col>
    );
}

AmountProduct.propTypes = {};

export default AmountProduct;
