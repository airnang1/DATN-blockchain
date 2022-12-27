import React from 'react';
import { pay_method_img } from '../../../assets/fake-data';
import styled from 'styled-components';

const PayMethodStyle = styled.div`
    .pay-method {
        position: absolute;
        width: 300px;
        top: 88%;
        right: 30%;
        height: auto;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        box-shadow: 0px 0px 24px 1px #c0c0c0;
        border-radius: 7px;
        padding: 20px;
    }
    .col-6 {
        width: 100%;
    }
    .pay-method__img {
        width: 100%;
        cursor: pointer;
        transition: 0.5s ease;
        filter: grayscale(1);
        &:hover {
            transform: scale(1.1);
            filter: none;
        }
    }
    img {
        width: 100%;
    }
    .row.hidden {
        transition: 0.5s ease;
        visibility: hidden;
        opacity: 0;
    }
    .paypal.hidden {
        visibility: hidden;
        opacity: 0;
        display: none;
    }
`;
function PayMethod(props) {
    // eslint-disable-next-line no-unused-vars
    const { isShowTablePay, handleIntegrate, showPayPal } = props;

    return isShowTablePay ? (
        <PayMethodStyle>
            <div className="pay-method">
                <div
                    className={`row}`}
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    {pay_method_img.map((item, index) => (
                        <div className="col-6" key={index}>
                            <div
                                className="pay-method__img"
                                onClick={() => handleIntegrate(item)}
                            >
                                <img src={item.image} alt={item.title} />
                            </div>
                        </div>
                    ))}
                </div>
                {/* {showPayPal ? <Paypal showPayPal={showPayPal} /> : ''} */}
            </div>
        </PayMethodStyle>
    ) : (
        ''
    );
}

PayMethod.propTypes = {};

export default PayMethod;
