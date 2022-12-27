import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

export default function WidgetsLayout(props) {
    const { name, component: YourComponent, path, exact } = props;
    return (
        <Route
            name={name}
            path={path}
            exact={exact}
            render={(props) => <YourComponent {...props} authed={true} />}
        />
    );
}

WidgetsLayout.propTypes = {
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    name: PropTypes.string,
    path: PropTypes.string,
    exact: PropTypes.bool,
};
