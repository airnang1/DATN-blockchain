import React from 'react';
import { Button, Menu, Row } from 'antd';
import { numberWithCommas } from '../../../utils';

export const menu = (capacity) => (
    <Menu>
        <div className="menu-content" style={{ padding: '10px' }}>
            <div className="menu-title">Varation:</div>
            {capacity.map((item, index) => (
                <Row key={index}>
                    <Menu.Item key="0">
                        <Button>
                            {item.title} {numberWithCommas(item.price)}
                            <sup> {item.unit}</sup>
                        </Button>
                    </Menu.Item>
                </Row>
            ))}
        </div>
    </Menu>
);
