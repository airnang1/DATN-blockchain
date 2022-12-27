import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Layout(props) {
    const { name, component: YourComponent, exact, path, axiosJWT } = props;

    return (
        <Route
            name={name}
            exact={exact}
            path={path}
            component={YourComponent}
        >
            <YourComponent axiosJWT={axiosJWT}/>
        </Route>
    );
}

Layout.propTypes = {
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string,
};
