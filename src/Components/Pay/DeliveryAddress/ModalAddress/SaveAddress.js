import React, { useEffect } from "react";
import { Button, Radio, Empty } from "antd";
import { Link } from "react-router-dom";

function SaveAddress({
  userAddress,
  setUserAddressDefault,
  userAddressDefault,
}) {
  const onChangeCheckbox = (e) => {
    setUserAddressDefault(e.target.value);
  };

  useEffect(() => {
    if (userAddress) {
      userAddress.items.forEach((item) => {
        if (item.status) {
          setUserAddressDefault(item._id.toString());
        }
      });
    }
  }, [setUserAddressDefault, userAddress]);

  useEffect(() => {
    return () => {
      if (userAddress) {
        userAddress.items.forEach((item) => {
          if (item.status) {
            setUserAddressDefault(item._id.toString());
          }
        });
      }
    };
  }, [userAddress, setUserAddressDefault]);

  return (
    <div className="save-address">
      <div className="save-address__items">
        {userAddress && userAddress.items.length ? (
          userAddress.items.map((item, key) => {
            return (
              <div className="save-address__item" key={key}>
                <div className="save-address__content">
                  <Radio.Group
                    onChange={onChangeCheckbox}
                    value={userAddressDefault}
                  >
                    <Radio value={item._id.toString()}>
                      {" "}
                      [ {item.username} - (+84) {item.phoneNumber} ]{" "}
                      {item.address.mota} - {item.address.xa.WardName} -{" "}
                      {item.address.quan.DistrictName} -{" "}
                      {item.address.tinh.ProvinceName}
                    </Radio>
                  </Radio.Group>
                </div>
              </div>
            );
          })
        ) : (
          <Empty />
        )}
      </div>
      <Link to="/user/address">
        <Button type="dashed" size="large">
          Sửa Lại Địa Chỉ Người Dùng
        </Button>
      </Link>
    </div>
  );
}

SaveAddress.propTypes = {};

export default SaveAddress;
