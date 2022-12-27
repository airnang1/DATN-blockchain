/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import TotalCate from "./TotalCate";
import PercentProduct from "./PercentProduct";
import Chart from "./Chart";
import { useDispatch, useSelector } from "react-redux";
import {
  commentsUserSelector,
  getCommentsToStore,
} from "../../../Store/Reducer/comments_user";
import {
  handleGetOrdersInStore,
  orderSelector,
} from "../../../Store/Reducer/orderReducer";
import {
  getUsersInStore,
  usersSelector,
} from "../../../Store/Reducer/usersReducer";
import {
  getProductToPagination,
  productsDBSelector,
} from "../../../Store/Reducer/productsDBReducer";

function DashboardMain(props) {
  const dispatch = useDispatch();
  const orderSlt = useSelector(orderSelector);
  const comments = useSelector(commentsUserSelector);
  const usersDB = useSelector(usersSelector);
  const productsDB = useSelector(productsDBSelector);

  const { users } = usersDB;
  const { orders } = orderSlt;
  const { count } = productsDB;

  useEffect(() => {
    dispatch(handleGetOrdersInStore());
    dispatch(getCommentsToStore());
    dispatch(getUsersInStore());
    dispatch(getProductToPagination({ search: `?page=${1}` }));
  }, [dispatch]);

  return (
    <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
      <div className="row">
        <ol className="breadcrumb">
          <li>
            <a href="#">
              <em className="fa fa-home" />
            </a>
          </li>
          <li className="active">Dashboard</li>
        </ol>
      </div>
      {/*/.row*/}
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">Dashboard</h1>
        </div>
      </div>
      {/*/.row*/}
      <div className="panel panel-container">
        <div className="row">
          <TotalCate
            data={[
              {
                data: orders,
                title: "Orders",
                icon: "fa fa-xl fa-shopping-cart color-blue",
                path: "/dashboard/order"
              },
              {
                data: comments,
                title: "Comments",
                icon: "fa fa-xl fa-comments color-orange",
                path: '#'
              },
              {
                data: users,
                title: "Users",
                icon: "fa fa-xl fa-users color-teal",
                path: "/dashboard/customer"
              },
              {
                data: Array(count),
                title: "Products",
                icon: "fa fa-xl fa-search color-red",
                path: "/dashboard/widgets/list-all/products"
              },
            ]}
          />
          <PercentProduct />
        </div>
        <Chart />
        {/*/.row*/}
      </div>
    </div>
  );
}

DashboardMain.propTypes = {};

export default DashboardMain;
