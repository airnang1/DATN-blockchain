import React from 'react';
import Helmet from '../../Components/Helmet';
import DashboardHeader from '../../Components/DashBoard/DashboardHeader';
import DashboardSideBar from '../../Components/DashBoard/DashboardSideBar';
import { Switch, useParams } from 'react-router-dom';
import DashboardItemLayout from '../../Common/DashboardItemLayout';
import { DASHBOARD_ROUTES } from '../../constans';
import { useSelector } from 'react-redux';
import { authSelector } from '../../Store/Reducer/authReducer';

const renderDashboardRender = (url, axiosJWT) => {
    let xhtml = null;
    xhtml = DASHBOARD_ROUTES.map((route, index) => {
        return (
            <DashboardItemLayout
                name={route.name}
                key={index}
                component={route.component}
                exact={route.exact}
                path={route.path}
                url={url}
                axiosJWT={axiosJWT}
            />
        );
    });
    return xhtml;
};

function DashBoard({axiosJWT}) {
    const auth = useSelector(authSelector);
    const { url } = useParams();

    return (
        <Helmet title="dashboard">
            <div className="dashboard">
                <DashboardHeader />
                <DashboardSideBar admin={auth.user} />
                <Switch>{renderDashboardRender(url, axiosJWT)}</Switch>
            </div>
        </Helmet>
    );
}

DashBoard.propTypes = {};

export default DashBoard;
