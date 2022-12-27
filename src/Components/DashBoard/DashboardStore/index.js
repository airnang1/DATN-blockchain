/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import SelecteValue from '../../Pay/DeliveryAddress/ModalAddress/SelecteValue';
import { useDispatch, useSelector } from 'react-redux';
import { addressApiSelector } from '../../../Store/Reducer/apiAddress';
import { Button, Empty, Input } from 'antd';
import {
    getUserAddress,
    updateUserAddress,
    userAddressSelector,
} from '../../../Store/Reducer/userAddressReducer';

function DashboardStore(props) {
    const dispatch = useDispatch();
    const address_api = useSelector(addressApiSelector);
    const userAddress = useSelector(userAddressSelector);

    const [isDisable, setIsDisable] = useState(true);
    const [objAddress, setObjAddress] = useState({
        tinh: null,
        quan: null,
        xa: null,
        mota: null,
    });

    const [isInput, setIsInput] = useState({
        username: '',
        phoneNumber: '',
    });

    const onHandleValueImportAddress = (obj) => {
        setObjAddress(obj);
    };

    const handleSaveAddressUser = () => {
        if (userAddress) {
            const data = { ...isInput, ...objAddress };
            dispatch(
                updateUserAddress({
                    data,
                    userAddressId: userAddress._id,
                }),
            );
        }
    };

    useEffect(() => {
        if (userAddress) {
            dispatch(getUserAddress({ userId: userAddress._id }));
        }
    }, [userAddress, dispatch]);

    useEffect(() => {
        const isEmpty = Object.values({
            ...isInput,
            ...objAddress,
        }).some((x) => x === null || x === '');
        setIsDisable(isEmpty);
    }, [isInput, objAddress]);

    return (
        <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
            <div className="row">
                <ol className="breadcrumb">
                    <li>
                        <a href="#">
                            <em className="fa fa-home" />
                        </a>
                    </li>
                    <li className="active"></li>
                </ol>
            </div>
            {/*/.row*/}
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Store Config</h1>
                </div>
            </div>
            {/*/.row*/}
            <div className="row">
                <div className="col-md-6">
                    <div className="title-config-store">
                        <span>Cập nhật địa chỉ Admin</span>
                    </div>
                    {/* <div className="col-md-12">
                        <div className="address-input">
                            <Input
                                placeholder="Nhập tên cửa hàng của bạn"
                                onChange={(e) =>
                                    setIsInput({
                                        ...isInput,
                                        username: e.target.value,
                                    })
                                }
                            />
                            <Input
                                placeholder="Nhập số điện thoại cửa hàng của bạn"
                                onChange={(e) =>
                                    setIsInput({
                                        ...isInput,
                                        phoneNumber: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="address-selector">
                            <SelecteValue
                                active={1}
                                objAddress={objAddress}
                                address_api={address_api}
                                onHandleValueImportAddress={
                                    onHandleValueImportAddress
                                }
                                widthInput="250px"
                            />
                        </div>
                        <div className="btn-save">
                            <Button
                                type="primary"
                                style={{ float: 'right' }}
                                onClick={handleSaveAddressUser}
                                disabled={isDisable}
                            >
                                Save
                            </Button>
                        </div>
                    </div> */}
                    <Empty/>
                </div>
                <div className="col-md-6"></div>
            </div>
        </div>
    );
}

DashboardStore.propTypes = {};

export default DashboardStore;
