import React from 'react';
import { Button, Empty } from 'antd';
import { Link } from 'react-router-dom';

function EmptyComponent(props) {
    return (
        <Empty
            image="https://bizweb.dktcdn.net/100/333/755/themes/688335/assets/empty_cart.png?1593138362803"
            imageStyle={{
                height: 200,
            }}
            description={
                <span style={{ fontSize: '20px', color: '#959595' }}>
                    Giỏ Hàng Của Bạn Còn Trống
                </span>
            }
        >
            <Link to="/">
                <Button style={{ marginBottom: 150 }} type="primary">
                    Mua Ngay
                </Button>
            </Link>
        </Empty>
    );
}

EmptyComponent.propTypes = {};

export default EmptyComponent;
