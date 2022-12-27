import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export default function DashboardLayout(props) {
    const { name, component: YourComponent, exact, path, axiosJWT } = props;
    return (
        <Route
            name={name}
            exact={exact}
            path={path}
        >
            <YourComponent axiosJWT={axiosJWT}/>
        </Route>
    );
}

DashboardLayout.propTypes = {
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string,
};
