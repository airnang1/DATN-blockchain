import React, { useState } from 'react';
import { Button, Dropdown, Input, Menu, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import TableOrder from '../TableOrder';
import OrderDrawerBox from '../OrderDrawerBox';
const { TabPane } = Tabs;

function TabOrder({ orders, userAddress, userAddressAdmin, axiosJWT, confirmDelete }) {
    const [visible, setVisible] = useState(false);
    const [orderItem, setOrderItem] = useState(null);

    const menu = (
        <Menu
            items={[
                {
                    label: <p>Lọc theo mã đơn hàng</p>,
                },
                {
                    label: <p>Lọc theo tên đơn hàng</p>,
                },
                {
                    label: <p>Lọc theo thời gian đơn hàng</p>,
                },
            ]}
        />
    );

    const handleShowNavigation = (order) => {
        setOrderItem(order);
        setVisible(true);
    };

    return (
        <div className="card-container">
            <div className="input-search">
                <Input
                    size="large"
                    placeholder="large size"
                    prefix={<SearchOutlined />}
                />
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Button>Bộ lọc</Button>
                </Dropdown>
            </div>
            <Tabs type="card">
                <TabPane tab="Tất Cả" key="1">
                    <TableOrder
                        orders={orders}
                        handleShowNavigation={handleShowNavigation}
                        confirmDelete={confirmDelete}
                    />
                </TabPane>
                <TabPane tab="Chờ xử lý" key="2">
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                </TabPane>
                <TabPane tab="Sẵn sàng giao" key="3">
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                </TabPane>
                <TabPane tab="Đang giao hàng" key="4">
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                </TabPane>
                <TabPane tab="Khách đã nhận" key="5">
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                </TabPane>
                <TabPane tab="Khách hoàn trả" key="6">
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                </TabPane>
                <TabPane tab="Khách không nhận" key="7">
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                </TabPane>
                <TabPane tab="Đã hủy" key="8">
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                </TabPane>
            </Tabs>
            <OrderDrawerBox
                visible={visible}
                setVisible={setVisible}
                orderItem={orderItem}
                userAddress={userAddress}
                axiosJWT={axiosJWT}
                userAddressAdmin={userAddressAdmin}
            />
        </div>
    );
}

TabOrder.propTypes = {};

export default TabOrder;
