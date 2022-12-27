import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export default function LoginLayout(props) {
    const { name, component: YourComponent, exact, path } = props;
    return (
        <Route
            name={name}
            exact={exact}
            path={path}
            render={(props) => <YourComponent {...props} />}
        />
    );
}

LoginLayout.propTypes = {
    path: PropTypes.string,
    exact: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string,
};
