/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
// import { AuthContext } from '../../../Context/AuthProvider';
import { handleLogout } from "../../../Store/Reducer/authReducer";
import { useDispatch } from "react-redux";
import { setLoadingAction } from "../../../Store/Reducer/loadingReducer";
import { handleResetCartUser } from "../../../Store/Reducer/cartReducer";
import { Avatar } from "antd";
import { humanImg } from "../../../assets/fake-data/human";

function User({ user }) {
  const userDrawerRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const someHandler = () => {
    if (userDrawerRef.current) {
      userDrawerRef.current.classList.add("active");
    }
  };

  const someOtherHandler = () => {
    if (userDrawerRef.current) {
      userDrawerRef.current.classList.remove("active");
    }
  };

  const handleLogoutForm = () => {
    dispatch(handleResetCartUser());
    dispatch(setLoadingAction(true));
    dispatch(handleLogout(history));
    setTimeout(() => {
      dispatch(setLoadingAction(false));
    }, 500);
  };

  return (
    <div
      className="header__menu__item header__menu__right__item buyer"
      style={{ width: !user && "200px" }}
    >
      <div
        className="header__menu__item__user"
        onMouseEnter={someHandler}
        onMouseLeave={someOtherHandler}
        id="userId"
      >
        <div className="header__menu__item__user-icon">
          {user ? (
            <Link to="/user/order">
              <Avatar
                src={user.profilePicture || humanImg}
                alt={user.username}
                size={30}
              />
            </Link>
          ) : (
            <>
              <div className="header__menu__item__buyer">
                <Link
                  to="/buyer/signup"
                  className="header__menu__item__buyer-signup"
                >
                  Đăng Ký
                </Link>
                <Link
                  to="/buyer/signin"
                  className="header__menu__item__buyer-signin"
                >
                  Đăng Nhập
                </Link>
              </div>
            </>
          )}
        </div>
        {user && (
          <div
            className="header__menu__item__user-drawer"
            id="userDrawerId"
            ref={userDrawerRef}
          >
            <Link to="/user/profile">
              <div className="header__menu__item__user-drawer-accout">
                <Avatar
                  src={user.profilePicture || humanImg}
                  alt={user.username}
                  size="small"
                />
                <span className="display-name-user" style={{ marginLeft: 5 }}>
                  {user.username}
                </span>
              </div>
            </Link>
            {user.addressWallet && (
              <div className="header__menu__item__user-drawer-accout">
                <i className="fad fa-wallet"></i>
                <span className="display-name-user" style={{ marginLeft: 5 }}>
                  {user.addressWallet}
                </span>
              </div>
            )}
            <Link to="/user/order">
              <div className="header__menu__item__user-drawer-accout">
                <i className="fad fa-calendar-week"></i>
                <span>Đơn mua</span>
              </div>
            </Link>
            {user.isAdmin ? (
              <Link to="/dashboard/main">
                <div className="header__menu__item__user-drawer-dashboard">
                  <i className="fad fa-tachometer-slowest"></i>
                  <span>Dashboard</span>
                </div>
              </Link>
            ) : (
              ""
            )}
            <div className="header__menu__item__user-drawer-accout">
              <i className="fad fa-sign-in-alt"></i>
              <span onClick={handleLogoutForm}>Đăng xuất</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

User.propTypes = {};

export default User;
