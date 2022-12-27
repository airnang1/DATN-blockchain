import React, { useState } from "react";
import { humanImg } from "../../../assets/fake-data/human";
import { Button, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
function TableCustomer({ users, confirm, handleShowNavigation }) {
  const [activeTd, setActiveTd] = useState(null);

  const someHandler = (i, item) => {
    setActiveTd(i);
  };

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Avatar</th>
          <th scope="col">Tên</th>
          <th scope="col">Uy Tín</th>
          <th scope="col">Email</th>
          <th scope="col">Số Điện Thoại</th>
          <th scope="col">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((item, index) => (
          <tr key={item._id} onMouseEnter={() => someHandler(index, item)}>
            <th scope="row">{index + 1}</th>
            <td className="table-img">
              <img
                alt={item.username}
                src={item.profilePicture || humanImg}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://icon-library.com/images/image-error-icon/image-error-icon-21.jpg";
                }}
              />
            </td>
            <td>{item.username}</td>
            <td>100</td>
            <td>{item.email}</td>
            <td>{item.phoneNumber || "chưa có SĐT"}</td>
            {activeTd === index && (
              <td>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{ marginRight: 10 }}
                  onClick={() => handleShowNavigation(item._id)}
                >
                  Xem
                </Button>
                <Button
                  type="dashed"
                  icon={<EditOutlined />}
                  style={{ marginRight: 10 }}
                >
                  Sửa
                </Button>

                <Popconfirm
                  title="Bạn có chắc muốn xóa người dùng này ?"
                  onConfirm={() => confirm(item)}
                  onVisibleChange={() => console.log("visible change")}
                >
                  <Button type="dashed" danger ghost icon={<DeleteOutlined />}>
                    Xóa
                  </Button>
                </Popconfirm>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableCustomer.propTypes = {};

export default TableCustomer;
