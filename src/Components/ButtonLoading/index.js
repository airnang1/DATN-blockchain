import React, { useState } from 'react';
import { Button } from 'antd';

function ButtonLoading(props) {
    const { name, handleLoadingProductCart, className } = props;
    const [loadings, setLoadings] = useState(false);

    const enterLoading = () => {
        setLoadings(true);
        setTimeout(() => {
            setLoadings(false);
            handleLoadingProductCart();
        }, 1000);
    };

    return (
        <Button
            type="primary"
            loading={loadings}
            onClick={enterLoading}
            size="middle"
            className={className}
        >
            {name}
        </Button>
    );
}

ButtonLoading.propTypes = {};

export default ButtonLoading;
