/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Row, Col, Divider, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addressApiSelector,
  getAddressApi,
} from "../../../../Store/Reducer/apiAddress";

import AddressContentBox from "./AddressContentBox";
import { authSelector } from "../../../../Store/Reducer/authReducer";
import {
  deleteUserAddress,
  getUserAddress,
  updateStatusUserAddress,
  userAddressSelector,
} from "../../../../Store/Reducer/userAddressReducer";
import { insertUserAddress } from "../../../../Store/Reducer/userAddressReducer";
import { updateUserAddress } from "../../../../Store/Reducer/userAddressReducer";
import { toast } from "react-toastify";
import { isEmptyObjectAll } from "../../../../utils";
import ModalAddress from "../../../Pay/DeliveryAddress/ModalAddress";

const FileUserAddress = styled.div`
  display: flex;
  flex-direction: column;

  span.ant-divider-inner-text {
    font-size: 13px;
    color: #cbcbcb;
  }
  .address-content {
    max-height: 300px;
    overflow-y: auto;
  }
  .address-title {
    height: 85px;
    box-shadow: 2px 2px 10px 0px #ececec;
    padding: 20px;
  }
`;

const FileUserTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p.file-user-address-title {
    font-size: 20px;
    margin: 0;
  }
  .ant-modal-header {
    font-size: 22px;
  }
`;

function AddressUser({ axiosJWT }) {
  const dispatch = useDispatch();
  const address_api = useSelector(addressApiSelector);
  const auth = useSelector(authSelector);
  const userAddressSlt = useSelector(userAddressSelector);
  const [modal, setModal] = useState(false);
  const [nameUser, setNameUser] = useState("");
  const [dataAddress, setDataAddress] = useState({});
  const [numberPhone, setNumberPhone] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [lngLat, setLngLat] = useState({ long: 0, lat: 0 });

  const [objAddress, setObjAddress] = useState({
    tinh: null,
    quan: null,
    xa: null,
    mota: null,
  });

  useEffect(() => {
    if (auth.user) {
      dispatch(getAddressApi());
      dispatch(getUserAddress({ userId: auth.user._id }));
    }
  }, [auth.user, dispatch]);

  const { userAddress, userAddressAdmin } = userAddressSlt;

  const onChangeName = (e) => {
    setNameUser(e.target.value);
  };

  const onChangeNumberPhone = (e) => {
    setNumberPhone(e.target.value);
  };

  const handleSetDefaultToAddress = (obj) => {
    if (auth.tokenAuth && obj._id) {
      dispatch(
        updateStatusUserAddress({
          tokenAuth: auth.tokenAuth,
          userAddressId: obj._id,
          axiosJWT,
        })
      );
    }
  };

  const setModal1Visible = (modal1Visible) => {
    setModal(modal1Visible);
    setNumberPhone("");
    setNameUser("");
  };

  const onHandleValueImportAddress = (obj) => {
    setObjAddress(obj);
  };

  useEffect(() => {
    if (auth) {
      const newUserAddress = {
        username: nameUser,
        phoneNumber: numberPhone,
        address: objAddress,
        status: false,
        tokenAuth: auth.tokenAuth,
      };
      setDataAddress(newUserAddress);
    }
  }, [auth, nameUser, numberPhone, objAddress]);

  const handleImportAddressUser = () => {
    if (!addressId) {
      const isCheck = Object.values(dataAddress.address).some((value) => {
        if (!value) {
          return true;
        }
        return false;
      });
      setTimeout(() => {
        if (!isCheck) {
          dispatch(insertUserAddress({ ...dataAddress, axiosJWT, ...lngLat }));
        } else {
          toast.warning("Invalid User Address Data!");
        }
      }, 500);
    } else {
      const data = {
        username: nameUser,
        phoneNumber: numberPhone,
        address: {
          tinh: addressId?.address.tinh || objAddress.tinh,
          quan: addressId?.address.quan || objAddress.quan,
          xa: addressId?.address.xa || objAddress.xa,
          mota: addressId?.address.mota || objAddress.mota,
        },
        long: lngLat.long,
        lat: lngLat.lat,
        tokenAuth: auth.tokenAuth,
        status: addressId.status,
        axiosJWT,
      };
      dispatch(
        updateUserAddress({
          data,
          userAddressId: addressId.id,
        })
      );
    }
    setModal(false);
  };

  const confirm = (obj) => {
    if (auth.tokenAuth) {
      setTimeout(() => {
        dispatch(
          deleteUserAddress({
            tokenAuth: auth.tokenAuth,
            userAddressId: obj._id,
            axiosJWT,
          })
        );
      }, 500);
    }
  };

  const handleEditUserAddress = (addressItem) => {
    const { username, phoneNumber, address, geolocation, status } = addressItem;
    if (!isEmptyObjectAll(addressItem)) {
      setNameUser(username);
      setNumberPhone(phoneNumber);
      setObjAddress(address);
      setLngLat({
        long: geolocation.coordinates[0],
        lat: geolocation.coordinates[1],
      });
      setAddressId({ id: addressItem._id, status, address });
      setModal(true);
    }
  };

  const handleCancel = () => {
    setModal1Visible(false);
    setAddressId(null);
  };

  const handleShowModal = () => {
    setModal1Visible(true);
  };

  return (
    <FileUserAddress>
      <div className="address-title">
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginBottom: "20px" }}
        >
          <Col
            className="gutter-row"
            span={24}
            style={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <FileUserTitle>
              <p className="file-user-address-title">Địa chỉ người dùng</p>
              <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={handleShowModal}
              >
                Thêm Địa Chỉ Mới
              </Button>
              <ModalAddress
                visible={modal}
                handleOk={handleImportAddressUser}
                handleCancel={handleCancel}
                modalText="Địa chỉ mới"
                confirmLoading={confirmLoading}
                address_api={address_api}
                objAddress={objAddress}
                onHandleValueImportAddress={onHandleValueImportAddress}
                inputName={nameUser}
                inputNumber={numberPhone}
                handleChangeInputName={onChangeName}
                handleChangeInputNumber={onChangeNumberPhone}
                isShowSavedAddress={false}
                lngLat={lngLat}
                setLngLat={setLngLat}
              />
            </FileUserTitle>
          </Col>
        </Row>
        <Divider orientation="left" style={{ transform: "translateY(-30px)" }}>
          Address User
        </Divider>
      </div>
      <div className="address-content">
        {userAddress && userAddress.items.length ? (
          userAddress.items.map(
            (item, index) =>
              Object.keys(item).length && (
                <AddressContentBox
                  item={item}
                  key={item._id}
                  index={index}
                  confirm={confirm}
                  handleSetDefaultToAddress={handleSetDefaultToAddress}
                  handleEditUserAddress={handleEditUserAddress}
                />
              )
          )
        ) : (
          <Empty />
        )}
      </div>
    </FileUserAddress>
  );
}

AddressUser.propTypes = {};

export default AddressUser;
