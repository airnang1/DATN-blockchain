import React from 'react';
import { Divider } from 'antd';

function DividerComponent(props) {
    const { title, transformY, icon, position, margin } = props;

    return (
        <Divider
            orientation={position}
            style={{
                transform: `translateY(${transformY}px)`,
                color: '#c3c3c3',
                margin: { margin },
            }}
        >
            <i className={icon}></i> <i>{title}</i>
        </Divider>
    );
}

DividerComponent.propTypes = {};

export default DividerComponent;
