/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Drawer, Button, Tooltip, Spin } from "antd";
// import styled from "styled-components";
import { Link } from "react-router-dom";
import { DoubleRightOutlined } from "@ant-design/icons";
import TableCategoryProducts from "./TableCategoryProducts";
// import { useSelector } from "react-redux";
import { useGetMenuCategoryQuery } from "../../Store/Reducer/menuReducer";

const titleSidebar = <span>Menu Danh Mục Sản Phẩm</span>;
const titleLucky = <span>Bạn có 2 lượt quay</span>;

function Sidebar(props) {
  const [visible, setVisible] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [dataCategory, setDataCategory] = useState(null);
  const [active, setActive] = useState(null);
  const [changeDataCategory, setChangeDataCategory] = useState(null);

  const tableSidebar = useRef(null)
  const buttonRef = useRef(null)

  const { error, isLoading, data } = useGetMenuCategoryQuery();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const someHandler = (item, index) => {
    setShowTable(true);
    setChangeDataCategory(item);
    setActive(index);
  };

  const handleShowCategoryProduct = (data, isShow) => {
    setDataCategory(data);
    setIsShow(isShow);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !tableSidebar?.current?.contains(event.target) &&
        !buttonRef?.current?.contains(event.target)
      ) {
        setShowTable(false);
        setActive(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      setShowTable(false);
      setActive(null);
    };
  }, [tableSidebar, buttonRef]);

  return (
    <div className="sidebar-layout">
      <Tooltip placement="right" title={titleSidebar} color={"#2db7f5"}>
        <Button icon={<DoubleRightOutlined />} onClick={showDrawer} />
      </Tooltip>
      <Drawer
        title="Danh Mục Sản Phẩm"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        {isLoading ? (
          <Spin />
        ) : (
          <>
            <TableCategoryProducts
              showTable={showTable}
              handleShowCategoryProduct={handleShowCategoryProduct}
              data={dataCategory}
              isShow={isShow}
              changeDataCategory={changeDataCategory}
              ref={tableSidebar}
            />
            {data?.categoryMenu.map((item, index) => (
              <Button
                type="text"
                onMouseEnter={() => someHandler(item, index)}
                id="btn-show-table"
                key={item.title}
                className={`btn-sidebar ${active === index ? "active" : ""}`}
                ref={buttonRef}
              >
                <Link to={item.link}>{item.title}</Link>
              </Button>
            ))}
            <Tooltip placement="right" title={titleLucky} color={"#2db7f5"}>
              <Button type="text" className="btn-sidebar">
                <Link to="/user/wheel">Vòng quay may mắn</Link>
              </Button>
            </Tooltip>
          </>
        )}
      </Drawer>
    </div>
  );
}

Sidebar.propTypes = {};

export default Sidebar;
