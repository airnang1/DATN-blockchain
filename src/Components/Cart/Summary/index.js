import React from 'react';
import { Affix } from 'antd';
import styled from 'styled-components';
import SummaryVoucher from './SummaryVoucher';
import SummaryCoin from './SummaryCoin';
import SummaryProductQerarion from './SummaryProductQerarion';

const SummaryStyled = styled.div`
    margin-bottom: 20px;
    margin-top: 10px;
    background: #fff;
    padding: 10px 0;
    border: 1px solid #dbdbdb;
    box-shadow: 0px 0px 5px 1px #89898942;
    span {
        font-size: 17px;
    }
    .ant-row {
        margin: inherit !important;
    }
    .ant-col {
        margin: 0;
    }
    .ant-col.ant-col-12.gutter-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .summary-voucher {
        display: flex;
        align-items: baseline;
    }
    p {
        margin: 0 10px;
    }
    .summary-check-title {
        display: flex;
        margin: 0 10px;
        align-items: baseline;
    }
    .summary-coin {
        display: flex;
        margin: 0 10px;
        align-items: baseline;
    }
    button {
        width: 100%;
    }
    i {
        font-size: 20px;
    }
    p.summary-coin-value {
        font-size: 33px;
        color: red;
    }
`;
function Summary(props) {
    const {
        totalProducts,
        onChangeAllProduct,
        cartProduct,
        deleteProductToCart,
        handleBuyProductCheck,
        handleBuyProductToPay,
        handleTextInfoAllSelect,
        handleTextInfoDelete,
    } = props;

    return (
        <Affix offsetBottom={10}>
            <SummaryStyled>
                <SummaryVoucher />
                <SummaryCoin />
                <SummaryProductQerarion
                    handleTextInfoAllSelect={handleTextInfoAllSelect}
                    handleTextInfoDelete={handleTextInfoDelete}
                    totalProducts={totalProducts}
                    cartProduct={cartProduct}
                    handleBuyProductCheck={handleBuyProductCheck}
                    onChangeAllProduct={onChangeAllProduct}
                    deleteProductToCart={deleteProductToCart}
                    handleBuyProductToPay={handleBuyProductToPay}
                />
            </SummaryStyled>
        </Affix>
    );
}

Summary.propTypes = {};

export default Summary;
