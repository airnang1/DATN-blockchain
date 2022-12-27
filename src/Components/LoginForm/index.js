/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import { useDispatch } from "react-redux";
import {
  authSelector,
  fetchSigninAction,
  fetchSignupAction,
  loginSocialAction,
} from "../../Store/Reducer/authReducer";
import { useSelector } from "react-redux";
import { setLoadingAction } from "../../Store/Reducer/loadingReducer";
import WalletLoginConnect from "./WalletLogin";
function LoginForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isStateLogin } = useParams();

  const auth = useSelector(authSelector);
  const [isActive, setIsActive] = useState(isStateLogin === "signup");

  const isShowSignup = () => {
    setIsActive(!isActive);
  };

  const handleLoginSignin = (val) => {
    dispatch(setLoadingAction(true));
    dispatch(fetchSigninAction(val));
    setTimeout(() => {
      dispatch(setLoadingAction(false));
    }, 1000);
  };

  const handleLoginSignup = (val) => {
    dispatch(setLoadingAction(true));
    dispatch(fetchSignupAction({val, history}));
    setTimeout(() => {
      dispatch(setLoadingAction(false));
    }, 500);
  };

  const handleFbLogin = (response) => {
    dispatch(setLoadingAction(true));

    const { accessToken, userID } = response;
    if (accessToken && userID) {
      dispatch(
        loginSocialAction({
          domant: "facebook",
          data: { accessToken, userID, loginDomain: "facebook" },
        })
      );
      if (auth.user && auth.tokenAuth) {
        history.push("/");
      }
    }
    setTimeout(() => {
      dispatch(setLoadingAction(false));
    }, 500);
  };

  const handleGgLogin = (response) => {
    dispatch(setLoadingAction(true));
    const { tokenId } = response;
    if (tokenId) {
      dispatch(
        loginSocialAction({
          domant: "google",
          data: { tokenId, loginDomain: "google" },
        })
      );
      if (auth.user && auth.tokenAuth) {
        history.push("/");
      }
      setTimeout(() => {
        dispatch(setLoadingAction(false));
      }, 500);
    }
  };

  return (
    <div className="form">
      <WalletLoginConnect />
      <div className={isActive ? "container right-panel-active" : "container"}>
        <Signup onSubmit={handleLoginSignup} />
        <Signin
          onSubmit={handleLoginSignin}
          handleFbLogin={handleFbLogin}
          handleGgLogin={handleGgLogin}
        />

        <div className="form__overlay-container">
          <div className="form__overlay">
            <div className="form__overlay-panel form__overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="form__btn__ghost" onClick={isShowSignup}>
                <Link to="/buyer/signin">Sign In</Link>
              </button>
            </div>
            <div className="form__overlay-panel form__overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="form__btn__ghost" onClick={isShowSignup}>
                <Link to="/buyer/signup">Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="form__footer">
        <p>
          Shop điện tử Iphone <i className="fa fa-heart" /> của
          <Link to="/"> Phạm Công Tuấn</Link> - Xin chân thành cảm ơn quý khách đã
          ghé qua ạ
        </p>
      </footer>
    </div>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
