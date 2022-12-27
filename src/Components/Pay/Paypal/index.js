import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const PaypalStyle = styled.div`
    .paypal {
        margin-right: 30px;
    }
`;
function Paypal(props) {
    const { showPayPal } = props;
    const paypal = useRef();

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                            {
                                description: 'Cool looking table',
                                amount: {
                                    currency_code: 'CAD',
                                    value: 650.0,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log('Successful order:' + order);
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <PaypalStyle>
            <div className={`paypal ${!showPayPal ? 'hidden' : ''}`}>
                <div ref={paypal}></div>
            </div>
        </PaypalStyle>
    );
}

Paypal.propTypes = {};

export default Paypal;
