import React, { useEffect } from "react";
import Helmet from "../../Components/Helmet";
import LoginForm from "../../Components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingAction } from "../../Store/Reducer/loadingReducer";
import { authSelector } from "../../Store/Reducer/authReducer";
import { useHistory } from "react-router";

function LoginPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(authSelector);
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setTimeout(() => {
      dispatch(setLoadingAction(false));
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    if (user && token && auth.isForgetPassword) {
      history.push("/");
    } else if (user && token) {
      history.goBack();
    }
  }, [history, token, user, auth.isForgetPassword]);

  return (
    <Helmet title="Login">
      <LoginForm />
    </Helmet>
  );
}

LoginPage.propTypes = {};

export default LoginPage;
